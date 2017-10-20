<template>
  <main>
    <button @click="hideControls = !hideControls">Hide</button>
    <button @click="randomize">Randomize</button>
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
          <label>Offset</label>
          <input type="number" :value="band.offset" @change="updateBand(band.id, index, 'offset', $event.target.value)"></input>
          <label>Order</label>
          <input type="number" :value="band.order" @change="updateBand(band.id, index, 'order', $event.target.value)"></input>
          <label>Start Opacity</label>
          <input type="number" :value="band.startOpacity" @change="updateBand(band.id, index, 'startOpacity', $event.target.value)"></input>
          <label>End Opacity</label>
          <input type="number" :value="band.endOpacity" @change="updateBand(band.id, index, 'endOpacity', $event.target.value)"></input>
        </div>
      </div>
    </div>
    <color-filter-overlay class="colorFilter" :config="this.colorConfig" :active="playing"></color-filter-overlay>

  </main>
</template>

<script>
import colorFilterOverlay from '../colorfilter_overlay.vue'

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
    filterValues () { return this.$store.state.tone.filterMemberValues },
    activeScaleTrigger () { return this.$store.state.scale }
  },
  methods: {
    randomize: function () {
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
          band.offset = Math.floor(Math.random() * 40)

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
    this.tone.synth = new Tone.PolySynth(8, Tone[this.synthType])
    this.tone.synth.set(this.synthValues)

    this.tone.filter = new Tone.Filter()
    this.tone.filter.set(this.filterValues)

    this.tone.synth.connect(this.tone.filter)
    this.tone.filter.connect(Tone.Master)

    var vue = this
    var synth = this.tone.synth

    _.forEach(vue.activeScaleTrigger, function (trigger) {
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

  },
  beforeDestroy: function () {
    this.$store.commit('SET_OVERLAY', this.colorConfig)
  }
}
</script>

<style lang="scss" scoped>
.octaveConfig {
  z-index: 1;
  display: block;

  label {
    display: inline-block;
  }
}

.colorFilter {
  z-index: -1;
}
</style>
