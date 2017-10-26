<template>
<div class="video-background">
	<div class="video-foreground">
	  <iframe :src="activeBackgroundURL" frameborder="0" allowfullscreen></iframe>
	</div>
</div>
</template>

<script>
export default {

  name: 'backgroundvideo',
  computed: {
  	background () {
  		return this.$store.state.video
  	},
    activeBackgroundURL: function () {
      return 'https://www.youtube.com/embed/' + this.background.videoId + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&vq=small&playlist=' + this.background.videoId + '&start=' + this.background.params.start + '&end=158' + this.background.params.end
    }
  }
}
</script>

<style lang="scss" scoped>
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