<template>
<section class="filterConfig">
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
</template>

<script>
export default {

  name: 'tonefilter',
  props: ['options'],
  data () {
    return {
      filterConfig: {
        frequency: 1,
        type: 'lowpass',
        rolloff: -12,
        Q: 1
      }
    }
  },
  watch: {
    filterConfig: {
      handler: function () {
        this.$emit('updateFilter', this.filterConfig)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
