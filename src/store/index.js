import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visit:'',
    hoster:'',
    together:'',
    idVisit:'',
    mailVisit:'',
    mailHost:''
  },
  mutations: {
    change (state,arg1){
      state.visit = arg1;
    },
    emailVisitChange(state, arg){
      state.mailVisit = arg;
    },
    idVisitChange(state, arg){
      state.idVisit = arg;
    },
    changeHoster(state, arg){
      state.hoster = arg;
    },
    emailHosterChange(state,arg){
      state.mailHost = arg;
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
