<template>
  <div class="container">
    <div class="bands" v-for="octave in layout" :style="octave.config">
      <div v-for="(band, index) in octave.bands" :style="[band.base, active[band.index] ? band.transitionIn : band.transitionOut]"></div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'colorfilter',
  props: ['active'],
  data () {
    return {
    }
  },
  computed: {
    config: function () {
      return this.$store.state.overlay.colorConfig
    },
    transitions: function () {
      if (this.$store.state.tone.synth === 'DuoSynth') {
        return this.$store.state.tone.synthMemberValues.voice0.envelope
      } else {
        return this.$store.state.tone.synthMemberValues.envelope
      }

    },
    layout: function () {
      var vue = this

      function baseStyles (octave, bandValues) {
        this['flex-grow'] = bandValues.grow
        this['background-color'] = bandValues.color

        this.position = 'relative'
        this.top = String(bandValues.offsetTop) + '%'
        this.left = String(bandValues.offsetLeft) + '%'

      }

      function transitionIn (bandValues) {
        this.opacity = bandValues.endOpacity
        this.transition = 'opacity ' + String(vue.transitions.attack) + 's ease'
      }

      function transitionOut (bandValues) {
        this.opacity = bandValues.startOpacity
        this.transition = 'opacity ' + String(vue.transitions.release) + 's ease'
      }

      const LAYOUT = []

      this.config.forEach(function (octave) {
        let munge = {
          config: octave.config,
          bands: []
        }

        octave.styles.forEach(function (bandValues) {
          let band = {
            index: bandValues.id,
            base: new baseStyles(octave, bandValues),
            transitionIn: new transitionIn(bandValues),
            transitionOut: new transitionOut(bandValues)
          }
          munge.bands.push(band)
        })

        LAYOUT.push(munge)
      })

      return LAYOUT

     }
  },
  methods: {
    saveLayout: function () {
      this.$store.commit('SET_COLORS', this.layout)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  min-width: 100vw;
}

.bands {
  position: fixed;
  top: 0;
  height: 100vh;
  min-width: 100vw;

}
</style>

