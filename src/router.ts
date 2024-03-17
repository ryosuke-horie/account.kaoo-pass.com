import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import LogoutPage from './pages/LogoutPage.vue'
import TopPage from './pages/TopPage.vue'
import UserDashBoardPage from './pages/UserDashBoardPage.vue'
import UserDetailpage from './pages/UserDetailpage.vue'
import UserEditPage from './pages/UserEditPage.vue'
import TermsPage from './pages/TermsPage.vue'
import PrivacyPolocy from './pages/PrivacyPolocy.vue'
import ContactPage from './pages/ContactPage.vue'

const routes = [
  { path: '/', name: 'Top', component: TopPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/logout', name: 'Logout', component: LogoutPage },
  { path: '/term', name: 'Term', component: TermsPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/privacy', name: 'Privacy', component: PrivacyPolocy },
  { path: '/dashboard', name: 'Dashboard', component: UserDashBoardPage },
  { path: '/user/:id', name: 'UserDetail', component: UserDetailpage },
  { path: '/user/:id/edit', name: 'UserEdit', component: UserEditPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
