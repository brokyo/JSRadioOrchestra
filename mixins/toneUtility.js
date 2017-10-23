import synthDefaults from './synthdefaults.js'
export default {
synthDefaults,
scales: [
    {
      name: 'Bright (Yo Scale)',
      config: [
        { id: 0, keyCode: 'q', note: 'D', octave: 4 },
        { id: 1, keyCode: 'w', note: 'E', octave: 4 },
        { id: 2, keyCode: 'e', note: 'G', octave: 4 },
        { id: 3, keyCode: 'r', note: 'A', octave: 4 },
        { id: 4, keyCode: 't', note: 'B', octave: 4 },
        { id: 5, keyCode: 'h', note: 'D', octave: 5 },
        { id: 6, keyCode: 'j', note: 'E', octave: 5 },
        { id: 7, keyCode: 'k', note: 'G', octave: 5 },
        { id: 8, keyCode: 'l', note: 'A', octave: 5 },
        { id: 9, keyCode: ';', note: 'B', octave: 5 }
      ],
      triggers: {
        key: 'D',
        octave1: 4,
        octave2: 5
      },
      steps: [0, 2, 6, 8, 10]
    },
    {
      name: 'Dark (In Scale)',
      config: [
        { id: 0, keyCode: 'q', note: 'D', octave: 3 },
        { id: 1, keyCode: 'w', note: 'D#', octave: 3 },
        { id: 2, keyCode: 'e', note: 'G', octave: 3 },
        { id: 3, keyCode: 'r', note: 'A', octave: 3 },
        { id: 4, keyCode: 't', note: 'A#', octave: 3 },
        { id: 5, keyCode: 'h', note: 'D', octave: 4 },
        { id: 6, keyCode: 'j', note: 'D#', octave: 4 },
        { id: 7, keyCode: 'k', note: 'G', octave: 4 },
        { id: 8, keyCode: 'l', note: 'A', octave: 4 },
        { id: 9, keyCode: ';', note: 'A#', octave: 4 }
      ],
      triggers: {
        key: 'D',
        octave1: 3,
        octave2: 4
      },
      steps: [0, 1, 6, 8, 9]
    }
  ]
}
