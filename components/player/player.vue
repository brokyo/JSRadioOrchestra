<template>
<main>
    <background-video></background-video>
    <color-filter-overlay class="color-filter-overlay" :active="playing"></color-filter-overlay>
    <mount-synth @attackStart="attackStart" @releaseStart="releaseStart"></mount-synth>
</main>
</template>

<script>
import colorFilterOverlay from './colorfilter_overlay.vue'
import backgroundVideo from './backgroundvideo.vue'
import mountSynth from '../mountsynth.vue'

if (process.browser) {
    var Tone = require('tone')
}

export default {

  name: 'player',
  components: {
    colorFilterOverlay, backgroundVideo, mountSynth
  },
  data () {
    return {
      playing: {
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
  methods: {
    attackStart: function (trigger) {
      this.playing[trigger] = true
    },
    releaseStart: function (trigger) {
      this.playing[trigger] = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
