<template>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters([
      'active_scale'
    ])
  },
  mounted: function () {
    var vue = this

    // Setup
    Tone.context.close()
    Tone.context = new AudioContext()
    this.synth = new Tone.PolySynth(8, Tone[this.toneConfig.synth])
    this.synth.set(this.toneConfig.synthMemberValues)

    this.filter = new Tone.Filter()
    this.filter.set(this.toneConfig.filterValues)

    this.synth.connect(this.filter)
    this.filter.connect(Tone.Master)

    // Corruption
    _.forEach(this.$store.state.corruption, function (effect) {

      if (effect.type === 'detune' && effect.active) {

        Tone.Transport.scheduleOnce(function (time) {
          let detuneAmount = 0
          Tone.Transport.scheduleRepeat(function (time) {
            detuneAmount += effect.detuneAmount

            vue.synth.set({'detune': detuneAmount})
          }, String(effect.interval) + 's')
        }, String(effect.start) + 's')

      }

      if (effect.type === 'volumeDown' && effect.active) {

        Tone.Transport.scheduleOnce(function (time) {
          let volume = 0
          Tone.Transport.scheduleRepeat(function (time) {
            volume -= effect.volumeDecrease
            if (volume > effect.minVolume) {
              vue.synth.set({'volume': volume})
            } else {
              // Cancel this probably
            }
          }, String(effect.interval) + 's')
        }, String(effect.start) + 's')

      }

      if (effect.type === 'compression' && effect.active) {
        Tone.Transport.scheduleOnce(function (time) {
          var compressor = new Tone.Compressor(effect.members).toMaster()
          vue.filter.disconnect(Tone.Master)
          vue.filter.connect(compressor)
        }, effect.start)
      }
    })


    _.forEach(vue.active_scale, function (trigger) {
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

  }
}
</script>

<style lang="css" scoped>
</style>
