import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Planning from '../views/Planning.vue'
import Admin from '../views/Admin.vue'
import EmployeePage from '../views/EmployeePage.vue'
import Schedule from '../views/Schedule.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/planning',
    name: 'Planning',
    component: Planning
  },
  {
    path: '/employeePage',
    name: 'EmployeePage',
    component: EmployeePage
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
