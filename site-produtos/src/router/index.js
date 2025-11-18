import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Login from '@/views/Login.vue'
import Produtos from '@/views/Produtos.vue'


const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path:'/produtos',
    name:'Produtos',
    component: Produtos,
    meta: { requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next)=>{
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if(to.meta.requiresAuth && !isAuthenticated){
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated){
    next('/produtos')
  }else{
    next()
  }
})

export default router
