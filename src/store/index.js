import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visit:''
  },
  mutations: {
    change (state,arg){
      state.visit = arg
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getVisit: state =>{
       return state.visit
    }
  }
})
