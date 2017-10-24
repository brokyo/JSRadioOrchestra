<template>
<main>
  <h3>Scale</h3>
  <select @change="updateScale">
    <option v-for="scale in scales" :value="scale.id">{{scale.name}}</option>
  </select>
  <div v-if="scaleName">
    <label>Key:</label>
    <select v-model="key">
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
  <div class="triggerContainer">
    <synthtrigger v-for="pitch in active_scale" :config="pitch" :synth="synth" @playing="triggerActive"></synthtrigger>
  </div>
</main>
</template>

<script>
import { mapGetters } from 'vuex'
import synthtrigger from '../synthtrigger.vue'
var _ = require('lodash')

export default {
  name: 'triggers',
  props: ['synth'],
  components: { synthtrigger },
  data () {
    return {
      scales: [
        {
          id: 0,
          name: 'Bright (Yo Scale)',
          steps: [0, 2, 6, 8, 10]
        },
        {
          id: 1,
          name: 'Dark (In Scale)',
          steps: [0, 1, 6, 8, 9]
        }
      ],
      scaleConfig: {
        possibleNotes: ['A', 'A#', 'B', 'B#', 'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'F#', 'G', 'G#'],
        possibleOctaves: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      },
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

    }
  },
  computed: {
    octave1: {
      get: function () {
        return this.$store.state.scale.config.octave1
      },
      set: function (newOctave) {
        this.$store.commit('SET_OCTAVE1', newOctave)        
      }
    },
    octave2: {
      get: function () {
        return this.$store.state.scale.config.octave2
      },
      set: function (newOctave) {
        this.$store.commit('SET_OCTAVE2', newOctave)        
      }
    },
    key: {
      get: function () {
        return this.$store.state.scale.config.key
      },
      set: function (newKey) {
        this.$store.commit('SET_KEY', newKey)
      }
    },
    scaleName: {
      get: function () {
        return this.$store.state.scale.config.scaleName
      }
    },
    ...mapGetters([
      'active_scale'
    ])
  },
  methods: {
    updateScale: function (event) {
      let newScale = this.scales[event.target.value]
      this.$store.commit('SET_SCALE', newScale)
    },
    triggerActive: function (active) {
      this.currentlyPlaying[active.id] = active.active
    }
  }
}
</script>

<style lang="css" scoped>
</style>
