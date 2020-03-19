import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'jquery'
import 'ant-design-vue/dist/antd.css'; 
import 'typicons.font/src/font/typicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import router from './router'
import './assets/css/style.css'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
