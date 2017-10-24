<template>
<section class="duoSynthConfig">
	<div class="groupControls">
		<div class="title">
			<h4>Group Controls</h4>
		</div>
		<div class="controls">
			<label>Vibrato Amount</label>
			<input type="range" min="0" max="3" step="0.25" v-model="config.vibratoAmount"></input>
			<input type="number" v-model="config.vibratoAmount"></input>
			<label>Vibrato Rate</label>
			<input type="range" min="0" max="20" v-model="config.vibratoRate"></input>
			<input type="number" v-model="config.vibratoRate"></input>
			<label>Harmonicity</label>
			<input type="range" min="0" max="20" v-model="config.harmonicity"></input>
			<input type="number" v-model="config.harmonicity"></input>
		</div>
	</div>
	<div class="voice">
		<div class="title">
			<h4>Voice 0</h4>
		</div>
		<div class="voiceControls">
			<div class="category">
				<div class="title">
					<h6>Synth</h6>
				</div>
				<div class="category">
					<label>Oscillator</label>
					<select v-model="config.voice0.oscillator.type">
						<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
					</select>
					<label>Volume</label>
					<input type="range" min="-50" max="0" v-model="config.voice0.volume"></input>
					<input type="number" v-model="config.voice0.volume"></input>
					<label>Detune</label>
					<input type="range" min="-200" max="200" v-model="config.voice0.detune">
					<input type="number" v-model="config.voice0.detune"></input>
					<label>Portamento</label>
					<input type="range" min="0" max="5" v-model="config.voice0.portamento"></input>
					<input type="number" v-model="config.voice0.portamento"></input>
				</div>
			</div>
			<div class="category">
				<div class="title">
					<h6>Envelope</h6>
				</div>
				<div class="category">
					<label>Attack</label>
					<input type="range" min="0" max="5" v-model="config.voice0.envelope.attack"></input>
					<input type="number" v-model="config.voice0.envelope.attack"></input>
					<label>Attack Curve</label>
					<select v-model="config.voice0.envelope.attackCurve">
						<option v-for="curve in options.envelopeCurves">{{curve}}</option>
					</select>
					<label>Decay</label>
					<input type="range" min="0" max="5" v-model="config.voice0.envelope.decay"></input>
					<input type="number" v-model="config.voice0.envelope.decay"></input>
					<label>Sustain</label>
					<input type="range" min="0" max="1" v-model="config.voice0.envelope.sustain"></input>
					<input type="number" v-model="config.voice0.envelope.sustain"></input>
					<label>Release</label>
					<input type="range" min="0" max="5" v-model="config.voice0.envelope.release"></input>
					<input type="number" v-model="config.voice0.envelope.release"></input>
					<label>Release Curve</label>
					<select v-model="config.voice0.envelope.releaseCurve">
						<option v-for="curve in options.envelopeCurves">{{curve}}</option>
					</select>
				</div>
			</div>
			<div class="category">
				<div class="title">
					<h6>Filter Envelope</h6>
				</div>
				<div class="category">
					<label>Attack</label>
					<input type="range" min="0" max="5" v-model="config.voice0.filterEnvelope.attack"></input>
					<input type="number" v-model="config.voice0.filterEnvelope.attack"></input>
          <label>Attack Curve</label>
          <select v-model="config.voice0.filterEnvelope.attackCurve">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
					<label>Decay</label>
					<input type="range" min="0" max="5" v-model="config.voice0.filterEnvelope.decay"></input>
					<input type="number" v-model="config.voice0.filterEnvelope.decay"></input>
					<label>Sustain</label>
					<input type="range" min="0" max="1" v-model="config.voice0.filterEnvelope.sustain"></input>
					<input type="number" v-model="config.voice0.filterEnvelope.sustain"></input>
					<label>Release</label>
					<input type="range" min="0" max="5" v-model="config.voice0.filterEnvelope.release"></input>
					<input type="number" v-model="config.voice0.filterEnvelope.release"></input>
          <label>Release Curve</label>
          <select v-model="config.voice0.filterEnvelope.releaseCurve">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
				</div>
			</div>
		</div>
	</div>
  <div class="voice">
    <div class="title">
      <h4>Voice 1</h4>
    </div>
    <div class="voiceControls">
      <div class="category">
        <div class="title">
          <h6>Synth</h6>
        </div>
        <div class="category">
          <label>Oscillator</label>
          <select v-model="config.voice1.oscillator.type">
            <option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
          </select>
          <label>Volume</label>
          <input type="range" min="-50" max="0" v-model="config.voice1.volume"></input>
          <input type="number" v-model="config.voice1.volume"></input>
          <label>Detune</label>
          <input type="range" min="-200" max="200" v-model="config.voice1.detune">
          <input type="number" v-model="config.voice1.detune"></input>
          <label>Portamento</label>
          <input type="range" min="0" max="5" v-model="config.voice1.portamento"></input>
          <input type="number" v-model="config.voice1.portamento"></input>
        </div>
      </div>
      <div class="category">
        <div class="title">
          <h6>Envelope</h6>
        </div>
        <div class="category">
          <label>Attack</label>
          <input type="range" min="0" max="5" v-model="config.voice1.envelope.attack"></input>
          <input type="number" v-model="config.voice1.envelope.attack"></input>
          <label>Attack Curve</label>
          <select v-model="config.voice1.envelope.attackCurve">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
          <label>Decay</label>
          <input type="range" min="0" max="5" v-model="config.voice1.envelope.decay"></input>
          <input type="number" v-model="config.voice1.envelope.decay"></input>
          <label>Sustain</label>
          <input type="range" min="0" max="1" v-model="config.voice1.envelope.sustain"></input>
          <input type="number" v-model="config.voice1.envelope.sustain"></input>
          <label>Release</label>
          <input type="range" min="0" max="5" v-model="config.voice1.envelope.release"></input>
          <input type="number" v-model="config.voice1.envelope.release"></input>
          <label>Release Curve</label>
          <select v-model="config.voice1.envelope.releaseCurve">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
        </div>
      </div>
      <div class="category">
        <div class="title">
          <h6>Filter Envelope</h6>
        </div>
        <div class="category">
          <label>Attack</label>
          <input type="range" min="0" max="5" v-model="config.voice1.filterEnvelope.attack"></input>
          <input type="number" v-model="config.voice1.filterEnvelope.attack"></input>
          <label>Attack Curve</label>
          <select v-model="config.voice1.filterEnvelope.attackCurve">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
          <label>Decay</label>
          <input type="range" min="0" max="5" v-model="config.voice1.filterEnvelope.decay"></input>
          <input type="number" v-model="config.voice1.filterEnvelope.decay"></input>
          <label>Sustain</label>
          <input type="range" min="0" max="1" v-model="config.voice1.filterEnvelope.sustain"></input>
          <input type="number" v-model="config.voice1.filterEnvelope.sustain"></input>
          <label>Release</label>
          <input type="range" min="0" max="5" v-model="config.voice1.filterEnvelope.release"></input>
          <input type="number" v-model="config.voice1.filterEnvelope.release"></input>
          <label>Release Curve</label>
          <select v-model="config.voice1.filterEnvelope.releaseCurve">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import toneUtilityData from '../../mixins/toneUtility.js'

export default {

  name: 'duosynth',
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

<style lang="scss" scoped>

.duoSynthConfig {
  display: block;

  label {
    display: block;
    font-weight: 900;
  }
  input[type="range"] {
    width: 70%;
    margin-right: 10px;
  }
  input[type="number"] {
    width: 25%;
    font-weight: 900;
  }

  .title {
    width: 100%;
    background-color: #E1E1E1;
  }

  .groupControls {
    height: 600px;
    background-color: #AAAAAA;
    width: 20%;
    display: block;
      float: left;
      flex-wrap: wrap;
  }

  .voice {
    width: 80%;
    float: left;
  }

  .voiceControls {
    display: flex;
    height: 100%;

    .category {
      background-color: #AAAAAA;
      padding: 5px 10px;
      height: 100%;
      flex-grow: 1;
      flex: 1;
    }
  }
}

</style>
