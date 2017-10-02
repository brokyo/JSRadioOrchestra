<template>
<div class="container">
  <div class="video-background">
    <div class="video-foreground">
      <iframe :src="activeBackgroundURL" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>

  <h3>Music For: {{activeBackground.title}}</h3>
  <select v-model="activeView">
    <option value="controls">Controls</option>
    <option value="colors">Colors</option>
    <option value="none">Background</option>
  </select>
  <!-- <button @click="hideControls = !hideControls">Toggle Controls</button> -->
  <main v-show="activeView === 'controls'">
    <!-- Synth Config -->
    <section class="configSection">
      <div class="selector">
        <h3>Synth</h3>
        <select v-model="activeSynth">
          <option value="" disabled selected hidden>Select Synth</option>
          <option v-for="synth in possibleSynths">{{synth}}</option>
        </select>
      </div>
      <div>
<!--         <monosynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'MonoSynth'"></monosynth> -->
        <synth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'Synth'"></synth>
        <amsynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'AMSynth'"></amsynth>
        <fmsynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'FMSynth'"></fmsynth>
        <duosynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'DuoSynth'"></duosynth>
      </div>
    </section>

    <!-- Synth Triggers -->
    <section class="configSection" v-if="activeSynth">
      <h3>Scale</h3>
      <select v-model="activeScale">
        <option v-for="scale in scales" :value="scale">{{scale.name}}</option>
      </select>
      <div v-if="activeScale">
        <label>Key:</label>
        <select v-model="scaleKey">
          <option v-for="note in scaleConfig.possibleNotes">{{note}}</option>
        </select>
        <label>Octave 1</label>
        <select v-model="octave1">
          <option v-for="octave in scaleConfig.possibleOctaves">{{octave}}</option>
        </select>
        <label>Octave 2</label>
        <select v-model="octave2">
          <option v-for="octave in scaleConfig.possibleOctaves">{{octave}}</option>
        </select>
      </div>
      <div class="triggerContainer">
        <synthtrigger v-for="pitch in activeScale.config" :config="pitch" :synth="ToneElements.synth" @playing="triggerActive"></synthtrigger>
      </div>
    </section>

    <!-- Effects -->
    <section class="configSection">
      <h3>Effects</h3>
      <span v-for="effect in allEffects">
        <label>{{effect}}</label>
        <input type="checkbox" :value="effect" v-model="activeEffects"></input>
      </span>
      <button @click="activateEffects">Activate Effects</button>
      <autofilter v-if="activeEffects.AutoFilter"></autofilter>
      <autopanner v-if="activeEffects.AutoPanner"></autopanner>
      <chorus v-if="activeEffects.Chorus"></chorus>
      <feedbackdelay v-if="activeEffects.indexOf('FeedbackDelay') > -1" @updateEffect="updateEffect"></feedbackdelay>
      <pitchshift v-if="activeEffects.PitchShift"></pitchshift>
      <tremolo v-if="activeEffects.Tremolo"></tremolo>
      <vibrato v-if="activeEffects.Vibrato"></vibrato>
    </section>

    <!-- Filter -->
    <section class="configSection">
      <h3>Filter</h3>
      <input type="checkbox" v-model="filterActive"></input>
      <tonefilter :options="allOptions" @updateFilter="updateFilter" v-if="filterActive"></tonefilter>
    </section>
  </main>

  <div v-show="activeView === 'colors'">
    <colorfilterconfig :active="currentlyPlaying" :transitions="savedValues.synth.config.envelope"></colorfilterconfig>

  </div>
</div>
</template>

<script>
import synth from '../components/synths/synth.vue'
import monosynth from '../components/synths/monosynth.vue'
import amsynth from '../components/synths/amsynth.vue'
import fmsynth from '../components/synths/fmsynth.vue'
import duosynth from '../components/synths/duosynth.vue'
import synthtrigger from '../components/synthtrigger.vue'
import tonefilter from '../components/tonefilter.vue'
import autofilter from '../components/effects/autofilter.vue'
import autopanner from '../components/effects/autopanner.vue'
import chorus from '../components/effects/chorus.vue'
import feedbackdelay from '../components/effects/feedbackdelay.vue'
import pitchshift from '../components/effects/pitchshift.vue'
import tremolo from '../components/effects/tremolo.vue'
import vibrato from '../components/effects/vibrato.vue'
import colorfilterconfig from '../components/colorfilterconfig.vue'


if (process.browser) {
    var Tone = require('tone')
    window.Tone = Tone
}

