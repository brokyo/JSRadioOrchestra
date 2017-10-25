<template>
<main>
    <section>
	    <select v-model="toneConfig.synth" @change="newSynth">
          <option value="" disabled selected hidden>Select Synth</option>
          <option v-for="synth in possibleSynths">{{synth}}</option>
	    </select>

      <synth v-if="toneConfig.synth === 'Synth'" :config="toneConfig.synthMemberValues" @updated="updateSynth"></synth>
      <monosynth v-if="toneConfig.synth === 'MonoSynth'" :config="toneConfig.synthMemberValues" @updated="updateSynth"></monosynth>
      <amsynth v-if="toneConfig.synth === 'AMSynth'"  :config="toneConfig.synthMemberValues" @updated="updateSynth"></amsynth>
      <fmsynth v-if="toneConfig.synth === 'FMSynth'" :config="toneConfig.synthMemberValues" @updated="updateSynth"></fmsynth>
      <duosynth v-if="toneConfig.synth === 'DuoSynth'" :config="toneConfig.synthMemberValues" @updated="updateSynth"></duosynth>
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
      <tonefilter :active="toneConfig.filter" :config="toneConfig.filterMemberValues" @toggle="toggleFilter" @update="updateFilter" v-if="toneConfig.synth"></tonefilter>
    </section>

    <!-- Synth Triggers -->
    <section class="configSection">
      <triggers :synth="tone.synth"></triggers>
    </section>

</main>
</template>

<script>
import toneUtilityData from '../../mixins/toneUtility.js'
import synth from '../synths/synth.vue'
import monosynth from '../synths/monosynth.vue'
import amsynth from '../synths/amsynth.vue'
import fmsynth from '../synths/fmsynth.vue'
import duosynth from '../synths/duosynth.vue'
import tonefilter from './tonefilter.vue'
import triggers from './triggers.vue'


// import autofilter from '../effects/autofilter.vue'
// import autopanner from '../effects/autopanner.vue'
// import chorus from '../effects/chorus.vue'
// import feedbackdelay from '../effects/feedbackdelay.vue'
// import pitchshift from '../effects/pitchshift.vue'
// import tremolo from '../effects/tremolo.vue'
// import vibrato from '../effects/vibrato.vue'

var _ = require('lodash')

if (process.browser) {
    var Tone = require('tone')
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
      toneConfig: {

      },
      tone: {
        synth: {},
        effects: [{}],
        filter: {}
      },
      possibleSynths: ['Synth', 'MonoSynth', 'AMSynth', 'FMSynth', 'DuoSynth']
    }
  },
  methods: {
    newSynth: function (event) {
      this.tone.synth.disconnect(this.tone.filter)
      this.tone.synth = new Tone.PolySynth(8, Tone[this.toneConfig.synth])
      this.toneConfig.synthMemberValues = toneUtilityData.synthDefaults[this.toneConfig.synth]
      this.tone.synth.set(this.toneConfig.synthMemberValues)
      this.tone.synth.connect(this.tone.filter)

      this.tone.synth.triggerAttackRelease(110, 1)

    },
    updateSynth: function (newValues) {
      this.toneConfig.synthMemberValues = newValues
      this.tone.synth.set(newValues)
    },
    toggleFilter: function (state) {
      this.toneConfig.filter = !this.toneConfig.filter

      this.tone.synth.disconnect(this.tone.filter)
      this.tone.filter = {}

      if (this.toneConfig.filter === true) {
        this.tone.filter = new Tone.Filter(this.toneConfig.filterMemberValues)
      } else {
        this.tone.filter = new Tone.Gain()
      }

      this.tone.synth.connect(this.tone.filter)
      this.tone.filter.connect(Tone.Master)
    },
    updateFilter: function (newValue) {
      _.merge(this.toneConfig.filterMemberValues, newValue)
      this.tone.filter.set(this.toneConfig.filterMemberValues)
    }
  },
  computed: {
    activeScale () { return _.cloneDeep(this.$store.state.scale) }
  },
  mounted: function () {
    this.toneConfig = _.cloneDeep(this.$store.state.tone)
    Tone.context.close()
    Tone.context = new AudioContext()

    this.tone.synth = new Tone.PolySynth(8, Tone[this.toneConfig.synth])
    this.tone.synth.set(this.toneConfig.synthMemberValues)

    if (this.toneConfig.filter) {
      this.tone.filter = new Tone.Filter(this.toneConfig.filterMemberValues)
    } else {
      this.tone.filter = new Tone.Gain()
    }

    this.tone.synth.connect(this.tone.filter)
    this.tone.filter.connect(Tone.Master)

  },
  beforeDestroy: function () {
    this.$store.commit('SET_PATCH_CONFIG', _.cloneDeep(this.toneConfig))
  }
}
</script>

<style lang="css" scoped>
</style>
