<template>
<main>
<!-- Background Video -->
<div class="video-background">
<div class="video-foreground">
  <iframe :src="activeBackgroundURL" frameborder="0" allowfullscreen></iframe>
</div>
</div>

<div>
  <span v-for="(value, key) in background" v-if="typeof(value) !== 'object'">
  	<label>{{key}}:</label>
  	<input :value="value" @change="update(value, key, $event.target.value)"></input>
  </span>
  <span v-else v-for="(subvalue, subkey) in value"
  	<label>{{subkey}}</label>
  	<input :value="subvalue" @change="update(value, key, $event.target.value, subvalue, subkey)"></input>
  </span>
</div>


</main>
</template>

<script>
var _ = require('lodash')

export default {

  name: 'videoConfig',
  computed: {
  	background () {
  		return this.$store.state.video
  	},
    activeBackgroundURL: function () {
      return 'https://www.youtube.com/embed/' + this.background.videoId + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&vq=small&playlist=' + this.background.videoId + '&start=' + this.background.params.start + '&end=158' + this.background.params.end
    }
  },
  methods: {
  	update (storeValue, key, newValue, subvalue, subkey) {
  		let update = {}

  		if (subkey !== undefined) {
  			update = {
  				[key]: {
  					[subkey]: newValue
  				}
  			}
  		} else {
  			update = {
  				[key]: newValue
  			}
  		}

  		this.$store.commit('SET_VIDEO_PARAMS', update)
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