<template>
  <main class="video-background">
    <no-ssr class="video-foreground">
      <youtube id="video" :videoId='videoId' player-width="100%" player-height="100%" :player-vars='{autoplay: 1, showinfo: 0, modestbranding:1, playlist: videoId, loop: 1, controls: 0, fs: 1}' @ready="ready"></youtube>
    </no-ssr>
  </main>
</template>

<script>
import NoSSR from 'vue-no-ssr'

export default {

  name: 'video',
  components: {
    'no-ssr': NoSSR
  },
  data () {
    return {
      height: '',
      width: '',
      videoId: 'yIMDgPKgN1w',
      fs: 0
    }
  },
  computed: {

  },
  methods: {
    ready (player) {
      player.setVolume(10)
      player.setPlaybackQuality('small')
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
#video{
  background: blue;
  height: 100vh;

  iframe {
    height: 100vh;
  }
}

.video-background {
  background: #000;
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: -99;
}

.video-foreground,
.video-background iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

@media (min-aspect-ratio: 16/9) {
  .video-foreground { height: 300%; top: -100%; }
}
@media (max-aspect-ratio: 16/9) {
  .video-foreground { width: 300%; left: -100%; }
}



</style>
