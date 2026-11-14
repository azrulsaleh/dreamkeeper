import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { FilterMode, NoiseMode } from '../types';

export type StemVolumes = [number, number, number, number];

interface PersistedPlayerSettings {
	volumes: StemVolumes;
	isLooping: boolean;
	activeFilter: FilterMode;
	activeNoise: NoiseMode;
	noiseVolume: number;
}

interface PlayerSettingsStore extends PersistedPlayerSettings {
	setStemVolume: (index: number, volume: number) => void;
	setLooping: (isLooping: boolean) => void;
	setActiveFilter: (activeFilter: FilterMode) => void;
	setActiveNoise: (activeNoise: NoiseMode) => void;
	setNoiseVolume: (noiseVolume: number) => void;
}

const DEFAULT_SETTINGS: PersistedPlayerSettings = {
	volumes: [0, 0, 0, 0],
	isLooping: false,
	activeFilter: 'off',
	activeNoise: 'pink',
	noiseVolume: -60,
};

const clampDecibels = (value: number) => Number.isFinite(value)
	? Math.max(-60, Math.min(6, value))
	: 0;

function normalizeSettings(value: unknown): PersistedPlayerSettings {
	if (!value || typeof value !== 'object')
		return DEFAULT_SETTINGS;

	const saved = value as Partial<PersistedPlayerSettings>;
	const volumes = Array.isArray(saved.volumes) && saved.volumes.length === 4
		? saved.volumes.map(volume =>
			typeof volume === 'number' && Number.isFinite(volume) ? clampDecibels(volume) : 0
		) as StemVolumes
		: DEFAULT_SETTINGS.volumes;
	const validFilters: FilterMode[] = ['off', 'gentle', 'warm', 'deep'];
	const validNoiseModes: NoiseMode[] = ['off', 'white', 'pink', 'brown'];

	return {
		volumes,
		isLooping: typeof saved.isLooping === 'boolean' ? saved.isLooping : DEFAULT_SETTINGS.isLooping,
		activeFilter: validFilters.includes(saved.activeFilter as FilterMode)
			? saved.activeFilter as FilterMode
			: DEFAULT_SETTINGS.activeFilter,
		activeNoise: validNoiseModes.includes(saved.activeNoise as NoiseMode)
			? saved.activeNoise as NoiseMode
			: DEFAULT_SETTINGS.activeNoise,
		noiseVolume: typeof saved.noiseVolume === 'number' && Number.isFinite(saved.noiseVolume)
			? clampDecibels(saved.noiseVolume)
			: DEFAULT_SETTINGS.noiseVolume,
	};
}

export const usePlayerSettingsStore = create<PlayerSettingsStore>()(
	persist(
		set => ({
			...DEFAULT_SETTINGS,
			setStemVolume: (index, volume) => set(state => {
				if (!Number.isInteger(index) || index < 0 || index >= state.volumes.length)
					return state;

				const volumes = [...state.volumes] as StemVolumes;
				volumes[index] = clampDecibels(volume);
				return { volumes };
			}),
			setLooping: isLooping => set({ isLooping }),
			setActiveFilter: activeFilter => set({ activeFilter }),
			setActiveNoise: activeNoise => set({ activeNoise }),
			setNoiseVolume: noiseVolume => set({ noiseVolume: clampDecibels(noiseVolume) }),
		}),
		{
			name: 'dreamkeeper-player-settings',
			version: 1,
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({
				volumes: state.volumes,
				isLooping: state.isLooping,
				activeFilter: state.activeFilter,
				activeNoise: state.activeNoise,
				noiseVolume: state.noiseVolume,
			}),
			merge: (persistedState, currentState) => ({
				...currentState,
				...normalizeSettings(persistedState),
			}),
			migrate: persistedState => normalizeSettings(persistedState),
		},
	),
);
