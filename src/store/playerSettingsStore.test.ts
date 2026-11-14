import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const storage = new Map<string, string>();
const localStorageMock = {
	getItem: (key: string) => storage.get(key) ?? null,
	setItem: (key: string, value: string) => storage.set(key, value),
	removeItem: (key: string) => storage.delete(key),
	clear: () => storage.clear(),
};

let usePlayerSettingsStore: typeof import('./playerSettingsStore').usePlayerSettingsStore;

const defaultSettings = {
	volumes: [0, 0, 0, 0] as [number, number, number, number],
	isLooping: false,
	activeFilter: 'off' as const,
	activeNoise: 'pink' as const,
	noiseVolume: -60,
};

describe('player settings store', () => {
	beforeAll(async () => {
		vi.stubGlobal('localStorage', localStorageMock);
		({ usePlayerSettingsStore } = await import('./playerSettingsStore'));
	});

	afterAll(() => {
		vi.unstubAllGlobals();
	});

	beforeEach(() => {
		storage.clear();
		usePlayerSettingsStore.setState(defaultSettings);
	});

	it('starts with the default player settings', () => {
		const { volumes, isLooping, activeFilter, activeNoise, noiseVolume } = usePlayerSettingsStore.getState();

		expect({ volumes, isLooping, activeFilter, activeNoise, noiseVolume }).toEqual(defaultSettings);
	});

	it('updates stem volumes and ignores invalid stem indexes', () => {
		const { setStemVolume } = usePlayerSettingsStore.getState();

		setStemVolume(1, -12.5);
		setStemVolume(-1, 3);
		setStemVolume(4, 3);
		setStemVolume(1.5, 3);

		expect(usePlayerSettingsStore.getState().volumes).toEqual([0, -12.5, 0, 0]);
	});

	it('clamps stem and noise volumes to the supported decibel range', () => {
		const { setStemVolume, setNoiseVolume } = usePlayerSettingsStore.getState();

		setStemVolume(0, -100);
		setStemVolume(1, 20);
		setStemVolume(2, Number.NaN);
		setNoiseVolume(20);

		expect(usePlayerSettingsStore.getState().volumes).toEqual([-60, 6, 0, 0]);
		expect(usePlayerSettingsStore.getState().noiseVolume).toBe(6);
	});

	it('updates loop, filter, and noise selections', () => {
		const { setLooping, setActiveFilter, setActiveNoise } = usePlayerSettingsStore.getState();

		setLooping(true);
		setActiveFilter('warm');
		setActiveNoise('brown');

		expect(usePlayerSettingsStore.getState()).toMatchObject({
			isLooping: true,
			activeFilter: 'warm',
			activeNoise: 'brown',
		});
	});

	it('normalizes malformed persisted settings and fills missing values with defaults', async () => {
		storage.set('dreamkeeper-player-settings', JSON.stringify({
			state: {
				volumes: [-100, 2, 'invalid', 100],
				isLooping: 'yes',
				activeFilter: 'unknown',
				activeNoise: 'violet',
				noiseVolume: Number.NaN,
			},
			version: 1,
		}));

		await usePlayerSettingsStore.persist.rehydrate();

		expect(usePlayerSettingsStore.getState()).toMatchObject({
			volumes: [-60, 2, 0, 6],
			isLooping: false,
			activeFilter: 'off',
			activeNoise: 'pink',
			noiseVolume: -60,
		});
	});

	it('persists settings without serializing store actions', () => {
		usePlayerSettingsStore.getState().setLooping(true);

		const persisted = JSON.parse(storage.get('dreamkeeper-player-settings') ?? '{}');
		expect(persisted.state).toEqual({ ...defaultSettings, isLooping: true });
		expect(persisted.state.setLooping).toBeUndefined();
	});
});
