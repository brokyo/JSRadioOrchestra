<template>
<main>
  <button @click="lateSynth">Late Synth</button>
  <button @click="distort">Performance Problems</button>
  <button @click="noise">Tone Noise</button>
  <button @click="compressor">Compressor</button>
  <button @click="additionalNote">Additional Note</button>
  <div>
    <h4>Compressor</h4>
  </div>
</main>
</template>

<script>
import titleCard from '../components/player/titlecard.vue'
var _ = require('lodash')
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
      tone: {},
      addedEffects: {
        additionalNoteSynth: {}
      },
      synth2: {}
    }
  },
  computed: {
    activeScale () { return this.$store.state.scale }
  },
  methods: {
    distort () {
      for (let i = 0; i < 40; i++) {
        this.synth = new Tone.MonoSynth().toMaster()
      }
    },
    lateSynth () {
      this.synth2 = new Tone.PolySynth(8, Tone.MonoSynth).toMaster()
      console.log(this.synth2)
      // this.synth2.set(this.toneConfig.synthMemberValues)
    },
    noise () {
      var noise = new Tone.Noise('white').start()

      var autoFilter = new Tone.AutoFilter({
        'frequency': '8m', 
        'min': 800, 
        'max': 15000
      }).connect(Tone.Master)

      noise.connect(autoFilter)
      autoFilter.start()
    },
    compressor () {
      var comp = new Tone.Compressor({
        ratio: 20,
        // ratio: 1,
        threshold: -15,
        release: 0,
        attack: 0,
        knee: 10
      })
      this.tone.synth.disconnect(this.tone.filter)
      this.tone.synth.connect(comp)
      comp.connect(Tone.Master)
    },
    additionalNote () {
      this.addedEffects.additionalNoteSynth = new Tone.PolySynth(8, Tone[this.toneConfig.synth])
      this.tone.synth.set(this.toneConfig.synthMemberValues)
      this.tone.synth.set({'detune': -120})
    }
  },
  mounted () {
    this.toneConfig = _.cloneDeep(this.$store.state.tone)
    Tone.context.close()
    Tone.context = new AudioContext()
    Tone.Transport.start()

    Tone.Transport.scheduleOnce(function (time) {
      Tone.Transport.scheduleRepeat(function (time) {
        console.log(100)
      }, '1s')      
    }, '5s')

    this.tone.synth = new Tone.PolySynth(8, Tone[this.toneConfig.synth])
    this.tone.synth.set(this.toneConfig.synthMemberValues)

    if (this.toneConfig.filter) {
      this.tone.filter = new Tone.Filter(this.toneConfig.filterMemberValues) 
    } else {
      this.tone.filter = new Tone.Gain()
    }

    this.tone.synth.connect(this.tone.filter)
    this.tone.filter.connect(Tone.Master)

    var vue = this
    _.forEach(vue.activeScale, function (trigger) {
      let noteToPlay = String(trigger.note) + String(trigger.octave)
        window.addEventListener('keydown', function (e) {
          if (e.key === trigger.keyCode & !e.repeat) {
            vue.tone.synth.triggerAttack(noteToPlay)
            if (_.isEmpty(vue.synth2)) {
              vue.synth2.triggerAttack(noteToPlay)
            }

            if (_.isEmpty(vue.addedEffects.additionalNoteSynth)) {
              vue.additionalEffects.triggerAttack(noteToPlay)
            }

            vue.$emit('attackStart', trigger.id)
          }
        })

        window.addEventListener('keyup', function (e) {
          if (e.key === trigger.keyCode & !e.repeat) {
            vue.tone.synth.triggerRelease(noteToPlay)
            if (_.isEmpty(vue.synth2)) {
              vue.synth2.triggerRelease(noteToPlay)
            }

            if (_.isEmpty(vue.addedEffects.additionalNoteSynth)) {
              vue.additionalEffects.triggerRekease(noteToPlay)
            }

            vue.$emit('releaseStart', trigger.id)
          }
        })
    })
  }
}
</script>

<style lang="css" scoped>

</style>
