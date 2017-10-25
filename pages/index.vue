<template>
    <main>
        <h1>Our Little Planet</h1>
        <player v-if="loaded"></player>
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
        loaded: false
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
