<template>
<div class="container">
  <h1>The JS Radio Orchestra Plays:</h1>
  <nav>
    <button @click="activeView = 'home'">Home</button>
    <button>Video</button>
    <button @click="activeView = 'synth'">Synth</button>
    <button>Overlay</button>
    <button>Mutations</button>
    <button>Demo</button>
    <button>Publish</button>
  </nav>

  <home v-if="activeView === 'home'"></home>
  <synth-config v-if="activeView === 'synth'" :synth="$store.state.tone.synth" :config="$store.state.tone.synthMemberValues"></synth-config>




</div>
</template>

<script>
import { mapGetters } from 'vuex'
import synthConfig from '../components/config/synth.vue'
import colorfilterconfig from '../components/colorfilterconfig.vue'
import colorfilterfinal from '../components/colorfilterFinal.vue'
import home from '../components/composeHome.vue'

import axios from '../plugins/axios.js'

if (process.browser) {
    var Tone = require('tone')
}

export default {
  components: {
    colorfilterconfig, colorfilterfinal, home, synthConfig
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
      'constructed_synth'
    ])
  },
  watch: {
    // constructed_synth: function () {
    //   this.constructed_synth.toMaster()
    // },
    activeSynth: function () {
      let activeSynth = this.activeSynth
      console.log('New Synth:', this.activeSynth)

      // Disconnect old synth if it exists (would dispose be better for performance? What does dispose do?)
      if (Object.keys(this.ToneElements.synth).length !== 0) {
        this.ToneElements.synth.disconnect(this.ToneElements.synthOut)
      }

      // Create new synth
      this.ToneElements.synth = new Tone.PolySynth(8, Tone[activeSynth])
      this.ToneElements.synth.connect(this.ToneElements.synthOut)

      // If there's a filter connect to that - if not connect it to the patch
      if (Object.keys(this.ToneElements.filter).length !== 0 && this.filterActive) {
        console.log('connect to filter')
        this.ToneElements.synthOut.connect(this.ToneElements.filter)
      } else {
        console.log('connect to patch')
        this.ToneElements.synthOut.connect(this.ToneElements.patch)
      }
    },
    filterActive: function () {
      if (this.filterActive) {
        if (this.ToneElements.effects.length > 0) {

       }
        this.ToneElements.synthOut.disconnect(this.ToneElements.patch)
        this.ToneElements.filter = new Tone.Filter()
        this.ToneElements.filter.connect(this.ToneElements.patch)
        this.ToneElements.synthOut.connect(this.ToneElements.filter)
      } else {
        this.ToneElements.filter.disconnect(this.ToneElements.patch)
        this.ToneElements.synthOut.disconnect(this.ToneElements.filter)
        this.ToneElements.synthOut.connect(this.ToneElements.patch)
      }
    },
    octave1: function (newOctave) {
      this.activeScale.triggers.octave1 = Number(newOctave)
      this.activeScale.config.forEach(function (pitch) {
        if (pitch.id <= 4) {
          pitch.octave = Number(newOctave)
        }
      })
    },
    octave2: function (newOctave) {
      this.activeScale.triggers.octave2 = Number(newOctave)
      this.activeScale.config.forEach(function (pitch) {
        if (pitch.id > 4) {
          pitch.octave = Number(newOctave)
        }
      })
    },
    scaleKey: function (newKey) {
      this.activeScale.triggers.key = newKey
      let newOrigin = this.scaleConfig.possibleNotes.indexOf(newKey)
      let newScale = this.reorder(this.scaleConfig.possibleNotes, newOrigin)
      let vue = this

      this.activeScale.config.forEach(function (pitch) {
        if (pitch.id === 0 || pitch.id === 5) {
          pitch.note = newScale[vue.activeScale.steps[0]]
        }

        if (pitch.id === 1 || pitch.id === 6) {
          pitch.note = newScale[vue.activeScale.steps[1]]
        }

        if (pitch.id === 2 || pitch.id === 7) {
          pitch.note = newScale[vue.activeScale.steps[2]]
        }

        if (pitch.id === 3 || pitch.id === 8) {
          pitch.note = newScale[vue.activeScale.steps[3]]
        }

        if (pitch.id === 4 || pitch.id === 9) {
          pitch.note = newScale[vue.activeScale.steps[4]]
        }
      })
    },
    activeScale: function (newScale) {
      this.scaleKey = newScale.triggers.key
      this.octave1 = newScale.triggers.octave1
      this.octave2 = newScale.triggers.octave2
    }
  },
  methods: {
    reorder: function (data, index) {
      return data.slice(index).concat(data.slice(0, index))
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
    console.log(this.constructed_synth)
    this.constructed_synth.toMaster()
    // this.activeBackground = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)]
    // this.ToneElements.synthOut = new Tone.Gain()
    // this.ToneElements.patch = new Tone.Gain()
    // this.ToneElements.patch.connect(Tone.Master)
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

  .video-background {
    background: #000;
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -99;
  }

  .video-foreground,
  .video-background iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  @media (min-aspect-ratio: 16/9) {
    .video-foreground { height: 300%; top: -100%; }
  }
  @media (max-aspect-ratio: 16/9) {
    .video-foreground { width: 300%; left: -100%; }
  }

</style>
