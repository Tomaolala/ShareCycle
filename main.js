import App from './App'
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import toast from '@/common/utils/toast'

Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.prototype.$toast = toast

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
