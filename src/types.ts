export type FilterMode = 'off' | 'gentle' | 'warm' | 'deep';
export type NoiseMode = 'off' | 'white' | 'pink' | 'brown';
export type NoiseColor = Exclude<NoiseMode, 'off'>;
export type TransportState = 'started' | 'paused' | 'stopped';
