<template>
  <main>
    <h1>Edit Music Boxes</h1>
    <p>This doesn't work well for more than me but whatever if you're here you know what you're doing and actually it's impossible to blow something up so you're good</p>
    <div v-for="(box, key) in allBoxes">
      <h4><router-link v-on:click.native="setToStore(box)" :to="{ path: 'build'}">{{box.meta.title}}</router-link></h4>
      <h6>{{box.meta.creator}}</h6>
    </div>
  </main>
</template>

<script>
import axios from '../plugins/axios.js'

export default {
  name: 'all',
  head () {
    return {
      title: 'Edit Music Box'
    }
  },
  asyncData () {
    return axios.get('musicboxes.json')
    .then((res) => {
      return {
        allBoxes: res.data
      }
    })
  },
  methods: {
  	setToStore: function (box) {
  		this.$store.commit('PLAY_CONFIG', box)
  	}
  }
}
</script>

<style lang="scss" scoped>
p {
	font-size: 12px;
}
</style>
