import App from './App'
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import toast from '@/common/utils/toast'
import store from './store'
import ScrollTolower from '@/components/scroll-tolower/index.vue'
import moment from 'moment'

Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.prototype.$toast = toast
Vue.prototype.$moment = moment

Vue.component('ScrollTolower', ScrollTolower)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
