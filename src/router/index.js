import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../views/home'
import viewToday from '../views/viewToday.vue'
import viewPending from '../views/viewPending.vue'
import viewHistory from '../views/viewHistory.vue'
import viewInfo from '../views/info.vue'
Vue.use(VueRouter)

const routes = [
  // citas hoy
  {
    path: `/`,
    name: 'viewToday',
    component:viewToday
  },
  // añadir
  {
    path:'/add',
    name:'App',
    component:App
  },
  // citas pendientes
  {
    path:'/cp',
    name:'viewPending',
    component:viewPending
  },
  // Historial
  {
    path:'/history',
    name:'viewHistory',
    component: viewHistory
  },
  //info
  {
    path:'/citaInfo/:dat',
    name:'citaInfo',
    component:viewInfo
  } 
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
