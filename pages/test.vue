<template>
	<main>
		<h1>BETTER!</h1>
		<!-- <pre>{{$foo}}</pre> -->
    <!-- <pre>{{foo}}</pre> -->
	</main>
</template>

<script>
export default {

  name: 'test',

  data () {
    return {
      // foo: {}
    }
  },
  firebase: {
    foo: {
      source: this.$db.ref('musicboxes'),
      readyCallback: function () {
        console.log('hello')
      }
    }
  },
  mounted () {
    // this.foo = this.$db.ref('musicboxes/-KxFZ8QPcpWsEsdiRmha')
    // console.log(this.foo)
  }
}
</script>

<style lang="css" scoped>
</style>