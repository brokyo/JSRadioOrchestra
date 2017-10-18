<template>
<main>
  <input type="checkbox" v-model="active"></input>
  <section class="filterConfig" :class="{disabled: !active}">
    <div class="title">
      <h4>Filter</h4>
    </div>
    <div class="controls">
      <select v-model="filterConfig.type">
        <option v-for="type in options.filter.allTypes">{{type}}</option>
      </select>
      <label>Frequency</label>
      <input type="range" min="0" max="20000" step="100" v-model="filterConfig.frequency"></input>
      <input type="number" v-model="filterConfig.frequency"></input>
      <label>Q</label>
      <input type="range" min="0" max="30" v-model="filterConfig.Q">
      <input type="number" v-model="filterConfig.Q"></input>
      <label>Rolloff</label>
      <select v-model="filterConfig.rolloff">
        <option v-for="rolloff in options.filter.rollOffValues">{{ rolloff }}</option>
      </select>
    </div>
  </section>
</main>
</template>

<script>
var _ = require('lodash')
export default {

  name: 'tonefilter',
  props: ['options'],
  data () {
    return {
      active: false,
      filterConfig: {
        frequency: 1,
        type: 'lowpass',
        rolloff: -12,
        Q: 1
      }
    }
  },
  watch: {
    active: function () {
      this.$store.commit('TOGGLE_ACTIVE_FILTER')
    },
    filterConfig: {
      handler: function () {
        this.$store.dispatch('UPDATE_FILTER_MEMBER_VALUES', this.filterConfig)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  background-color: black
}

</style>
