import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {requiresGuest: true}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
