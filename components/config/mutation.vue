<template>
  <main>
    <h4>hardcoded atm</h4>
    <h3>Single Play</h3>
    <p>This is the stuff that'll just happen naturally over time. Over five minute the scene gets increasingly corrupted (both static/corruption on notes and additional synths being added). This will be configurable once I figure out what makes it interesting.</p>
    <pre>{{this.$store.state.mutation}}</pre>
    <h3>Generative Loop Ruleset</h3>
    <p>Eventually this thing will let you set multiple short loops with different synth that will play and evolve (note changes, duration changes, phasing, etc) over time. You'll be able to set the rules here</p>
  </main>
</template>

<script>
export default {

  name: 'mutation',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
