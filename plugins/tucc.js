import uccBox from './ucc.vue'

export default {
	install (Vue, defaultOptions = {}) {
		const CONSTRUCTOR = Vue.extend(uccBox)
		Object.assign(uccBox.DEFAULT_OPT, defaultOptions)

		function ucc (options = {}) {
			let ucc = new CONSTRUCTOR()
			if (!ucc.$el) { 
				let vm = ucc.$mount()
				document.querySelector('body').appendChild(vm.$el)
			}
			ucc.option = options
		}

		Vue.ucc = Vue.prototype.$ucc = ucc
	}
}
