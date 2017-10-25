<template>
  <pre>{{$store.state}}</pre>
</template>

<script>
import axios from '../plugins/axios.js'

export default {

  name: 'axios',

  data () {
    return {

    }
  },
  mounted () {
    axios.get('musicboxes/-KxFZ8QPcpWsEsdiRmha.json')
    .then(res => {
      this.$store.commit('PLAY_CONFIG', res.data)
    })
  }
}
</script>

<style lang="css" scoped>
</style>
