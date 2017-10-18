<template>
<section class="duoSynthConfig">
	<div class="groupControls">
		<div class="title">
			<h4>Group Controls</h4>
		</div>
		<div class="controls">
			<label>Vibrato Amount</label>
			<input type="range" min="0" max="3" step="0.25" :value="config.vibratoAmount" @change="updateConfig('vibratoAmount', $event.target.value)"></input>
			<input type="number" :value="config.vibratoAmount" @change="updateConfig('vibratoAmount', $event.target.value)"></input>
			<label>Vibrato Rate</label>
			<input type="range" min="0" max="20" :value="config.vibratoRate" @change="updateConfig('vibratoRate', $event.target.value)"></input>
			<input type="number" :value="config.vibratoRate" @change="updateConfig('vibratoRate', $event.target.value)"></input>
			<label>Harmonicity</label>
			<input type="range" min="0" max="20" :value="config.harmonicity" @change="updateConfig('harmonicity', $event.target.value)"></input>
			<input type="number" :value="config.harmonicity" @change="updateConfig('harmonicity', $event.target.value)"></input>
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
					<select :value="config.voice0.oscillator.type" @change="updateConfig('voice0', $event.target.value, 'oscillator', 'type')">
						<option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
					</select>
					<label>Volume</label>
					<input type="range" min="-50" max="0" :value="config.voice0.volume" @change="updateConfig('voice0', $event.target.value, 'volume')"></input>
					<input type="number" :value="config.voice0.volume" @change="updateConfig('voice0', $event.target.value, 'volume')"></input>
					<label>Detune</label>
					<input type="range" min="-200" max="200" :value="config.voice0.detune" @change="updateConfig('voice0', $event.target.value, 'detune')">
					<input type="number" :value="config.voice0.detune" @change="updateConfig('voice0', $event.target.value, 'detune')"></input>
					<label>Portamento</label>
					<input type="range" min="0" max="5" :value="config.voice0.portamento" @change="updateConfig('voice0', $event.target.value, 'portamento')"></input>
					<input type="number" :value="config.voice0.portamento" @change="updateConfig('voice0', $event.target.value, 'portamento')"></input>
				</div>
			</div>
			<div class="category">
				<div class="title">
					<h6>Envelope</h6>
				</div>
				<div class="category">
					<label>Attack</label>
					<input type="range" min="0" max="5" :value="config.voice0.envelope.attack" @change="updateConfig('voice0', $event.target.value, 'envelope', 'attack')"></input>
					<input type="number" :value="config.voice0.envelope.attack" @change="updateConfig('voice0', $event.target.value, 'envelope', 'attack')"></input>
					<label>Attack Curve</label>
					<select :value="config.voice0.envelope.attackCurve" @change="updateConfig('voice0', $event.target.value, 'envelope', 'attackCurve')">
						<option v-for="curve in options.envelopeCurves">{{curve}}</option>
					</select>
					<label>Decay</label>
					<input type="range" min="0" max="5" :value="config.voice0.envelope.decay" @change="updateConfig('voice0', $event.target.value, 'envelope', 'decay')"></input>
					<input type="number" :value="config.voice0.envelope.decay" @change="updateConfig('voice0', $event.target.value, 'envelope', 'decay')"></input>
					<label>Sustain</label>
					<input type="range" min="0" max="1" :value="config.voice0.envelope.sustain" @change="updateConfig('voice0', $event.target.value, 'envelope', 'sustain')"></input>
					<input type="number" :value="config.voice0.envelope.sustain" @change="updateConfig('voice0', $event.target.value, 'envelope', 'sustain')"></input>
					<label>Release</label>
					<input type="range" min="0" max="5" :value="config.voice0.envelope.release" @change="updateConfig('voice0', $event.target.value, 'envelope', 'release')"></input>
					<input type="number" :value="config.voice0.envelope.release" @change="updateConfig('voice0', $event.target.value, 'envelope', 'release')"></input>
					<label>Release Curve</label>
					<select :value="config.voice0.envelope.releaseCurve" @change="updateConfig('voice0', $event.target.value, 'envelope', 'releaseCurve')">
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
					<input type="range" min="0" max="5" :value="config.voice0.filterEnvelope.attack" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'attack')"></input>
					<input type="number" :value="config.voice0.filterEnvelope.attack" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'attack')"></input>
          <label>Attack Curve</label>
          <select :value="config.voice0.filterEnvelope.attackCurve" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'attackCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
					<label>Decay</label>
					<input type="range" min="0" max="5" :value="config.voice0.filterEnvelope.decay" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'decay')"></input>
					<input type="number" :value="config.voice0.filterEnvelope.decay" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'decay')"></input>
					<label>Sustain</label>
					<input type="range" min="0" max="1" :value="config.voice0.filterEnvelope.sustain" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'sustain')"></input>
					<input type="number" :value="config.voice0.filterEnvelope.sustain" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'sustain')"></input>
					<label>Release</label>
					<input type="range" min="0" max="5" :value="config.voice0.filterEnvelope.release" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'release')"></input>
					<input type="number" :value="config.voice0.filterEnvelope.release" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'release')"></input>
          <label>Release Curve</label>
          <select :value="config.voice0.filterEnvelope.releaseCurve" @change="updateConfig('voice0', $event.target.value, 'filterEnvelope', 'releaseCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
				</div>
			</div>
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
          <select :value="config.voice1.oscillator.type" @change="updateConfig('voice1', $event.target.value, 'oscillator', 'type')">
            <option v-for="oscillator in options.oscillators.standard">{{oscillator}}</option>
          </select>
          <label>Volume</label>
          <input type="range" min="-50" max="0" :value="config.voice1.volume" @change="updateConfig('voice1', $event.target.value, 'volume')"></input>
          <input type="number" :value="config.voice1.volume" @change="updateConfig('voice1', $event.target.value, 'volume')"></input>
          <label>Detune</label>
          <input type="range" min="-200" max="200" :value="config.voice1.detune" @change="updateConfig('voice1', $event.target.value, 'detune')">
          <input type="number" :value="config.voice1.detune" @change="updateConfig('voice1', $event.target.value, 'detune')"></input>
          <label>Portamento</label>
          <input type="range" min="0" max="5" :value="config.voice1.portamento" @change="updateConfig('voice1', $event.target.value, 'portamento')"></input>
          <input type="number" :value="config.voice1.portamento" @change="updateConfig('voice1', $event.target.value, 'portamento')"></input>
        </div>
      </div>
      <div class="category">
        <div class="title">
          <h6>Envelope</h6>
        </div>
        <div class="category">
          <label>Attack</label>
          <input type="range" min="0" max="5" :value="config.voice1.envelope.attack" @change="updateConfig('voice1', $event.target.value, 'envelope', 'attack')"></input>
          <input type="number" :value="config.voice1.envelope.attack" @change="updateConfig('voice1', $event.target.value, 'envelope', 'attack')"></input>
          <label>Attack Curve</label>
          <select :value="config.voice1.envelope.attackCurve" @change="updateConfig('voice1', $event.target.value, 'envelope', 'attackCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
          <label>Decay</label>
          <input type="range" min="0" max="5" :value="config.voice1.envelope.decay" @change="updateConfig('voice1', $event.target.value, 'envelope', 'decay')"></input>
          <input type="number" :value="config.voice1.envelope.decay" @change="updateConfig('voice1', $event.target.value, 'envelope', 'decay')"></input>
          <label>Sustain</label>
          <input type="range" min="0" max="1" :value="config.voice1.envelope.sustain" @change="updateConfig('voice1', $event.target.value, 'envelope', 'sustain')"></input>
          <input type="number" :value="config.voice1.envelope.sustain" @change="updateConfig('voice1', $event.target.value, 'envelope', 'sustain')"></input>
          <label>Release</label>
          <input type="range" min="0" max="5" :value="config.voice1.envelope.release" @change="updateConfig('voice1', $event.target.value, 'envelope', 'release')"></input>
          <input type="number" :value="config.voice1.envelope.release" @change="updateConfig('voice1', $event.target.value, 'envelope', 'release')"></input>
          <label>Release Curve</label>
          <select :value="config.voice1.envelope.releaseCurve" @change="updateConfig('voice1', $event.target.value, 'envelope', 'releaseCurve')">
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
          <input type="range" min="0" max="5" :value="config.voice1.filterEnvelope.attack" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'attack')"></input>
          <input type="number" :value="config.voice1.filterEnvelope.attack" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'attack')"></input>
          <label>Attack Curve</label>
          <select :value="config.voice1.filterEnvelope.attackCurve" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'attackCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
          <label>Decay</label>
          <input type="range" min="0" max="5" :value="config.voice1.filterEnvelope.decay" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'decay')"></input>
          <input type="number" :value="config.voice1.filterEnvelope.decay" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'decay')"></input>
          <label>Sustain</label>
          <input type="range" min="0" max="1" :value="config.voice1.filterEnvelope.sustain" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'sustain')"></input>
          <input type="number" :value="config.voice1.filterEnvelope.sustain" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'sustain')"></input>
          <label>Release</label>
          <input type="range" min="0" max="5" :value="config.voice1.filterEnvelope.release" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'release')"></input>
          <input type="number" :value="config.voice1.filterEnvelope.release" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'release')"></input>
          <label>Release Curve</label>
          <select :value="config.voice1.filterEnvelope.releaseCurve" @change="updateConfig('voice1', $event.target.value, 'filterEnvelope', 'releaseCurve')">
            <option v-for="curve in options.envelopeCurves">{{curve}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {

  name: 'duosynth',
  props: ['options', 'config'],
  methods: {
    updateConfig: function (field, value, subfield, subsubfield) {
      this.$store.dispatch('MUNGE_SYNTH_UPDATE', {field, value, subfield, subsubfield})
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
