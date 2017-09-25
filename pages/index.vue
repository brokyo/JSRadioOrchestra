<template>
<div class="container">    
  <div class="video-background">
    <div class="video-foreground">
      <iframe :src="activeBackgroundURL" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>

    <!-- <h3>Music For: {{activeBackground.title}}</h3> -->
    <!-- <button @click="hideControls = !hideControls">Toggle Controls</button> -->
    <div class="configContainer" v-if="!hideControls">
      <section class="">
        <div>
          <select v-model="activeSynth" class="mb-4">
            <option value="" disabled selected hidden>Select Synth</option>
            <option v-for="synth in possibleSynths">{{synth}}</option>
          </select>
        </div>
        <div>
          <monosynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'MonoSynth'" xs12></monosynth>
          <amsynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'AMSynth'" xs12></amsynth>
          <fmsynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'FMSynth'" xs12></fmsynth>
          <duosynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'DuoSynth'" xs12></duosynth>
          <plucksynth :options="allOptions" @updateSynth="updateSynth" v-if="activeSynth === 'PluckSynth'" xs12></plucksynth>
        </div>
      </section>
      <div v-if="activeSynth" class="synthConfig">
        <h6>Scale</h6>
        <select v-model="activeScale">
          <option v-for="scale in scales" :value="scale">{{scale.name}}</option>
        </select>
        <synthtrigger v-for="pitch in activeScale.config" :config="pitch" :synth="ToneElements.synth"></synthtrigger>  
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

if (process.browser) {
    var Tone = require('tone')
    window.Tone = Tone
}

export default {
  components: {
    monosynth, amsynth, fmsynth, duosynth, synthtrigger
  },
  data () {
    return {
      ToneElements: {
        synth: {},
      },
      activeSynth: '',
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
      this.ToneElements.synth = new Tone.PolySynth(8, Tone[activeSynth]).toMaster()
    }
  },
  methods: {
    updateSynth: function (newValues) {
      this.ToneElements.synth.set(newValues)
    }
  },
  mounted: function () {
    this.activeBackground = this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)];  
  }
}
</script>

<style>
.container {
  display: flex;
  width: 100%;
}

.configContainer {
  width: 100%;
}

h2 {
  color: white;
  text-shadow: 1px 1px 2px black; 
  text-align: center;
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
