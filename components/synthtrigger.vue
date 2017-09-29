<template>
<section>
  {{config.note}} {{config.octave}}
  <h4 :class="{'notePlaying': notePlaying}">
    {{ config.keyCode }}
  </h4>
</section>
</template>

<script>

export default {
  name: 'synthtrigger',
  props: ['config', 'synth'],
  computed: {
  	noteToPlay: function () {
  		return String(this.config.note) + String(this.config.octave)
  	}
  },
  data () {
    return {
      notePlaying: false,
    }
  },
  mounted: function () {
  	var vue = this

    window.addEventListener('keydown', function (e) {
      if (e.key === vue.config.keyCode & !e.repeat) {
        vue.notePlaying = true
        vue.synth.triggerAttack(vue.noteToPlay)
        vue.$emit('playing', {id: vue.config.id, active: true})
      }
    })

    window.addEventListener('keyup', function (e) {
      if (e.key === vue.config.keyCode & !e.repeat) {
        vue.notePlaying = false
        vue.synth.triggerRelease(vue.noteToPlay)
        vue.$emit('playing', {id: vue.config.id, active: false})
      }
    })
  }
}
</script>
<style lang="css" scoped>
section {
  padding: 20px;
  border: 1px solid black;
  width: 200px;
  flex-grow: 1;
}

.notePlaying {
  background-color: red;
}

h4 {
    text-align: center;
    background-color: #fff;
    margin: 0 auto;
    border: 1px solid #000;
    padding: 20px;
}
</style>
