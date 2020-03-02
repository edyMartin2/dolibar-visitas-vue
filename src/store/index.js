import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visit:'',
    hoster:'',
    together:''
  },
  mutations: {
    change (state,arg){
      state.visit = arg;
    },
    changeHoster(state, args){
      state.hoster = args;
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