export default {
  components: {
    synth, monosynth, amsynth, fmsynth, duosynth, synthtrigger, tonefilter, autofilter, autopanner, chorus, feedbackdelay, pitchshift, tremolo, vibrato, colorfilterconfig
  },
  data () {
    return {
      ToneElements: {
        patch: {},
        synthOut: {},
        synth: {},
        filter: {},
        effects: []
      },
      savedValues: {
        synth: {
          name: '',
          config: {
            envelope: {
              attack: 1,
              release: 3
            }
          }
        },
        filter: {
          config: {}
        }
      },
      activeView: 'controls',
      activeEffects: [],
      allEffects: ['AutoFilter', 'AutoPanner', 'Chorus', 'FeedbackDelay', 'PitchShift', 'Tremolo', 'Vibrato'],
      activeSynth: '',
      filterActive: false,
      activeScale: [],
      activeBackground: {},
      hideControls: false,
      possibleSynths: ['Synth', 'AMSynth', 'FMSynth', 'DuoSynth'],
      allOptions: {
        oscillators: {
          standard: ['sine', 'square', 'triangle', 'sawtooth']
        },
        envelopeCurves: ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
        filter: {
          allTypes: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
          rollOffValues: [-12, -24, -48, -96]
        }
      },
      scaleConfig: {
        possibleNotes: ['A', 'A#', 'B', 'B#', 'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'F#', 'G', 'G#'],
        possibleOctaves: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      },
      octave1: '',
      octave2: '',
      scaleKey: '',
      scales: [
        {
          name: 'Bright (Yo Scale)',
          config: [
            { id: 0, keyCode: 'q', note: 'D', octave: 4 },
            { id: 1, keyCode: 'w', note: 'E', octave: 4 },
            { id: 2, keyCode: 'e', note: 'G', octave: 4 },
            { id: 3, keyCode: 'r', note: 'A', octave: 4 },
            { id: 4, keyCode: 't', note: 'B', octave: 4 },
            { id: 5, keyCode: 'h', note: 'D', octave: 5 },
            { id: 6, keyCode: 'j', note: 'E', octave: 5 },
            { id: 7, keyCode: 'k', note: 'G', octave: 5 },
            { id: 8, keyCode: 'l', note: 'A', octave: 5 },
            { id: 9, keyCode: ';', note: 'B', octave: 5 }
          ],
          triggers: {
            key: 'D',
            octave1: 4,
            octave2: 5
          },
          steps: [0, 2, 6, 8, 10]
        },
        {
          name: 'Dark (In Scale)',
          config: [
            { id: 0, keyCode: 'q', note: 'D', octave: 3 },
            { id: 1, keyCode: 'w', note: 'D#', octave: 3 },
            { id: 2, keyCode: 'e', note: 'G', octave: 3 },
            { id: 3, keyCode: 'r', note: 'A', octave: 3 },
            { id: 4, keyCode: 't', note: 'A#', octave: 3 },
            { id: 5, keyCode: 'h', note: 'D', octave: 4 },
            { id: 6, keyCode: 'j', note: 'D#', octave: 4 },
            { id: 7, keyCode: 'k', note: 'G', octave: 4 },
            { id: 8, keyCode: 'l', note: 'A', octave: 4 },
            { id: 9, keyCode: ';', note: 'A#', octave: 4 }
          ],
          triggers: {
            key: 'D',
            octave1: 3,
            octave2: 4
          },
          steps: [0, 1, 6, 8, 9]
        }
      ],
      currentlyPlaying: {
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
    }
  },
  watch: {
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
    updateSynth: function (newValues) {
      this.savedValues.synth.config = newValues
      this.ToneElements.synth.set(newValues)
    },
    updateFilter: function (newValues) {
      this.savedValues.filter.config = newValues
      this.ToneElements.filter.set(newValues)
    },
    triggerActive: function (active) {
      this.currentlyPlaying[active.id] = active.active
    },
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
    }
  },
  mounted: function () {
    this.activeBackground = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)]
    this.ToneElements.synthOut = new Tone.Gain()
    this.ToneElements.patch = new Tone.Gain()
    this.ToneElements.patch.connect(Tone.Master)
  }
}
</script>

<style lang="scss">
  .container {

  }

  .configSection {
    h3 {
      background: white;
      font-size: 46px;
    }
  }

  .triggerContainer {
    display: flex;
  }

  .activeClass {
    opacity: 0.5 !important;
  }

  .filterContainer {
    z-index: -1;

    .width {
      display: flex;
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;

      z-index: -1;
      .bar {
        flex-grow: 1;
        opacity: 0;
      }
    }

    .height {
      display: flex;
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      flex-direction: column;
      z-index: -1;

      .row {
        flex-grow: 1;
      }

    }

    .color0 {
      background-color: #DD5777;
    }

    .color1 {
      background-color: #3409DD;
    }

    .color2 {
      background-color: #3ADD7B;
    }

    .color3 {
      background-color: #0F8979;
    }

    .color4{
      background-color: #D6A57F;
    }

    .color5 {
      background-color: #EDE704;
    }

    .color6 {
      background-color: #74EDDF;
    }

    .color7 {
      background-color: #DB360B
    }

    .color8 {
      background-color: #7491ED;
    }

    .color9 {
      background-color: #7FC2D6
    }
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
