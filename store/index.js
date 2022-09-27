import Vue from 'vue'
import Vuex from 'vuex'
import {
  login,
} from '@/common/api/user.js'

Vue.use(Vuex)

const clearMutations = ['SET_USERINFO'] //需要清除的缓存
const store = new Vuex.Store({
  state: {
    userInfo: '',
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    login({ commit }, LoginInfo) {
      const { userPhone, password } = LoginInfo
      return new Promise((resolve, reject) => {
        login({ userPhone, password })
          .then(response => {
            if (response.code != 200) {
              return reject(response.message)
            }
            const { data } = response
            commit('SET_USERINFO', data)
            resolve()
          })
          .catch(errors => {
            console.log(errors)
            reject('未知错误！')
          })
      })
    },
    logout({ dispatch }) {
      dispatch('clearStorage')
    },
    clearStorage({ commit }) {
      clearMutations.forEach((item) => commit(item, ''))
    },
  },
  getters: {
  },
})

export default store
