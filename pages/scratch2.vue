<template>
<main>
	<!-- <background-video></background-video> -->
    <!-- <color-filter-overlay class="colorFilter" :active="playing"></color-filter-overlay> -->
    <mount-synth></mount-synth>
</main>
</template>

<script>
import colorFilterOverlay from '../components/player/colorfilter_overlay.vue'
import backgroundVideo from '../components/player/backgroundvideo.vue'
import mountSynth from '../components/mountsynth.vue'

if (process.browser) {
    var Tone = require('tone')
}

export default {

  name: 'player',
  components: {
    colorFilterOverlay, backgroundVideo, mountSynth
  }
}
</script>

<style lang="css" scoped>
</style>