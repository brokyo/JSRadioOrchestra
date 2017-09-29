<template>
  <main>
    <h1>Skrathech</h1>
    <select v-model="scaleKey">
      <option v-for="note in possibleNotes">{{note}}</option>
    </select>
    <select v-model="octave1">
      <option v-for="octave in possibleOctaves">{{octave}}</option>
    </select>
    <select v-model="octave2">
      <option v-for="octave in possibleOctaves">{{octave}}</option>
    </select>
    <p v-for="note in scale.config">{{note}} {{octave}}</p>
  </main>
</template>

<script>
export default {

  name: 'scratch',

  data () {
    return {
      scale: {
        name: 'Dark (In Scale)',
        config: [
          { id: 0, keyCode: 'q', note: 'D', octave: 3 },
          { id: 1, keyCode: 'w', note: 'D#', octave: 3 },
          { id: 2, keyCode: 'e', note: 'G', octave: 3 },
          { id: 3, keyCode: 'r', note: 'A', octave: 3 },
          { id: 4, keyCode: 't', note: 'A#', octave: 3 },
          { id: 5, keyCode: 'h', note: 'D', octave: 4 },
          { id: 6, keyCode: 'j', note: 'D#', octave: 4 },
          { id: 7, keyCode: 'k', note: 'G', octave: 4 },
          { id: 8, keyCode: 'l', note: 'A', octave: 4 },
          { id: 9, keyCode: ';', note: 'A#', octave: 4 }
        ],
        steps: [0, 1, 6, 8, 9]
      },
      octave1: '',
      octave2: '',
      scaleKey: '',
      possibleNotes: ['A', 'A#', 'B', 'B#', 'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'F#', 'G', 'G#'],
      possibleOctaves: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }
    },
    watch: {
      octave1: function(newOctave){
        this.scale.config.forEach(function(pitch){
          if(pitch.id <= 4){
            pitch.octave = Number(newOctave)
          }
        })
      },
      octave2: function(newOctave){
        this.scale.config.forEach(function(pitch){
          if(pitch.id > 4){
            pitch.octave = Number(newOctave)
          }
        })
      },
      scaleKey: function(newKey){
        let newOrigin = this.possibleNotes.indexOf(newKey)
        let newScale = this.reorder(this.possibleNotes, newOrigin)
        let vue = this

        this.scale.config.forEach(function(pitch){
          if(pitch.id === 0 || pitch.id === 5){
            pitch.note = newScale[vue.scale.steps[0]]
          }

          if(pitch.id === 1 || pitch.id === 6){
            pitch.note = newScale[vue.scale.steps[1]]
          }

          if(pitch.id === 2 || pitch.id === 7){
            pitch.note = newScale[vue.scale.steps[2]]
          }

          if(pitch.id === 3 || pitch.id === 8){
            pitch.note = newScale[vue.scale.steps[3]]
          }

          if(pitch.id === 4 || pitch.id === 9){
            pitch.note = newScale[vue.scale.steps[4]]
          }
        })
      }
  },
  methods: {
    reorder: function(data, index){
      return data.slice(index).concat(data.slice(0, index))
    }
  }
};
</script>

<style lang="css" scoped>
</style>
