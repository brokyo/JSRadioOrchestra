<template>
  <div class="container">
    <div class="bands" v-for="octave in layout" :style="octave.config">
      <div v-for="(band, index) in octave.bands" :style="[band.base, active[band.index] ? band.transitionIn : band.transitionOut]"></div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'colorfilterfinal',
  props: ['layout', 'active'],
  data () {
    return {
    }
  },
  mounted: function () {
    console.log(this.layout)
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  min-height: 100vh;
  min-width: 100vw;
}

.bands {
  position: fixed;
  top: 0;
  height: 100vh;
  min-width: 100vw;

}
</style>
