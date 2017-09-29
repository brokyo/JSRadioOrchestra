<template>
<div class="container">
  <div class="video-background">
    <div class="video-foreground">
      <iframe :src="activeBackgroundURL" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>

  <h3>Music For: {{activeBackground.title}}</h3>
  <button @click="hideControls = !hideControls">Toggle Controls</button>
  <main v-show="!hideControls">
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
        <monosynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'MonoSynth'"></monosynth>
        <amsynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'AMSynth'"></amsynth>
        <fmsynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'FMSynth'"></fmsynth>
        <duosynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'DuoSynth'"></duosynth>
        <plucksynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'PluckSynth'"></plucksynth>
      </div>
    </section>

    <!-- Synth Triggers -->
    <section class="configSection" v-if="activeSynth">
      <h3>Scale</h3>
      <select v-model="activeScale">
        <option v-for="scale in scales" :value="scale">{{scale.name}}</option>
      </select>
      <div v-if="activeScale">
        <select v-model="scaleKey">
          <option v-for="note in scaleConfig.possibleNotes">{{note}}</option>
        </select>
        <select v-model="octave1">
          <option v-for="octave in scaleConfig.possibleOctaves">{{octave}}</option>
        </select>
        <select v-model="octave2">
          <option v-for="octave in scaleConfig.possibleOctaves">{{octave}}</option>
        </select>
      </div>
      <div class="triggerContainer">
        <synthtrigger v-for="pitch in activeScale.config" :config="pitch" :synth="ToneElements.synth" @playing="triggerActive"></synthtrigger>
      </div>
    </section>

    <!-- Filter -->
    <section class="configSection">
      <h3>Filter</h3>
      <input type="checkbox" v-model="filterActive"></input>
      <tonefilter :options="allOptions" @updateFilter="updateFilter" v-if="filterActive"></tonefilter>
    </section>
  </main>
  <div class="filterContainer">
    <div class="width">
      <div class="bar color0" :class="{ active: currentlyPlaying[0] }"></div>
      <div class="bar color1" :class="{ active: currentlyPlaying[1] }"></div>
      <div class="bar color2" :class="{ active: currentlyPlaying[2] }"></div>
      <div class="bar color3" :class="{ active: currentlyPlaying[3] }"></div>
      <div class="bar color4" :class="{ active: currentlyPlaying[4] }"></div>
    </div>
    <div class="height">
      <div class="row color5" :class="{ active: currentlyPlaying[5] }"></div>
      <div class="row color6" :class="{ active: currentlyPlaying[6] }"></div>
      <div class="row color7" :class="{ active: currentlyPlaying[7] }"></div>
      <div class="row color8" :class="{ active: currentlyPlaying[8] }"></div>
      <div class="row color9" :class="{ active: currentlyPlaying[9] }"></div>
    </div>
  </div>
</div>
</template>

<script>
import monosynth from '../components/synths/monosynth.vue'
import amsynth from '../components/synths/amsynth.vue'
import fmsynth from '../components/synths/fmsynth.vue'
import duosynth from '../components/synths/duosynth.vue'
import synthtrigger from '../components/synthtrigger.vue'
import tonefilter from '../components/tonefilter.vue'

if (process.browser) {
    var Tone = require('tone')
    window.Tone = Tone
}

