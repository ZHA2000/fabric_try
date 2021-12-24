import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    redirect: 'fabric'
  },
  {
    path: '/fabric',
    name: 'fabric',
    component: () => import(/* webpackChunkName: "fabric" */ '@/views/fabric/index.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
