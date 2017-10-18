<template>
<section class="synthConfig">
	<div class="category">
		<div class="title">
			<h4>Synth</h4>
		</div>
		<div class="controls">
			<label>Oscillator</label>
			<select :value="config.oscillator.type" @change="updateConfig('oscillator', $event.target.value, 'type')">
				<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
			</select>
			<label>Modulation Oscillator</label>
			<select :value="config.modulation.type" @change="updateConfig('modulation', $event.target.value, 'type')">
				<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
			</select>
			<label>Volume</label>
			<input type="range" min="-50" max="0" :value="config.volume" @change="updateConfig('volume', $event.target.value)"></input>
			<input type="number" :value="config.volume" @change="updateConfig('volume', $event.target.value)"></input>
			<label>Harmonicity</label>
			<input type="range" min="0" max="20" :value="config.harmonicity" @change="updateConfig('harmonicity', $event.target.value)"></input>
			<input type="number" :value="config.harmonicity" @change="updateConfig('harmonicity', $event.target.value)"></input>
			<label>Detune</label>
			<input type="range" min="-200" max="200" :value="config.detune" @change="updateConfig('detune', $event.target.value)">
			<input type="number" :value="config.detune" @change="updateConfig('detune', $event.target.value)"></input>
			<label>Portamento</label>
			<input type="range" min="0" max="5" :value="config.portamento" @change="updateConfig('portamento', $event.target.value)"></input>
			<input type="number" :value="config.portamento" @change="updateConfig('portamento', $event.target.value)"></input>
		</div>
	</div>
	<div class="category">
		<div class="title">
			<h4>Envelope</h4>
		</div>
		<div class="controls">
			<label>Attack</label>
			<input type="range" min="0" max="5" :value="config.envelope.attack" @change="updateConfig('envelope', $event.target.value, 'attack')"></input>
			<input type="number" :value="config.envelope.attack" @change="updateConfig('envelope', $event.target.value, 'attack')"></input>
			<label>Attack Curve</label>
			<select :value="config.envelope.attackCurve" @change="updateConfig('envelope', $event.target.value, 'attackCurve')">
				<option v-for="curve in options.envelopeCurves">{{curve}}</option>
			</select>
			<label>Decay</label>
			<input type="range" min="0" max="5" :value="config.envelope.decay" @change="updateConfig('envelope', $event.target.value, 'decay')"></input>
			<input type="number" :value="config.envelope.decay" @change="updateConfig('envelope', $event.target.value, 'decay')"></input>
			<label>Sustain</label>
			<input type="range" min="0" max="1" :value="config.envelope.sustain" @change="updateConfig('envelope', $event.target.value, 'sustain')"></input>
			<input type="number" :value="config.envelope.sustain" @change="updateConfig('envelope', $event.target.value, 'sustain')"></input>
			<label>Release</label>
			<input type="range" min="0" max="5" :value="config.envelope.release" @change="updateConfig('envelope', $event.target.value, 'release')"></input>
			<input type="number" :value="config.envelope.release" @change="updateConfig('envelope', $event.target.value, 'release')"></input>
			<label>Release Curve</label>
			<select :value="config.envelope.releaseCurve" @change="updateConfig('envelope', $event.target.value, 'releaseCurve')">
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
			<input type="range" min="0" max="5" :value="config.modulationEnvelope.attack" @change="updateConfig('modulationEnvelope', $event.target.value, 'attack')"></input>
			<input type="number" :value="config.modulationEnvelope.attack" @change="updateConfig('modulationEnvelope', $event.target.value, 'attack')"></input>
      <label>Attack Curve</label>
      <select :value="config.modulationEnvelope.attackCurve" @change="updateConfig('modulationEnvelope', $event.target.value, 'attackCurve')">
        <option v-for="curve in options.envelopeCurves">{{curve}}</option>
      </select>
			<label>Decay</label>
			<input type="range" min="0" max="5" :value="config.modulationEnvelope.decay" @change="updateConfig('modulationEnvelope', $event.target.value, 'decay')"></input>
			<input type="number" :value="config.modulationEnvelope.decay" @change="updateConfig('modulationEnvelope', $event.target.value, 'decay')"></input>
			<label>Sustain</label>
			<input type="range" min="0" max="1" :value="config.modulationEnvelope.sustain" @change="updateConfig('modulationEnvelope', $event.target.value, 'sustain')"></input>
			<input type="number" :value="config.modulationEnvelope.sustain" @change="updateConfig('modulationEnvelope', $event.target.value, 'sustain')"></input>
			<label>Release</label>
			<input type="range" min="0" max="5" :value="config.modulationEnvelope.release" @change="updateConfig('modulationEnvelope', $event.target.value, 'release')"></input>
			<input type="number" :value="config.modulationEnvelope.release" @change="updateConfig('modulationEnvelope', $event.target.value, 'release')"></input>
      <label>Release Curve</label>
      <select :value="config.modulationEnvelope.releaseCurve" @change="updateConfig('modulationEnvelope', $event.target.value, 'releaseCurve')">
        <option v-for="curve in options.envelopeCurves">{{curve}}</option>
      </select>
	<!-- 		<label>Base Frequency</label>
			<input type="range" min="0" max="5000" :value="config.modulationEnvelope.baseFrequency"></input>
			<input type="number" :value="config.modulationEnvelope.baseFrequency"></input>
			<label>Octave</label>
			<input type="range" min="0" max="20" :value="config.modulationEnvelope.octaves"></input>
			<input type="number" :value="config.modulationEnvelope.octaves"></input>
			<label>Exponent</label>
			<input type="range" min="0" max="10" :value="config.modulationEnvelope.exponent"></input>
			<input type="number" :value="config.modulationEnvelope.exponent"></input> -->
		</div>
	</div>
</section>
</template>

<script>
export default {

  name: 'amsynth',
  props: ['options', 'config'],
  methods: {
  	updateConfig: function (field, value, subfield) {
  		this.$store.dispatch('MUNGE_SYNTH_UPDATE', {field, value, subfield})
  	}
  }
}
</script>

<style lang="less">

</style>
