<template>
  <main >
    <div v-for="octave in octaves">
      <div>
        <h1>{{octave.name}}</h1>
        <label>Direction</label>
        <select v-model="octave.config['flex-direction']">
          <option value="column">Column</option>
          <option value="row">Row</option>
        </select>
        <div class="octaveConfig" v-for="band in octave.styles">
          <label>Color</label>
          <input type="color" v-model="band.color"></input>
          <label>Grow</label>
          <input type="number" v-model="band.grow"></input>
          <label>Offset</label>
          <input type="number" v-model="band.offset"></input>
          <label>Order</label>
          <input type="number" v-model="band.order"></input>
          <label>Start Opacity</label>
          <input type="number" v-model="band.startOpacity"></input>
          <label>End Opacity</label>
          <input type="number" v-model="band.endOpacity"></input>
        </div>
      </div>
    </div>
    <colorfilter class="colorFilter" :octaves="octaves" :transitions="transitions" :active="active"></colorfilter>
  </main>
</template>

<script>
import colorfilter from '../components/colorfilter.vue'

export default {
  name: 'scratch',
  components: {
  colorfilter
  },
  data () {
    return {
      octaves: [
        {
          name: 'octave1',
          config: {
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'flex-start'
          },
          styles: [
            {grow: 1, order: 1, offset: 0, color: '#E583B4', startOpacity: 1, endOpacity: 0},
            {grow: 1, order: 2, offset: 0, color: '#FAEE31', startOpacity: 1, endOpacity: 0},
            {grow: 1, order: 3, offset: 0, color: '#67CAF4', startOpacity: 1, endOpacity: 0},
            {grow: 1, order: 4, offset: 0, color: '#F2A172', startOpacity: 1, endOpacity: 0},
            {grow: 1, order: 5, offset: 0, color: '#0F1A23', startOpacity: 1, endOpacity: 0}
          ]
        },
        {
          name: 'octave2',
          config: {
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'flex-start'
          },
          styles: [
            {grow: 1, order: 1, offset: 0, color: '#CE5814', startOpacity: 1, endOpacity: 0},
            {grow: 1, order: 2, offset: 0, color: '#72F2C2', startOpacity: 1, endOpacity: 0},
            {grow: 1, order: 3, offset: 0, color: '#A472F2', startOpacity: 1, endOpacity: 0},
            {grow: 1, order: 4, offset: 0, color: '#E4F272', startOpacity: 1, endOpacity: 0},
            {grow: 1, order: 5, offset: 0, color: '#C7F272', startOpacity: 1, endOpacity: 0}
          ]
        },
      ],
      transitions: {
        in: 1,
        out: 3
      },
      active: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
      }
    }
  },
  watch: {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.octaveConfig {
  z-index: 1;
  display: block;

  label {
    display: inline-block;
  }
}

.colorFilter {
  z-index: -1;
}
</style>
