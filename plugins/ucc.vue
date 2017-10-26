<template>
	<main id="uccBox">
		<div v-if="min">
			<h1>ima lil guy</h1>
		</div>
		<div v-else>
			<h1>ful size fuckas</h1>
			<pre>{{mergedOptions}}</pre>
		</div>
	</main>
</template>

<script>
const DEFAULT_OPT = {
	id: 'uccBox',
	comments: true,
	explanation: true,
	explanationText: 'Hi',
	title: ''
}

export default {
	DEFAULT_OPT: DEFAULT_OPT,
	data () {
		return {
			option: {},
			min: false
		}
	},
	computed: {
		mergedOptions: function () {
			return Object.assign({}, DEFAULT_OPT, this.option)
		}
	},
	mounted () {
		console.log(this.option)
	}
}
</script>

<style lang="css" scoped>
#uccBox {
	position: absolute;
	bottom: 0;
}
</style>