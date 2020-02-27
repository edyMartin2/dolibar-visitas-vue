import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    change (count){
      state.count++
    }
  },
  actions: {
  },
  modules: {
  }
})
