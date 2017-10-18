<template>
<main>
  <h3>Scale</h3>
  <select v-model="activeScale">
    <option v-for="scale in scales" :value="scale">{{scale.name}}</option>
  </select>
  <div v-if="activeScale">
    <label>Key:</label>
    <select v-model="scaleKey">
      <option v-for="note in scaleConfig.possibleNotes">{{note}}</option>
    </select>
    <label>Octave 1</label>
    <select v-model="octave1">
      <option v-for="octave in scaleConfig.possibleOctaves">{{octave}}</option>
    </select>
    <label>Octave 2</label>
    <select v-model="octave2">
      <option v-for="octave in scaleConfig.possibleOctaves">{{octave}}</option>
    </select>
  </div>
<!--   <div class="triggerContainer">
    <synthtrigger v-for="pitch in activeScale.config" :config="pitch" :synth="constructed_synth" @playing="triggerActive"></synthtrigger>
  </div> -->
</main>
</template>

<script>
import synthtrigger from '../synthtrigger.vue'

export default {

  name: 'triggers',
  components: ['synthtrigger'],
  data () {
    return {
      activeScale: [],
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
      ],
      scaleConfig: {
        possibleNotes: ['A', 'A#', 'B', 'B#', 'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'F#', 'G', 'G#'],
        possibleOctaves: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      },
      octave1: '',
      octave2: '',
      scaleKey: '',
      currentlyPlaying: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
      }

    };
  },
  watch: {
    octave1: function (newOctave) {
      this.activeScale.triggers.octave1 = Number(newOctave)
      this.activeScale.config.forEach(function (pitch) {
        if (pitch.id <= 4) {
          pitch.octave = Number(newOctave)
        }
      })
    },
    octave2: function (newOctave) {
      this.activeScale.triggers.octave2 = Number(newOctave)
      this.activeScale.config.forEach(function (pitch) {
        if (pitch.id > 4) {
          pitch.octave = Number(newOctave)
        }
      })
    },
    scaleKey: function (newKey) {
      this.activeScale.triggers.key = newKey
      let newOrigin = this.scaleConfig.possibleNotes.indexOf(newKey)
      let newScale = this.reorder(this.scaleConfig.possibleNotes, newOrigin)
      let vue = this

      this.activeScale.config.forEach(function (pitch) {
        if (pitch.id === 0 || pitch.id === 5) {
          pitch.note = newScale[vue.activeScale.steps[0]]
        }

        if (pitch.id === 1 || pitch.id === 6) {
          pitch.note = newScale[vue.activeScale.steps[1]]
        }

        if (pitch.id === 2 || pitch.id === 7) {
          pitch.note = newScale[vue.activeScale.steps[2]]
        }

        if (pitch.id === 3 || pitch.id === 8) {
          pitch.note = newScale[vue.activeScale.steps[3]]
        }

        if (pitch.id === 4 || pitch.id === 9) {
          pitch.note = newScale[vue.activeScale.steps[4]]
        }
      })
    },
    activeScale: function (newScale) {
      this.scaleKey = newScale.triggers.key
      this.octave1 = newScale.triggers.octave1
      this.octave2 = newScale.triggers.octave2
    }
  },
  methods: {
    triggerActive: function (active) {
      this.currentlyPlaying[active.id] = active.active
    },
    reorder: function (data, index) {
      return data.slice(index).concat(data.slice(0, index))
    }
  },
  computed: {
    ...mapGetters([
      'constructed_synth'
    ])
  }
};
</script>

<style lang="css" scoped>
</style>
