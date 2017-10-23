<template>
<main>
  <button @click="show = !show">show</button>
  <title-card v-if="show === true"></title-card>
</main>
</template>

<script>
import titleCard from '../components/player/titlecard.vue'

if (process.browser) {
    var Tone = require('tone')
}

export default {

  name: 'player',
  components: {
    titleCard
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>

</style>
