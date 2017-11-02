<template>
<main>
  <player class="player-demo" context="build"></player>
  <div class="setParams">
    <label>Title</label>
    <input type="text" :value="meta.title" @change="update('title', $event.target.value)"></input>
    <label>Intro Text</label>
    <textarea :value="meta.intro" @change="update('title', $event.target.value)"></textarea>    
    <label>Name</label>
    <input type="text" :value="meta.creator" @change="update('creator', $event.target.value)"></input>
    <label>Duration</label>
    <input type="number" :value="meta.length" @change="update('length', $event.target.value)"></input>
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
          alert('saved!')
          this.$router.push('/all')
        })
        .catch(e => {
          console.log('broke', e)
        })
    }
  }
}
</script>

<style lang="css" scoped>
main {
  display: flex;
}

.setParams {
  padding: 10px;
  background-color: white;
  z-index: 99999999;
  position: fixed;

  text-area {
    width: 80px;
  }
}

.player-demo {
  z-index: -999;
}

</style>
