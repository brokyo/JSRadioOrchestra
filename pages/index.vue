<template>
<div class="container">
  <h1>The JS Radio Orchestra Plays:</h1>
  <nav>
    <button @click="activeView = 'home'">Home</button>
    <button @click="activeView = 'video'">Video</button>
    <button @click="activeView = 'synth'">Synth</button>
    <button>Overlay</button>
    <button>Mutations</button>
    <button>Demo</button>
    <button>Publish</button>
  </nav>

  <home v-if="activeView === 'home'"></home>
  <video-config v-if="activeView === 'video'"></video-config>
  <synth-config v-if="activeView === 'synth'" :synth="$store.state.tone.synth" :config="$store.state.tone.synthMemberValues" @disconnect="disconnectSynth()" @connect="connectSynth()"></synth-config>




</div>
</template>

<script>
import { mapGetters } from 'vuex'
import synthConfig from '../components/config/synth.vue'
import colorfilterconfig from '../components/colorfilterconfig.vue'
import colorfilterfinal from '../components/colorfilterFinal.vue'
import home from '../components/composeHome.vue'
import videoConfig from '../components/config/videoconfig.vue'

import axios from '../plugins/axios.js'

if (process.browser) {
    var Tone = require('tone')
}

export default {
  components: {
    colorfilterconfig, colorfilterfinal, home, synthConfig, videoConfig
  },
  data () {
    return {
      activeView: 'home',
      savedValues: {
        synth: {
          name: '',
          config: {
            envelope: {
              attack: 1,
              release: 3
            }
          }
        }
      },
      activeEffects: [],
      allEffects: ['AutoFilter', 'AutoPanner', 'Chorus', 'FeedbackDelay', 'PitchShift', 'Tremolo', 'Vibrato'],
      activeBackground: {},
      backgrounds: [
        {title: 'The Lit And Unlit Places Alike', videoId: 'W0LHTWG-UmQ'},
        {title: 'Continuing To Fight Losing Battles', videoId: 'OjPgeXHjM9k'},
        {title: 'The Places Inbetween', videoId: 'o34e0406WL8'},
        {title: 'That\'s The Only Way It\'s Ever Been', videoId: 'VWq3ZoDP2ho'}
      ]
    }
  },
  computed: {
    activeBackgroundURL: function () {
      return 'https://www.youtube.com/embed/' + this.activeBackground.videoId + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&vq=small&playlist=' + this.activeBackground.videoId
    },
    timeToTransition: function () {
      return {
          transition: 'opacity ' + String(0.5) + 's ease'
      }
    },
    ...mapGetters([
      'constructed_synth', 'constructed_filter'
    ])
  },
  watch: {
    // constructed_synth: function () {
      // console.log('SUP WITH YOU')
      // this.constructed_synth.connect(this.constructed_filter)
      // this.constructed_synth.toMaster()
    // },
    // activeSynth: function () {
    //   let activeSynth = this.activeSynth
    //   console.log('New Synth:', this.activeSynth)

    //   // Disconnect old synth if it exists (would dispose be better for performance? What does dispose do?)
    //   if (Object.keys(this.ToneElements.synth).length !== 0) {
    //     this.ToneElements.synth.disconnect(this.ToneElements.synthOut)
    //   }

    //   // Create new synth
    //   this.ToneElements.synth = new Tone.PolySynth(8, Tone[activeSynth])
    //   this.ToneElements.synth.connect(this.ToneElements.synthOut)

    //   // If there's a filter connect to that - if not connect it to the patch
    //   if (Object.keys(this.ToneElements.filter).length !== 0 && this.filterActive) {
    //     console.log('connect to filter')
    //     this.ToneElements.synthOut.connect(this.ToneElements.filter)
    //   } else {
    //     console.log('connect to patch')
    //     this.ToneElements.synthOut.connect(this.ToneElements.patch)
    //   }
    // },
    // filterActive: function () {
    //   if (this.filterActive) {
    //     if (this.ToneElements.effects.length > 0) {

    //    }
    //     this.ToneElements.synthOut.disconnect(this.ToneElements.patch)
    //     this.ToneElements.filter = new Tone.Filter()
    //     this.ToneElements.filter.connect(this.ToneElements.patch)
    //     this.ToneElements.synthOut.connect(this.ToneElements.filter)
    //   } else {
    //     this.ToneElements.filter.disconnect(this.ToneElements.patch)
    //     this.ToneElements.synthOut.disconnect(this.ToneElements.filter)
    //     this.ToneElements.synthOut.connect(this.ToneElements.patch)
    //   }
    // },
  },
  methods: {
    disconnectSynth: function () {
      this.constructed_synth.disconnect(this.constructed_filter)
    },
    connectSynth: function () {
      this.constructed_synth.connect(this.constructed_filter)
    },
    activateEffects: function () {
      let vue = this
      // Disconnect synth
      let finalNode

      // Find last node
      if (this.ToneElements.effects.length > 0) {
        finalNode = this.ToneElements.effects[this.ToneElements.effects.length - 1]
      } else if (this.filterActive) {
        finalNode = this.ToneElements.filter
      } else {
        finalNode = this.ToneElements.patch
      }

      // Disconnect from it
      this.ToneElements.synthOut.disconnect(finalNode)

      //Clear current effect chain
      this.ToneElements.effects = []

      // create effect nodes
      this.activeEffects.forEach(function (effect) {
        let newEffect = new Tone[effect]()
        vue.ToneElements.effects.push(newEffect)
      })

      this.ToneElements.effects.forEach(function (effect, index) {
        if (index === 0 && vue.ToneElements.effects.length === 1) {
          console.log('connect it!')
          vue.ToneElements.synthOut.chain(effect, finalNode)
        } else if (index < vue.ToneElements.effects.length - 1) {
          vue.ToneElements.synthOut.connect(effect)
        } else if (index === vue.ToneElements.effects.length - 1) {
          vue.ToneElements.synthOut.chain(effect, finalNode)
        }
      })
    },
    updateEffect: function (newValues) {
      // this.ToneElements.effects
      console.log(newValues)
    },
    save: function () {
      axios.post('musicboxes.json', {foo: 'true'})
        .then(res => {
          alert('saved!')
        })
        .catch(e => {
          alert('error', e)
        })
    }
  },
  mounted: function () {
    this.constructed_synth.connect(this.constructed_filter)
    this.constructed_filter.connect(Tone.Master)
  }
}
</script>

<style lang="scss">
  .configSection {
    h3 {
      background: white;
      font-size: 46px;
    }
  }

  .triggerContainer {
    display: flex;
  }

</style>
