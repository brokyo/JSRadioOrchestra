<template>
    <main>
      <div v-if="!userStart">
        <h1>Our Little Planet</h1>
        <h3>Lower octave: 'Q', 'W', 'E', 'R', 'T'</h3>
        <h3>Upper octave: 'H', 'J', 'K', 'L', ';'</h3>
        <h4>All compositions last three minutes</h4>
        <br>
        <br>
        <br>
        <h4>It's a chance to sit quietly and make something small just for you. Take it.</h4>
        <button @click="userStart = true">Start</button>
      </div>
      <div v-if="userStart && loaded">
        <player></player>
      </div>
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
        userStart: false
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
