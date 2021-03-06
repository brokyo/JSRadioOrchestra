<template>
  <main>
    <section>
      <button @click="hideControls = !hideControls">Hide</button>
      <button @click="randomize('shallow')">Randomize</button>
      <button @click="randomize('deep')">Deep Randomize</button>
      <div v-show="hideControls" v-for="(octave, index) in colorConfig">
        <div>
          <h1>{{octave.name}}</h1>
          <label>Direction</label>
          <select :value="octave.config['flex-direction']" @change="updateGroup(index, 'flex-direction', $event.target.value)">
            <option value="column">Column</option>
            <option value="row">Row</option>
          </select>
          <select :value="octave.config['display']" @change="updateGroup(index, 'display', $event.target.value)">
            <option value="flex">Show [display: flex]</option>
            <option value="none">Hide</option>
          </select>
          <div class="octaveConfig" v-for="band in octave.styles">
            <label>Color</label>
            <input type="color" :value="band.color" @change="updateBand(band.id, index, 'color', $event.target.value)"></input>
            <label>Grow</label>
            <input type="number" :value="band.grow" @change="updateBand(band.id, index, 'grow', $event.target.value)"></input>
            <label>Offset Top</label>
            <input type="number" :value="band.offsetTop" @change="updateBand(band.id, index, 'offsetTop', $event.target.value)"></input>
            <label>Offset Left</label>
            <input type="number" :value="band.offsetLeft" @change="updateBand(band.id, index, 'offsetLeft', $event.target.value)"></input>
            <label>Start Opacity</label>
            <input type="number" :value="band.startOpacity" @change="updateBand(band.id, index, 'startOpacity', $event.target.value)"></input>
            <label>End Opacity</label>
            <input type="number" :value="band.endOpacity" @change="updateBand(band.id, index, 'endOpacity', $event.target.value)"></input>
          </div>
        </div>
      </div>
    </section>
    <color-filter-overlay class="color-filter-overlay" :active="playing"></color-filter-overlay>

  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import colorFilterOverlay from '../player/colorfilter_overlay.vue'

if (process.browser) {
    var Tone = require('tone')
}

var _ = require('lodash')


export default {
  name: 'colorfilter-config',
  props: ['active', 'transitions'],
  components: {
    colorFilterOverlay
  },
  data () {
    return {
      hideControls: true,
      playing: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
      },
      tone: {
        synth: {},
        filter: {},
        effects: []
      }
    }
  },
  computed: {
    colorConfig () { return _.cloneDeep(this.$store.state.overlay.colorConfig) },
    synthType () { return this.$store.state.tone.synth },
    synthValues () { return this.$store.state.tone.synthMemberValues },
    filterActive () { return this.$store.state.tone.filter },
    filterValues () { return this.$store.state.tone.filterMemberValues },
    ...mapGetters([
      'active_scale'
    ])
  },
  methods: {
    randomize: function (type) {
      var vue = this
      let octaveIndex = 0
      let bandIndex = 0

      this.colorConfig.forEach(function (octave) {
        let coinFlip = Math.floor(Math.random() * 2)

        if (coinFlip === 0) {
          octave.config['flex-direction'] = 'column'
        } else {
          octave.config['flex-direction'] = 'row'
        }

        octave.styles.forEach(function (band) {
          let coinFlip = Math.floor(Math.random() * 2)

          band.grow = Math.floor(Math.random() * 3)

          if (type === 'deep') {
            band.offsetTop = Math.floor(Math.random() * 40)
            band.offsetLeft = Math.floor(Math.random() * 40)            
          }

          if (type === 'shallow') {
            band.offsetTop = 0
            band.offsetLeft = 0                        
          }

          if (coinFlip === 0) {
            band.offset = -band.offset
          }

          band.color = '#' + Math.floor(Math.random() * 16777215).toString(16)

          let update = {
            meta: {
              bandIndex: bandIndex,
              arrayIndex: octaveIndex
            },
            band: band
          }
          vue.$store.commit('RANDOM_OVERLAY_BAND', update)
          if (bandIndex >= 4) {
            bandIndex = 0
          } else {
            bandIndex++
          }
        })

        let update = {
          meta: {
            arrayIndex: octaveIndex
          },
          config: octave.config
        }


        vue.$store.commit('RANDOM_OVERLAY_GROUP', update)
        octaveIndex++
      })
    },
    updateBand: function (id, index, key, value) {
      let update = {
        meta: {
          arrayIndex: index,
          id: id
        },
        payload: {
          [key]: value
        }
      }

      this.$store.commit('SET_OVERLAY_BAND_PARAMS', update)

    },
    updateGroup: function (index, key, value) {
      let update = {
        meta: {
          arrayIndex: index
        },
        payload: {
          [key]: value
        }
      }

      this.$store.commit('SET_OVERLAY_GROUP_PARAMS', update)
    }
  },
  mounted: function () {
    Tone.context.close()
    Tone.context = new AudioContext()

    this.tone.synth = new Tone.PolySynth(8, Tone[this.synthType])
    this.tone.synth.set(this.synthValues)

    if (this.filterActive) {
      this.tone.filter = new Tone.Filter(this.filterValues) 
    } else {
      this.tone.filter = new Tone.Gain()
    }

    this.tone.synth.connect(this.tone.filter)
    this.tone.filter.connect(Tone.Master)

    var vue = this
    var synth = this.tone.synth

    _.forEach(vue.active_scale, function (trigger) {
      let noteToPlay = String(trigger.note) + String(trigger.octave)

      window.addEventListener('keydown', function (e) {
        if (e.key === trigger.keyCode & !e.repeat) {
          synth.triggerAttack(noteToPlay)
          vue.playing[trigger.id] = true
        }
      })

      window.addEventListener('keyup', function (e) {
        if (e.key === trigger.keyCode & !e.repeat) {
          synth.triggerRelease(noteToPlay)
          vue.playing[trigger.id] = false
        }
      })
    })

  }
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  z-index: 1;
}

.octaveConfig {
  z-index: 1;
  display: block;

  label {
    display: inline-block;
  }
}

</style>
