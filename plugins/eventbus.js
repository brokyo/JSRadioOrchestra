import Vue from 'vue'
const eventBust = {}
eventBus.install = (Vue) => {
	Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)