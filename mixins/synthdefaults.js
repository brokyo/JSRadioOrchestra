export default {
  	AMSynth: {
		oscillator: {
			type: 'sine'
		},
		volume: 0,
		harmonicity: 3,
		detune: 0,
		portamento: 0,
		modulation: {
			type: 'square'
		},
		envelope: {
			attack: 0.01,
			attackCurve: 'linear',
			decay: 0.01,
			sustain: 1,
			release: 0.5,
			releaseCurve: 'linear'
		},
		modulationEnvelope: {
			attack: 0.5,
			attackCurve: 'linear',
			decay: 0,
			sustain: 1,
			release: 0.5,
			releaseCurve: 'linear'
		}
	}
}
