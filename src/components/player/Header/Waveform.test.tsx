// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type WaveSurfer from 'wavesurfer.js';
import Waveform from './Waveform';

vi.mock('wavesurfer.js', () => ({
	default: {
		create: vi.fn(() => ({
			unAll: vi.fn(),
			destroy: vi.fn(),
		})),
	},
}));

describe('Waveform seeking', () => {
	it('maps pointer drags to track time and marks release as complete', () => {
		const handleSeek = vi.fn();
		const wavesurferRef = createRef<WaveSurfer | null>();
		const { container } = render(
			<Waveform
				wavesurferRef={wavesurferRef}
				handleSeek={handleSeek}
				duration={100}
				waveformPeaks={[0, 1, 0]}
			/>,
		);
		const waveform = container.firstElementChild as HTMLDivElement;
		waveform.getBoundingClientRect = () => ({
			left: 100,
			top: 0,
			right: 300,
			bottom: 40,
			width: 200,
			height: 40,
			x: 100,
			y: 0,
			toJSON: () => ({}),
		});
		waveform.setPointerCapture = vi.fn();
		waveform.releasePointerCapture = vi.fn();

		fireEvent.pointerDown(waveform, { pointerId: 1, clientX: 150 });
		fireEvent.pointerMove(waveform, { pointerId: 1, clientX: 250 });
		fireEvent.pointerUp(waveform, { pointerId: 1, clientX: 300 });

		expect(handleSeek.mock.calls).toEqual([
			[25, true],
			[75, true],
			[100, false],
		]);
		expect(waveform.setPointerCapture).toHaveBeenCalledWith(1);
		expect(waveform.releasePointerCapture).toHaveBeenCalledWith(1);
	});
});
