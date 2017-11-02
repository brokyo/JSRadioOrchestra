<template>
  <main>
    <h3>Single Play Music Box</h3>
    <p>If you don't know what these are I suggest not touching them other than turning them on or off. See the Under Construction Club widget for more.</p>
    <p>Interval input sets the interval at which compounding effects are applied (i.e. in 'volumeDown' volume decreases by one every eight seconds)</p>
    <div v-for="(mutation, index) in mutations">
      <h4>{{mutation.type}}</h4>
      <label>Active</label>
      <input type="checkbox" v-model="mutation.active"></input>
      <label>Start</label>
      <input type="number" v-model="mutation.start"></input>
      <span v-if="mutation.interval">
        <label>Additional Effect Interval</label>
        <input type="number" v-model="mutation.interval"></input>
      </span>
      <pre>{{mutation}}</pre>
    </div>
    <h3>Generative Music Box</h3>
    <p>Eventually this thing will let you set multiple short loops with different synth that will play and evolve (note changes, duration changes, phasing, etc) over time. You'll be able to set the rules here</p>
  </main>
</template>

<script>

export default {

  name: 'mutation',

  data () {
    return {
      mutations: [],
      ucc: {
        about: "There's a vauge strain of wabisabi in this thing and I like the idea of digital decay. My real goal is to introduce natural performance errors that will force sonic glitching naturally (think dust on a record) but while I work that out this fakes it so I can see how interesting it is. If you know browsers and have an idea how to do this (constantly repainting? Self-calling loops?) let me know",
        instructions: "If you don't know what you're doing here just leave it off. Generally though you can change the time the corruption begins or turn it on/off. I've got a vague idea how can sync changes with the video which might be cool - it might also make it too much of a theme park ride so I dunno"
      }
    }
  },
  mounted () {
    this.mutations = this.$_.cloneDeep(this.$store.state.corruption)
  },
  beforeDestroy () {
    this.$store.commit('SET_CORRUPTION_PARMS', this.$_.cloneDeep(this.mutations))
  }
}
</script>

<style lang="css" scoped>
</style>
