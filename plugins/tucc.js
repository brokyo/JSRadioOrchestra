import uccBox from './ucc.vue'

export default {
	install (Vue) {
		const CONSTRUCTOR = Vue.extend(uccBox)

		function ucc (config = {}) {
			let ucc = new CONSTRUCTOR()
			if (!ucc.$el) {
				let vm = ucc.$mount()
				document.querySelector('body').appendChild(vm.$el)
			}
			ucc.config = config
		}

		Vue.ucc = Vue.prototype.$ucc = ucc
	}
}
