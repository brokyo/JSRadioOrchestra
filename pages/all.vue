<template>
  <main>
    <h1>All Music Boxes</h1>
    <div v-for="(box, key) in allBoxes">
      <h4><router-link :to="{ name: 'musicboxes-id', params: { id: key }}">{{box.meta.title}}</router-link></h4>
      <h6>{{box.meta.knobtwister}}</h6>
    </div>
  </main>
</template>

<script>
import axios from '../plugins/axios.js'

export default {

  name: 'all',
  asyncData () {
    return axios.get('musicboxes.json')
    .then((res) => {
      return {
        allBoxes: res.data
      }
    })
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style lang="css" scoped>
</style>
