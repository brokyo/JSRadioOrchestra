<template>
  <main>
    <h1>We're Going To Build A GD Oscilloscope</h1>
    <button @mousedown="synth.triggerAttack(172)" @mouseup="synth.triggerRelease()">START</button>
    <div id="canvas">
    </div>
  </main>
</template>
<script>
if (process.browser) {
    var Tone = require('tone')
    window.Tone = Tone
    var p5 = require('p5')
    // require('p5/lib/addons/p5.sound.min.js')
}

export default {
  name: 'scratch',
  data () {
    return {
      synth: {},
      crush: {},
      analyzer: {}
    }
  },
  mounted: function () {
    var vue = this
    this.synth = new Tone.FMSynth()
    this.analyzer = new Tone.Analyser({type: 'waveform'}).toMaster()
    this.synth.connect(this.analyzer)


    // let analyzer
    let numSamples = 1024
    let samples = []

    var s = function (sketch) {

      sketch.setup = function () {
        var canvas = sketch.createCanvas(numSamples, 200)
        canvas.parent('canvas')
        sketch.noFill()
        sketch.stroke(240)

      }

      sketch.draw = function () {
        sketch.background(30, 30, 30, 220)

        samples = vue.analyzer.getValue()
        var bufLen = samples.length

        sketch.strokeWeight(4)
        sketch.beginShape()

        for (var i = 0; i < bufLen; i++) {
          var x = sketch.map(i, 0, bufLen, 0, sketch.width)
          var y = sketch.map(samples[i], -1, 1, -sketch.height / 2, sketch.height / 2)
          sketch.vertex(x, y + sketch.height / 2)
        }
        sketch.endShape()

      }

      sketch.mousePressed = function () {

      }
    }
    var myp5 = new p5(s)
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>
</style>
