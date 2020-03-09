import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../views/home'
import viewToday from '../views/viewToday.vue'
import viewPending from '../views/viewPending.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    name: 'viewToday',
    component:viewToday
  },
  {
    path:'/add',
    name:'App',
    component:App
  },
  {
    path:'/cp',
    name:'viewPending',
    component:viewPending
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
