<template>
<main>
  <input type="checkbox" v-model="localActive"></input>
  <section class="filterConfig" :class="{disabled: !active}">
    <div class="title">
      <h4>Filter</h4>
    </div>
    <div class="controls">
      <select v-model="config.type">
        <option v-for="type in options.filter.allTypes">{{type}}</option>
      </select>
      <label>Frequency</label>
      <input type="range" min="0" max="20000" step="100" v-model="config.frequency"></input>
      <input type="number" v-model="config.frequency"></input>
      <label>Q</label>
      <input type="range" min="0" max="30" v-model="config.Q">
      <input type="number" v-model="config.Q"></input>
      <label>Rolloff</label>
      <select v-model="config.rolloff">
        <option v-for="rolloff in options.filter.rollOffValues">{{ rolloff }}</option>
      </select>
    </div>
  </section>
</main>
</template>

<script>
import toneUtilityData from '../../mixins/toneUtility.js'

export default {
  name: 'tonefilter',
  props: ['active', 'config'],
  data () {
    return {
      options: toneUtilityData.generalConfigOptions 
    }
  },
  watch: {
    // TODO: I think it's a total fluke that this works but w/e
    config: {
      handler: function () {
        this.$emit('update', this.config)
      },
      deep: true
    }
  },
  computed: {
    localActive: {
      get: function () {
        return this.active
      },
      set: function () {
        this.$emit('toggle', this.localActive)
      }
    },
    filterType: {
      get: function () {
        return this.config.type
      },
      set: function (newValue) {
        console.log(newValue)
        this.$emit('update', {'filter': newValue})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  background-color: black
}

</style>
