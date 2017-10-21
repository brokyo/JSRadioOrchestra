<template>
<main>
  <h1>SUP IDIOTS</h1>
  <player class="player-demo"></player>
</main>
</template>

<script>
import player from '../player/player.vue'
export default {
  name: 'demo',
  components: {
    player
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.player-demo {
  z-index: -999;
}
</style>
