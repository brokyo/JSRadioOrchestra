<template>
<main>
    <h4>Feedback Delay</h4>
    <label>Delay Time</label>
    <input type="range" min="0" max="10" step="0.5" v-model="config.delayTime"></input>
    <input type="number" v-model="config.delayTime"></input>
    <label>Feedback</label>
    <input type="range" min="0" max="1" step="0.1" v-model="config.feedback"></input>
    <input type="number" v-model="config.feedback"></input>
    <label>Wet</label>
    <input type="range" min="0" max="1" step="0.1" v-model="config.wet"></input>
    <input type="number" v-model="config.wet"></input>
</main>
</template>

<script>
export default {

  name: 'feedbackdelay',

  data () {
    return {
      config: {
        delayTime: 0,
        feedback: 0,
        wet: 1
      }

    };
  },
  watch: {
    config: {
      handler: function(newValues) {
        let emitObject = {
          name: 'FeedbackDelay',
          values: newValues
        }
        this.$emit('updateEffect', emitObject)
      },
      deep: true
    }
  }
};
</script>

<style lang="css" scoped>
</style>
