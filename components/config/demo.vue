<template>
<main>
  <player class="player-demo"></player>
  <div>
    <label>Title</label>
    <input type="text" :value="meta.title" @change="update('title', $event.target.value)"></input>
    <label>Name</label>
    <input type="text" :value="meta.name" @change="update('knobtwister', $event.target.value)"></input>
    <button @click="save()">Publish</button>
  </div>
</main>
</template>

<script>
import axios from '../../plugins/axios.js'
import player from '../player/player.vue'
export default {
  name: 'demo',
  components: {
    player
  },
  data () {
    return {

    }
  },
  computed: {
    meta () { return this.$store.state.meta }
  },
  methods: {
    update: function (key, value) {
      let update = {
        [key]: value
      }

      this.$store.commit('UPDATE_META', update)
    },
    save: function () {
      axios.post('musicboxes.json', this.$store.state)
        .then(res => {
          console.log('worked', res)
        })
        .catch(e => {
          console.log('broke', e)
        })
    }
  }
}
</script>

<style lang="css" scoped>
.player-demo {
  z-index: -999;
}
</style>
