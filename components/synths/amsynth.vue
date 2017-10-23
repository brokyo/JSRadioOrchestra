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
			<label>Modulation Oscillator</label>
			<select v-model="config.modulation.type">
				<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
			</select>
			<label>Volume</label>
			<input type="range" min="-50" max="0" v-model="config.volume"></input>
			<input type="number" v-model="config.volume"></input>
			<label>Harmonicity</label>
			<input type="range" min="0" max="20" v-model="config.harmonicity"></input>
			<input type="number" v-model="config.harmonicity"></input>
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
			<h4>Modulation Envelope</h4>
		</div>
		<div class="controls">
			<label>Attack</label>
			<input type="range" min="0" max="5" v-model="config.modulationEnvelope.attack"></input>
			<input type="number" v-model="config.modulationEnvelope.attack"></input>
      <label>Attack Curve</label>
      <select v-model="config.modulationEnvelope.attackCurve">
        <option v-for="curve in options.envelopeCurves">{{curve}}</option>
      </select>
			<label>Decay</label>
			<input type="range" min="0" max="5" v-model="config.modulationEnvelope.decay"></input>
			<input type="number" v-model="config.modulationEnvelope.decay"></input>
			<label>Sustain</label>
			<input type="range" min="0" max="1" v-model="config.modulationEnvelope.sustain"></input>
			<input type="number" v-model="config.modulationEnvelope.sustain"></input>
			<label>Release</label>
			<input type="range" min="0" max="5" v-model="config.modulationEnvelope.release"></input>
			<input type="number" v-model="config.modulationEnvelope.release"></input>
      <label>Release Curve</label>
      <select v-model="config.modulationEnvelope.releaseCurve">
        <option v-for="curve in options.envelopeCurves">{{curve}}</option>
      </select>
	<!-- 		<label>Base Frequency</label>
			<input type="range" min="0" max="5000" v-model="config.modulationEnvelope.baseFrequency"></input>
			<input type="number" v-model="config.modulationEnvelope.baseFrequency"></input>
			<label>Octave</label>
			<input type="range" min="0" max="20" v-model="config.modulationEnvelope.octaves"></input>
			<input type="number" v-model="config.modulationEnvelope.octaves"></input>
			<label>Exponent</label>
			<input type="range" min="0" max="10" v-model="config.modulationEnvelope.exponent"></input>
			<input type="number" v-model="config.modulationEnvelope.exponent"></input> -->
		</div>
	</div>
</section>
</template>

<script>
export default {

  name: 'amsynth',
  props: ['options', 'config'],
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

<style lang="less">

</style>
