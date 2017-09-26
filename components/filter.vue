<template>
  <div>
    <select v-model="filterConfig.type">
      <option v-for="type in allOptions.filter.allTypes">{{type}}</option>
    </select>
    <label>Frequency</label>
    <input type="range" min="-200" max="50000" v-model="filterConfig.frequency"></input>
    <input type="number" v-model="filterConfig.frequency"></input>
    <label>Q</label>
    <input type="range" min="0" max="100" v-model="filterConfig.Q">
    <input type="number" v-model="filterConfig.Q"></input>
    <input type="range" min="0" max="100" v-model="filterConfig.gain"></input>
    <input type="number" v-model="filterConfig.gain"></input>
    <label>Rolloff</label>
    <select v-model="filterConfig.rolloff">
      <option v-for="rolloff in allOptions.filter.rolloffValues">{{ rolloff.value }}</option>
    </select>
  </div>

</template>

<script>
export default {

  name: 'filter',

  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
</style>
