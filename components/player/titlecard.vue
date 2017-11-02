 <template>
 	<transition name="fade">
 		<main>
	 		<h1>{{card.title}}</h1>
	 		<h4>[{{card.creator}}]</h4>
	 	</main>
	 </transition>
 </template>

 <script>
 export default {

   name: 'titlecard',
   computed: {
   	card () { return this.$store.state.meta }
   },
   mounted () {
    console.log('hey')
   }
 }
 </script>

 <style lang="scss" scoped>
	main {
		background: black;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
    z-index: 9999;
	}

	h1 {
		font-size: 88px;
		color: white;
	}

	h4 {
		color: white;
	}

	/*Fade Params*/
	.fade-enter  {
	  opacity: 0
	}
	.fade-enter-to {
		opacity: 1;
	}
	.fade-leave  {
	  opacity: 1
	}
	.fade-leave-to {
		opacity: 0;
	}
	.fade-leave-active {
	  transition: opacity 5s
	}

 </style>
