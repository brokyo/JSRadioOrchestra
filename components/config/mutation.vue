<template>
  <main>
    <h4>hardcoded atm</h4>
    <h3>Single Play</h3>
    <p>This is the stuff that'll just happen naturally over time. Over five minute the scene gets increasingly corrupted (both static/corruption on notes and additional synths being added). This will be configurable once I figure out what makes it interesting.</p>
    <pre>{{this.$store.state.corruption}}</pre>
    <h3>Generative Loop Ruleset</h3>
    <p>Eventually this thing will let you set multiple short loops with different synth that will play and evolve (note changes, duration changes, phasing, etc) over time. You'll be able to set the rules here</p>
  </main>
</template>

<script>
export default {

  name: 'mutation',

  data () {
    return {
      ucc: {
        about: "There's a vauge strain of wabisabi in this thing and I like the idea of digital decay. My real goal is to introduce natural performance errors that will force sonic glitching naturally (think dust on a record) but while I work that out this fakes it so I can see how interesting it is. If you know browsers and have an idea how to do this (constantly repainting? Self-calling loops?) let me know",
        instructions: "If you don't know what you're doing here just leave it off. Generally though you can change the time the corruption begins or turn it on/off. I've got a vague idea how can sync changes with the video which might be cool - it might also make it too much of a theme park ride so I dunno"
      }
    }
  },
  mounted () {
    // console.log('sup')
    this.$ucc({about: this.ucc.about, instructions: this.ucc.instructions})
  }
}
</script>

<style lang="css" scoped>
</style>
