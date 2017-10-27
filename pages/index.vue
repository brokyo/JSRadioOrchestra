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
      <u3c :config="this.u3c" v-if="!userStart"></u3c>
    </main>
</template>

<script>
import axios from '../plugins/axios.js'
import player from '../components/player/player.vue'

export default {

  name: 'index',
  components: {
    player
  },
  data () {
    return {
        loaded: false,
        userStart: false,
        u3c: {
          about: "Our Little Planet is a digital music box/set of windchimes/instrument/video painting generator/thing. I don't know; figuring it out. See all music boxes at /all and make your own at /build.",
          instructions: 'Click start then press the keys listed.',
          next: "Make your own at /build. I hope to turn this into a physical, networked device that plays generative music but I need to see what people do with this and what sounds interesting first. So make one! It'll be available for playing here and at The Under Construction Club",
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
    axios.get('musicboxes/-KxFZ8QPcpWsEsdiRmha.json')
    .then(res => {
        this.$store.commit('PLAY_CONFIG', res.data)
        this.loaded = true
    })
  }
}
</script>

<style lang="css" scoped>
</style>
