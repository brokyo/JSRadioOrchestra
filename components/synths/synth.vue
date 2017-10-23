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
            <input type="range" min="-50" max="0" v-model="config.volume"></input>
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
</section>
</template>

<script>
export default {

  name: 'synth',
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

<style lang="css" scoped>

</style>