export default {
  components: {
    monosynth, amsynth, fmsynth, duosynth, synthtrigger, tonefilter
  },
  data () {
    return {
      ToneElements: {
        patch: {},
        synth: {},
        filter: {}
      },
      activeSynth: '',
      filterActive: false,
      activeScale: [],
      activeBackground: {},
      hideControls: false,
      possibleSynths: ['MonoSynth', 'AMSynth', 'FMSynth', 'DuoSynth'],
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
        possibleOctaves: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
            { id: 8, keyCode: 'l', note: 'A', octave: 5},
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
        {title: 'The Places Inbetween', videoId: 'o34e0406WL8'}
      ]
    }
  },
  computed: {
    activeBackgroundURL: function () {
      return 'https://www.youtube.com/embed/' + this.activeBackground.videoId + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&vq=small&playlist='+ this.activeBackground.videoId
    }
  },
  watch: {
    activeSynth: function () {
      let activeSynth = this.activeSynth
      console.log('New Synth:', this.activeSynth)

      // Disconnect old synth if it exists (would dispose be better for performance? What does dispose do?)
      if (Object.keys(this.ToneElements.synth).length !== 0) {
        if (Object.keys(this.ToneElements.filter).length !==0 && this.filterActive) {
          console.log('disconnect from filter')
          this.ToneElements.synth.disconnect(this.ToneElements.filter)
          console.log('disconnected from filter')
        } else {
          console.log('disconnect from patch')
          this.ToneElements.synth.disconnect(this.ToneElements.patch)
          console.log('disconnected from patch')
        }
      }

      // Create new synth
      this.ToneElements.synth = new Tone.PolySynth(8, Tone[activeSynth])

      // If there's a filter connect to that - if not connect it to the patch
      if (Object.keys(this.ToneElements.filter).length !== 0 && this.filterActive) {
        console.log('connect to filter')
        this.ToneElements.synth.connect(this.ToneElements.filter)
        console.log('connected to filter')
      } else {
        console.log('connect to patch')
        this.ToneElements.synth.connect(this.ToneElements.patch)
        console.log('connectd to patch')
      }
    },
    filterActive: function () {
      if (this.filterActive) {
        this.ToneElements.synth.disconnect(this.ToneElements.patch)
        this.ToneElements.filter = new Tone.Filter()
        this.ToneElements.filter.connect(this.ToneElements.patch)
        this.ToneElements.synth.connect(this.ToneElements.filter)
      } else {
        this.ToneElements.filter.disconnect(this.ToneElements.patch)
        this.ToneElements.synth.disconnect(this.ToneElements.filter)
        this.ToneElements.synth.connect(this.ToneElements.patch)
      }
    },
    octave1: function(newOctave){
      this.activeScale.triggers.octave1 = Number(newOctave)
      this.activeScale.config.forEach(function(pitch){
        if(pitch.id <= 4){
          pitch.octave = Number(newOctave)
        }
      })
    },
    octave2: function(newOctave){
      this.activeScale.triggers.octave2 = Number(newOctave)
      this.activeScale.config.forEach(function(pitch){
        if(pitch.id > 4){
          pitch.octave = Number(newOctave)
        }
      })
    },
    scaleKey: function(newKey){
      this.activeScale.triggers.key = newKey
      let newOrigin = this.scaleConfig.possibleNotes.indexOf(newKey)
      let newScale = this.reorder(this.scaleConfig.possibleNotes, newOrigin)
      let vue = this

      this.activeScale.config.forEach(function(pitch){
        if(pitch.id === 0 || pitch.id === 5){
          pitch.note = newScale[vue.activeScale.steps[0]]
        }

        if(pitch.id === 1 || pitch.id === 6){
          pitch.note = newScale[vue.activeScale.steps[1]]
        }

        if(pitch.id === 2 || pitch.id === 7){
          pitch.note = newScale[vue.activeScale.steps[2]]
        }

        if(pitch.id === 3 || pitch.id === 8){
          pitch.note = newScale[vue.activeScale.steps[3]]
        }

        if(pitch.id === 4 || pitch.id === 9){
          pitch.note = newScale[vue.activeScale.steps[4]]
        }
      })
    }

  },
  methods: {
    updateSynth: function (newValues) {
      this.ToneElements.synth.set(newValues)
    },
    updateFilter: function (newValues) {
      console.log(newValues)
      this.ToneElements.filter.set(newValues)
    },
    triggerActive: function (active) {
      this.currentlyPlaying[active.id] = active.active
    },
    reorder: function(data, index){
      return data.slice(index).concat(data.slice(0, index))
    }
  },
  mounted: function () {
    this.activeBackground = this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)];
    this.ToneElements.patch = new Tone.Gain()
    this.ToneElements.patch.connect(Tone.Master)
    this.activeSynth = 'MonoSynthsfo'
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
      opacity: 0;
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

  .active {
    opacity: 0.5 !important;
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
