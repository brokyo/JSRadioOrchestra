<template>
<main>
    <!-- Synth Config -->
    <section>
	    <select @change="setSynth($event)">
          <option value="" disabled selected hidden>Select Synth</option>
          <option v-for="synth in possibleSynths">{{synth}}</option>
	    </select>

        <synth :options="allOptions" @updateSynth="updateSynth" v-if="$store.state.tone.synth === 'Synth'"></synth>
        <monosynth :options="allOptions" @updateSynth="updateSynth" v-if="$store.state.tone.synth === 'MonoSynth'"></monosynth>
        <amsynth :options="allOptions" @updateSynth="updateSynth" v-if="$store.state.tone.synth === 'AMSynth'"></amsynth>
        <fmsynth :options="allOptions" @updateSynth="updateSynth" v-if="$store.state.tone.synth === 'FMSynth'"></fmsynth>
        <duosynth :options="allOptions" @updateSynth="updateSynth" v-if="$store.state.tone.synth === 'DuoSynth'"></duosynth>
    </section>

    <!-- Effects -->
<!--     <section class="configSection">
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
 -->

    <!-- Filter -->
    <section class="configSection">
      <tonefilter :options="allOptions"></tonefilter>
    </section>


    <!-- Synth Triggers -->
<!--     <section class="configSection" v-if="activeSynth">
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
 -->
</main>
</template>

<script>
import { mapGetters } from 'vuex'
import synth from '../synths/synth.vue'
import monosynth from '../synths/monosynth.vue'
import amsynth from '../synths/amsynth.vue'
import fmsynth from '../synths/fmsynth.vue'
import duosynth from '../synths/duosynth.vue'
import synthtrigger from '../synthtrigger.vue'
import tonefilter from '../tonefilter.vue'
import autofilter from '../effects/autofilter.vue'
import autopanner from '../effects/autopanner.vue'
import chorus from '../effects/chorus.vue'
import feedbackdelay from '../effects/feedbackdelay.vue'
import pitchshift from '../effects/pitchshift.vue'
import tremolo from '../effects/tremolo.vue'
import vibrato from '../effects/vibrato.vue'

var _ = require('lodash')

if (process.browser) {
    var Tone = require('tone')
}

export default {
  name: 'synth-config',
  components: {
	synth, monosynth, amsynth, fmsynth, duosynth, synthtrigger, tonefilter, autofilter, autopanner, chorus, feedbackdelay, pitchshift, tremolo, vibrato
  },
  data () {
    return {
      activeSynth: '',
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
      possibleSynths: ['Synth', 'MonoSynth', 'AMSynth', 'FMSynth', 'DuoSynth']
    }
  },
  methods: {
  	// Synth
  	setSynth: function (synth) {
  		this.$store.dispatch('UPDATE_SYNTH', event.target.value)
  	},
	updateSynth: function (values) {
		this.$store.dispatch('UPDATE_SYNTH_MEMBER_VALUES', values)
    }
  },
  computed: {
  	...mapGetters([
  		'constructed_synth'
	])
  },
  mouted: function () {

  }
}
</script>

<style lang="css" scoped>
</style>