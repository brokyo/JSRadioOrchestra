<template>
<section class="synthConfig">
	<div class="category">
		<div class="title">
			<h4>Synth</h4>
		</div>
		<div class="controls">
			<label>Oscillator</label>
			<select v-model="config.oscillator.type">
				<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
			</select>
			<label>Volume</label>
			<input type="range" min="-50" max="-10" v-model="config.volume"></input>
			<input type="number" v-model="config.volume"></input>
			<label>Detune</label>
			<input type="range" min="-200" max="200" v-model="config.detune">
			<input type="number" v-model="config.detune"></input>
			<label>Portamento</label>
			<input type="range" min="0" max="5" v-model="config.portamento"></input>
			<input type="number" v-model="config.portamento"></input>
		</div>
	</div>
	<div class="category">
		<div class="title">
			<h4>Filter</h4>
		</div>
		<div class="controls">
			<label>Q</label>
			<input type="range" min="0" max="100" v-model="config.filter.Q"></input>
			<input type="number" v-model="config.filter.Q"></input>
			<label>Type</label>
			<select v-model="config.filter.type">
				<option v-for="filterType in options.filter.allTypes">{{filterType}}</option>
			</select>
			<label>Rolloff</label>
			<select v-model="config.filter.rolloff">
				<option v-for="rolloff in options.filter.rollOffValues">{{rolloff}}</option>
			</select>
		</div>
	</div>
	<div class="category">
		<div class="title">
			<h4>Envelope</h4>
		</div>
		<div class="controls">
			<label>Attack</label>
			<input type="range" min="0" max="5" v-model="config.envelope.attack"></input>
			<input type="number" v-model="config.envelope.attack"></input>
			<label>Attack Curve</label>
			<select v-model="config.envelope.attackCurve">
				<option v-for="curve in options.envelopeCurves">{{curve}}</option>
			</select>
			<label>Decay</label>
			<input type="range" min="0" max="5" v-model="config.envelope.decay"></input>
			<input type="number" v-model="config.envelope.decay"></input>
			<label>Sustain</label>
			<input type="range" min="0" max="1" v-model="config.envelope.sustain"></input>
			<input type="number" v-model="config.envelope.sustain"></input>
			<label>Release</label>
			<input type="range" min="0" max="5" v-model="config.envelope.release"></input>
			<input type="number" v-model="config.envelope.release"></input>
			<label>Release Curve</label>
			<select v-model="config.envelope.releaseCurve">
				<option v-for="curve in options.envelopeCurves">{{curve}}</option>
			</select>
		</div>
	</div>
	<div class="category">
		<div class="title">
			<h4>Filter Envelope</h4>
		</div>
		<div class="controls">
			<label>Attack</label>
			<input type="range" min="0" max="5" v-model="config.filterEnvelope.attack"></input>
			<input type="number" v-model="config.filterEnvelope.attack"></input>
			<label>Decay</label>
			<input type="range" min="0" max="5" v-model="config.filterEnvelope.decay"></input>
			<input type="number" v-model="config.filterEnvelope.decay"></input>
			<label>Sustain</label>
			<input type="range" min="0" max="1" v-model="config.filterEnvelope.sustain"></input>
			<input type="number" v-model="config.filterEnvelope.sustain"></input>
			<label>Release</label>
			<input type="range" min="0" max="5" v-model="config.filterEnvelope.release"></input>
			<input type="number" v-model="config.filterEnvelope.release"></input>
			<label>Base Frequency</label>
			<input type="range" min="0" max="5000" v-model="config.filterEnvelope.baseFrequency"></input>
			<input type="number" v-model="config.filterEnvelope.baseFrequency"></input>
			<label>Octave</label>
			<input type="range" min="0" max="20" v-model="config.filterEnvelope.octaves"></input>
			<input type="number" v-model="config.filterEnvelope.octaves"></input>
			<label>Exponent</label>
			<input type="range" min="0" max="10" v-model="config.filterEnvelope.exponent"></input>
			<input type="number" v-model="config.filterEnvelope.exponent"></input>
		</div>
	</div>
</section>
</template>

<script>
import toneUtilityData from '../../mixins/toneUtility.js'

export default {

  name: 'monosynth',
  props: ['config'],
  data () {
    return {
    options: toneUtilityData.generalConfigOptions
    }
  },
  watch: {
  	config: {
  		handler () {
  			this.$emit('updated', this.config)
  		},
  		deep: true
  	}
  }
}
</script>

<style lang="css" scoped>

</style>
