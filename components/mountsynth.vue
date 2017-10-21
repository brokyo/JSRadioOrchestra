<template>
</template>

<script>
if (process.browser) {
    var Tone = require('tone')
}

var _ = require('lodash')

export default {

  name: 'mountsynth',
  data () {
    return {
      synth: {},
      filter: {}
    }
  },
  computed: {
  	toneConfig () { return this.$store.state.tone },
    scaleConfig () { return this.$store.state.scale }
  },
  mounted: function () {
    Tone.context = new AudioContext()
    this.synth = new Tone.PolySynth(8, Tone[this.toneConfig.synth])
    this.synth.set(this.toneConfig.synthMemberValues)

    this.filter = new Tone.Filter()
    this.filter.set(this.toneConfig.filterValues)

    this.synth.connect(this.filter)
    this.filter.connect(Tone.Master)

    var vue = this

    _.forEach(vue.scaleConfig, function (trigger) {
      let noteToPlay = String(trigger.note) + String(trigger.octave)
        window.addEventListener('keydown', function (e) {
          if (e.key === trigger.keyCode & !e.repeat) {
            vue.synth.triggerAttack(noteToPlay)
            vue.$emit('attackStart', trigger.id)
          }
        })

        window.addEventListener('keyup', function (e) {
          if (e.key === trigger.keyCode & !e.repeat) {
            vue.synth.triggerRelease(noteToPlay)
            vue.$emit('releaseStart', trigger.id)
          }
        })
    })

  },
  beforeDestroy: function () {
    Tone.context.close()
  }
}
</script>

<style lang="css" scoped>
</style>
