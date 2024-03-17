import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from './pages/AdminLogin.vue'

const routes = [
  { path: '/login', name: 'Login', component: AdminLogin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
