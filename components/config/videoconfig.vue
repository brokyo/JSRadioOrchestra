<template>
<main>
<background-video></background-video>
<div class="config">
  <div class="configPanel">
    <h3>Video Cofig</h3>
    <select @change="videoSelect">
      <option v-for="video in videoList" :value="video.id">{{video.title}}</option>
    </select>
  	<div v-for="(value, key) in background" v-if="typeof(value) !== 'object'">
      <label>{{key}}</label>
  		<input :value="value" @change="update(value, key, $event.target.value)"></input>
  	</div>
  	<div v-else >
      <div v-for="(subvalue, subkey) in value">
        <label>{{subkey}}</label>
    		<input :value="subvalue" @change="update(value, key, $event.target.value, subvalue, subkey)"></input>
      </div>
  	</div>
  </div>
</div>


</main>
</template>

<script>
import backgroundVideo from '../player/backgroundvideo.vue'

export default {

  name: 'videoConfig',
  components: {
    backgroundVideo
  },
  data () {
    return {
      videoList: [
        {title: 'micro burst near lowell indiana', id: 'L6CtOH8RVmM'},
        {title: 'parking lot', id: 'm592XzAQfiw'},
        {title: 'plane', id: 'esbfjBWuZ3o'},
        {title: 'walk1', id: 'GFFWZ4Em1wM'},
        {title: 'walk2', id: 'whjlvr-3Lxc'},
        {title: 'walk3', id: 'o34e0406WL8'},
        {title: 'walk4', id: 'g98gwuSo680'}  
      ]      
    }
  },
  computed: {
  	background () {
  		return this.$store.state.video
  	}
  },
  methods: {
    videoSelect () {
      this.$store.commit('SET_VIDEO_PARAMS', {videoId: event.target.value})
    },
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
main {

}

h1 {
  font-size: 200px;
  color: white;
}

.configPanel {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 250px;
  padding: 10px;
  background: white;
  border: 1px solid black;
}

</style>
