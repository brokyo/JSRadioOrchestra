<template>
  <main>
    <button @click="synth.triggerAttackRelease(220, 1)">trigger</button>
    <button @click="dispose()">Dispose</button>
<!--     <button @click="post()">Post</button>
    <h1>{{users}}</h1> -->
  </main>
</template>
<script>
import axios from '../plugins/axios.js'
if (process.browser) {
    var Tone = require('tone')
    window.Tone = Tone
    // var p5 = require('p5')
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
  data () {
    return {
      synth: {}
    }
  },
  mounted: function () {
    this.synth = new Tone.MonoSynth().toMaster()
  },
  methods: {
    dispose: function () {
      this.synth.disconnect(Tone.Master)
      // this.synth.dispose()
      this.synth = new Tone.DuoSynth().toMaster()
      // this.synth = new Tone.DuoSynth().toMaster()
      // this.synth = new Tone.DuoSynth().toMaster()
      // this.synth = new Tone.DuoSynth().toMaster()
      // this.synth = new Tone.DuoSynth().toMaster()
    }
    // post: function () {
    //   axios.post('another.json', {golly: 'gee'})
    //     .then(res => {
    //       console.log('worked', res)
    //     })
    //     .catch(e => {
    //       console.log('broke', e)
    //     })
    // }
  }
}
</script>

<style lang="css" scoped>
</style>
