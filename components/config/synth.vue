<template>
<main>
    <!-- Synth Config -->
    <section>
	    <select @change="selectSynth($event)">
          <option value="" disabled selected hidden>Select Synth</option>
          <option v-for="synth in possibleSynths">{{synth}}</option>
	    </select>

      <synth :options="allOptions" :config="computedConfig" v-if="$store.state.tone.synth === 'Synth'"></synth>
      <monosynth :options="allOptions" :config="computedConfig" v-if="$store.state.tone.synth === 'MonoSynth'"></monosynth>
      <amsynth :options="allOptions" :config="computedConfig" v-if="$store.state.tone.synth === 'AMSynth'"></amsynth>
      <fmsynth :options="allOptions" :config="computedConfig" v-if="$store.state.tone.synth === 'FMSynth'"></fmsynth>
      <duosynth :options="allOptions" :config="computedConfig" v-if="$store.state.tone.synth === 'DuoSynth'"></duosynth>
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

    <!-- Filter Config -->
    <section class="configSection">
      <tonefilter :options="allOptions"></tonefilter>
    </section>

    <!-- Synth Triggers -->
    <section class="configSection">
      <triggers></triggers>
    </section>

</main>
</template>

<script>
import { mapGetters } from 'vuex'
import synthDefaults from '../../mixins/synthdefaults.js'
import synth from '../synths/synth.vue'
import monosynth from '../synths/monosynth.vue'
import amsynth from '../synths/amsynth.vue'
import fmsynth from '../synths/fmsynth.vue'
import duosynth from '../synths/duosynth.vue'
import tonefilter from '../tonefilter.vue'
import triggers from './triggers.vue'


// import autofilter from '../effects/autofilter.vue'
// import autopanner from '../effects/autopanner.vue'
// import chorus from '../effects/chorus.vue'
// import feedbackdelay from '../effects/feedbackdelay.vue'
// import pitchshift from '../effects/pitchshift.vue'
// import tremolo from '../effects/tremolo.vue'
// import vibrato from '../effects/vibrato.vue'

// console.log(synthDefaults.AMSynth)

// var _ = require('lodash')

if (process.browser) {
    // var Tone = require('tone')
}

export default {
  name: 'synth-config',
  props: ['synth', 'config'],
  components: {
	synth, monosynth, amsynth, fmsynth, duosynth, triggers, tonefilter
  //  autofilter, autopanner, chorus, feedbackdelay, pitchshift, tremolo, vibrato
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
  	selectSynth: function (synth) {
  		this.computedConfig = synthDefaults[event.target.value]
  		let payload = {
  			synth: event.target.value,
  			defaults: synthDefaults[event.target.value]
  		}
  		this.$store.commit('SET_SYNTH', payload)
  	}
  },
  computed: {
  	computedConfig: function () {
  		return this.$store.state.tone.synthMemberValues
  	}
  },
  mouted: function () {

  }
}
</script>

<style lang="css" scoped>
</style>
