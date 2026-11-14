// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { songs } from '../data/songs';

const toneMocks = vi.hoisted(() => {
	const listeners = new Map<string, Array<() => void>>();
	const emit = (event: string) => listeners.get(event)?.forEach(listener => listener());
	const transport = {
		state: 'stopped',
		seconds: 0,
		loop: false,
		loopStart: 0,
		loopEnd: 0,
		start: vi.fn(() => {
			transport.state = 'started';
			emit('start');
		}),
		pause: vi.fn(() => {
			transport.state = 'paused';
			emit('pause');
		}),
		stop: vi.fn(() => {
			transport.state = 'stopped';
			emit('stop');
		}),
		on: vi.fn((event: string, listener: () => void) => {
			listeners.set(event, [...(listeners.get(event) ?? []), listener]);
		}),
		off: vi.fn((event: string, listener: () => void) => {
			listeners.set(event, (listeners.get(event) ?? []).filter(item => item !== listener));
		}),
		schedule: vi.fn(() => 1),
		clear: vi.fn(),
	};

	return {
		transport,
		listeners,
		emit,
		startAudio: vi.fn(async () => undefined),
		rampMasterVolume: vi.fn(),
	};
});

const storage = new Map<string, string>();
const localStorageMock = {
	getItem: (key: string) => storage.get(key) ?? null,
	setItem: (key: string, value: string) => storage.set(key, value),
	removeItem: (key: string) => storage.delete(key),
	clear: () => storage.clear(),
};

let usePlayerSettingsStore: typeof import('../store/playerSettingsStore').usePlayerSettingsStore;
let usePlayerEngine: typeof import('./usePlayerEngine').usePlayerEngine;

vi.mock('tone', () => {
	class MockAudioBuffer {
		load = vi.fn(async (path: string) => ({ path }));
	}

	class MockNode {
		gain = { rampTo: vi.fn() };
		frequency = { rampTo: vi.fn() };
		connect = vi.fn().mockReturnValue(this);
		toDestination = vi.fn().mockReturnValue(this);
		sync = vi.fn().mockReturnValue(this);
		start = vi.fn().mockReturnValue(this);
		dispose = vi.fn();
	}

	return {
		ToneAudioBuffer: MockAudioBuffer,
		Gain: MockNode,
		Filter: MockNode,
		Player: MockNode,
		Noise: MockNode,
		Transport: toneMocks.transport,
		Destination: { volume: { value: 0, rampTo: toneMocks.rampMasterVolume } },
		start: toneMocks.startAudio,
		dbToGain: (decibels: number) => decibels,
	};
});

const defaultSettings = {
	volumes: [0, 0, 0, 0] as [number, number, number, number],
	isLooping: false,
	activeFilter: 'off' as const,
	activeNoise: 'pink' as const,
	noiseVolume: -60,
};

async function mountLoadedPlayer() {
	const hook = renderHook(() => usePlayerEngine());
	await waitFor(() => expect(hook.result.current.currentSongLoaded).toBe(true));
	return hook;
}

describe('usePlayerEngine playback transitions', () => {
	beforeAll(async () => {
		vi.stubGlobal('localStorage', localStorageMock);
		({ usePlayerSettingsStore } = await import('../store/playerSettingsStore'));
		({ usePlayerEngine } = await import('./usePlayerEngine'));
	});

	beforeEach(() => {
		vi.clearAllMocks();
		vi.stubGlobal('localStorage', localStorageMock);
		storage.clear();
		usePlayerSettingsStore.setState(defaultSettings);
		toneMocks.listeners.clear();
		toneMocks.transport.state = 'stopped';
		toneMocks.transport.seconds = 0;
		toneMocks.transport.loop = false;
		vi.stubGlobal('requestAnimationFrame', () => 1);
		vi.stubGlobal('cancelAnimationFrame', vi.fn());
	});

	afterEach(() => {
		cleanup();
		vi.unstubAllGlobals();
	});

	it('starts playback and fades the master output in', async () => {
		const { result } = await mountLoadedPlayer();

		await act(async () => result.current.handlePlay());

		expect(toneMocks.startAudio).toHaveBeenCalledOnce();
		expect(toneMocks.transport.start).toHaveBeenCalledOnce();
		expect(result.current.transportState).toBe('started');
		expect(toneMocks.rampMasterVolume).toHaveBeenCalledWith(0, 0.05);
	});

	it('pauses after fading out and resumes when pause is pressed again', async () => {
		const { result } = await mountLoadedPlayer();
		await act(async () => result.current.handlePlay());

		act(() => result.current.handlePause());
		await act(async () => new Promise(resolve => setTimeout(resolve, 60)));
		expect(result.current.transportState).toBe('paused');

		await act(async () => result.current.handlePause());
		expect(result.current.transportState).toBe('started');
	});

	it('stops playback and resets the transport position after fading out', async () => {
		const { result } = await mountLoadedPlayer();
		await act(async () => result.current.handlePlay());
		toneMocks.transport.seconds = 30;

		act(() => result.current.handleStop());
		await act(async () => new Promise(resolve => setTimeout(resolve, 60)));

		expect(result.current.transportState).toBe('stopped');
		expect(toneMocks.transport.seconds).toBe(0);
		expect(result.current.currentTime).toBe(0);
	});

	it('seeks while stopped without starting playback', async () => {
		const { result } = await mountLoadedPlayer();

		act(() => {
			result.current.handleSeek(42, true);
			result.current.handleSeek(42, false);
		});

		expect(toneMocks.transport.seconds).toBe(42);
		expect(result.current.currentTime).toBe(42);
		expect(toneMocks.transport.start).not.toHaveBeenCalled();
	});

	it('resumes playback at the selected position after a drag seek', async () => {
		const { result } = await mountLoadedPlayer();
		await act(async () => result.current.handlePlay());

		act(() => {
			result.current.handleSeek(42, true);
			result.current.handleSeek(42, false);
		});

		expect(toneMocks.transport.seconds).toBe(42);
		expect(result.current.currentTime).toBe(42);
		expect(result.current.transportState).toBe('started');
		expect(toneMocks.transport.start).toHaveBeenCalledTimes(2);
	});

	it('advances to the next shuffled track when a playing seek reaches the end', async () => {
		const { result } = await mountLoadedPlayer();
		const previousIndex = result.current.currentSongIndex;
		const duration = songs[previousIndex].duration;
		await act(async () => result.current.handlePlay());

		act(() => {
			result.current.handleSeek(duration, true);
			result.current.handleSeek(duration, false);
		});
		await waitFor(() => expect(result.current.currentSongIndex).not.toBe(previousIndex));
		await waitFor(() => expect(result.current.transportState).toBe('started'));

		expect(result.current.currentTime).toBe(0);
	});
});
