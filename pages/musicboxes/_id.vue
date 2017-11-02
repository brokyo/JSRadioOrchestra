<template>
    <main id="player">
      <div v-if="!userStart">
        <h1>{{$store.state.meta.title}}</h1>
        <h3>Lower octave: 'Q', 'W', 'E', 'R', 'T'</h3>
        <h3>Upper octave: 'H', 'J', 'K', 'L', ';'</h3>
        <h4>All compositions last three minutes</h4>
        <br>
        <br>
        <br>
        <h4>{{$store.state.meta.intro}}</h4>
        <button @click="start">Start</button>
      </div>
      <div v-if="userStart && loaded">
        <player @ended="ended"></player>
      </div>
      <u3c :config="this.u3c" v-if="!userStart"></u3c>
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
        userStart: false,
        u3c: {
          about: 'This digital music box was created in our little planet. Read more about it at under-construct.club and make your own at /build.',
          instructions: 'It\'s an instrument play it with the keys above however you think is best. no one will hear it, you can\'t share what you make, it\'s just a chance to sit in front of your computer in a different way.',
          db: 'jsradioorchestra'
        }
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
