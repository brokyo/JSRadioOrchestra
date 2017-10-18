export default {
  Synth: {
    detune: 0,
    volume: 0,
    portamento: 0,
    oscillator: {
        type: 'sine'
    },
    envelope: {
        attack: 0.005,
        attackCurve: 'linear',
        decay: 0.1,
        sustain: 0.9,
        release: 1,
        releaseCurve: 'linear'
    }
  },
  MonoSynth: {
    detune: 0,
    volume: -10,
    portamento: 0,
    oscillator: {
      type: 'sine'
    },
    filter: {
      Q: 6,
      type: 'lowpass',
      rolloff: -24,
      wet: 0
    },
    envelope: {
      attack: 0.005,
      attackCurve: 'linear',
      decay: 0.1,
      sustain: 0.9,
      release: 1,
      releaseCurve: 'linear'
    },
    filterEnvelope: {
      attack: 0.06,
      decay: 0.2,
      sustain: 0.5,
      release: 2,
      baseFrequency: 200,
      octaves: 7,
      exponent: 2
    }
  },
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
  },
  FMSynth: {
    oscillator: {
      type: 'sine'
    },
    volume: 0,
    harmonicity: 3,
    modulationIndex: 10,
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
  },
  DuoSynth: {
    vibratoAmount: 0.5,
    vibratoRate: 5,
    harmonicity: 1.5,
    voice0: {
      volume: -10,
      portamento: 0,
      detune: 0,
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.01,
        attackCurve: 'linear',
        decay: 0,
        sustain: 1,
        release: 0.5,
        releaseCurve: 'linear'
      },
      filterEnvelope: {
        attack: 0.01,
        attackCurve: 'linear',
        decay: 0,
        sustain: 1,
        release: 0.5,
        releaseCurve: 'linear'
      }
    },
    voice1: {
      volume: -10,
      portamento: 0,
      detune: 0,
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.01,
        attackCurve: 'linear',
        decay: 0,
        sustain: 1,
        release: 0.5,
        releaseCurve: 'linear'
      },
      filterEnvelope: {
        attack: 0.01,
        attackCurve: 'linear',
        decay: 0,
        sustain: 1,
        release: 0.5,
        releaseCurve: 'linear'
      }
    }
  }
}
