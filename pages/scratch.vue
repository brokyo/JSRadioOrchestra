<template>
  <main>
    <button @click="post()">Post</button>
    <h1>{{users}}</h1>
  </main>
</template>
<script>
import axios from '../plugins/axios.js'
if (process.browser) {
    var Tone = require('tone')
    window.Tone = Tone
    var p5 = require('p5')
}

export default {
  name: 'scratch',
  asyncData () {
    return axios.get('another.json')
    .then((res) => {
      return {
        users: res.data
      }
    })
  },
  mounted: function () {
  },
  methods: {
    post: function () {
      axios.post('another.json', {golly: 'gee'})
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
</style>
