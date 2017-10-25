<template>
    <main id="player">
      <div v-if="!userStart">
        <h1>Our Little Planet</h1>
        <h3>Lower octave: 'Q', 'W', 'E', 'R', 'T'</h3>
        <h3>Upper octave: 'H', 'J', 'K', 'L', ';'</h3>
        <h4>All compositions last three minutes</h4>
        <br>
        <br>
        <br>
        <h4>It's a chance to sit quietly and make something small just for you. Take it.</h4>
        <button @click="start">Start</button>
      </div>
      <div v-if="userStart && loaded">
        <player @ended="ended"></player>
      </div>
    </main>
</template>

<script>
import axios from '../../plugins/axios.js'
import player from '../../components/player/player.vue'

export default {

  name: 'singlebox',
  components: {
    player
  },
  data () {
    return {
        loaded: false,
        userStart: false
    }
  },
  methods: {
    start: function () {
      var player = document.getElementById('player')

      if (player.requestFullscreen) {
        player.requestFullscreen()
      } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen()
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen()
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen()
      }
      this.userStart = true
    },
    ended: function () {
      console.log('its over fucker')
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  },
  mounted () {
    axios.get('musicboxes/' + this.$route.params.id + '.json')
    .then(res => {
        this.$store.commit('PLAY_CONFIG', res.data)
        this.loaded = true
    })
  }
}
</script>

<style lang="css" scoped>
</style>
