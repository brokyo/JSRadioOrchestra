<template>
<div class="container">
  <div class="video-background">
    <div class="video-foreground">
      <iframe :src="activeBackgroundURL" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>

    <!-- <h3>Music For: {{activeBackground.title}}</h3> -->
    <!-- <button @click="hideControls = !hideControls">Toggle Controls</button> -->
    <main v-if="!hideControls">
      <!-- Synth Config -->
      <section class="configSection">
        <div>
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
        <synthtrigger v-for="pitch in activeScale.config" :config="pitch" :synth="ToneElements.synth"></synthtrigger>
      </section>

      <!-- Filter -->
      <section class="configSection">
        <h3>Filter</h3>
        <input type="checkbox" v-model="filterActive"></input>
        <tonefilter :options="allOptions" @updateFilter="updateFilter" v-if="filterActive"></tonefilter>
      </section>
    </main>
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
      scales: [
        {
          name: 'Bright (Yo Scale)',
          config: [
            { id: 0, keyCode: 'a', note: 'D', octave: 4 },
            { id: 1, keyCode: 's', note: 'E', octave: 4 },
            { id: 2, keyCode: 'd', note: 'G', octave: 4 },
            { id: 3, keyCode: 'f', note: 'A', octave: 4 },
            { id: 4, keyCode: 'g', note: 'B', octave: 4 }
          ]
        },
        {
          name: 'Dark (In Scale)',
          config: [
            { id: 0, keyCode: 'a', note: 'D', octave: 3 },
            { id: 1, keyCode: 's', note: 'D#', octave: 3 },
            { id: 2, keyCode: 'd', note: 'G', octave: 3 },
            { id: 3, keyCode: 'f', note: 'A', octave: 3 },
            { id: 4, keyCode: 'g', note: 'A#', octave: 3 }
          ]
        }
      ],
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
    }
  },
  methods: {
    updateSynth: function (newValues) {
      this.ToneElements.synth.set(newValues)
    },
    updateFilter: function (newValues) {
      console.log(newValues)
      this.ToneElements.filter.set(newValues)
    }
  },
  mounted: function () {
    this.activeBackground = this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)];
    this.ToneElements.patch = new Tone.Gain()
    this.ToneElements.patch.connect(Tone.Master)
  }
}
</script>

<style>
.container {
  display: flex;
}

.configSection {
  display: flex;

  h3 {
    background: white;
    font-size: 46px;
  }
}

/* Background Video*/
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
