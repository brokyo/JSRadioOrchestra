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
  props: ['octaves', 'transitions', 'active'],
  data () {
    return {
    }
  },
  computed: {
    layout: function() {
      var vue = this;

      function baseStyles(octave, bandValues) {
        this['flex-grow'] = bandValues.grow
        this.order = bandValues.order
        this['background-color'] = bandValues.color

        this.position = 'relative'
        if(octave.config['flex-direction'] === 'column') {
          this.top = String(bandValues.offset) + '%'
        } else {
          this.left = String(bandValues.offset) + '%'
        }

      }

      function transitionIn(bandValues) {
        this.opacity = bandValues.startOpacity
        this.transition = 'opacity ' + String(vue.transitions.attack) + 's ease'
      }

      function transitionOut(bandValues) {
        this.opacity = bandValues.endOpacity
        this.transition = 'opacity ' + String(vue.transitions.release) + 's ease'
      }

      const LAYOUT = []

      this.octaves.forEach(function (octave) {
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
          console.log(band)
          munge.bands.push(band)
        })

        LAYOUT.push(munge)
      })

      return LAYOUT

     }
  },
  methods: {
  },
  mounted: function() {
    console.log(this.layout)
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
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
