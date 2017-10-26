<template>
	<main>
		<h1>BETTER!</h1>
		<!-- <pre>{{$foo}}</pre> -->
	</main>
</template>

<script>
import Vue from 'vue'
import tucc from '../plugins/tucc'
Vue.use(tucc)

export default {

  name: 'test',

  data () {
    return {

    }
  },
  mounted () {
    console.log(this.options)
  	this.$ucc({title: 'PLOW', explanationText: 'chow chow'})
  }
}
</script>

<style lang="css" scoped>
</style>