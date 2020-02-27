import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'jquery'
import 'typicons.font/src/font/typicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
