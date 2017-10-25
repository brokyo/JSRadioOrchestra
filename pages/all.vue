<template>
  <main>
    <h1>All Music Boxes</h1>
    <div v-for="box in boxArray">
      <h4><router-link :to="{ name: 'musicboxes-id', params: { id: box }}">{{allBoxes[box].meta.title}}</router-link></h4>
      <h6>{{allBoxes[box].meta.knobtwister}}</h6>
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
        boxArray: Object.keys(res.data),
        allBoxes: res.data
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>
