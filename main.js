import App from './App'
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import toast from '@/common/utils/toast'
import store from './store'
import useMqtt from '@/useMqtt/index.js'
import { resolve } from 'mqtt/dist/mqtt'
Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.prototype.$toast = toast
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({	
    ...App,
	store
})
app.$mount()
new useMqtt()

