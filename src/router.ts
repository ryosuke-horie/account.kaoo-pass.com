import { createRouter, createWebHistory } from 'vue-router'
import useAuth from './useAuth';
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
  { path: '/', name: 'Top', component: TopPage, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/logout', name: 'Logout', component: LogoutPage, meta: { requiresAuth: true } },
  { path: '/term', name: 'Term', component: TermsPage, meta: { requiresAuth: true } },
  { path: '/contact', name: 'Contact', component: ContactPage, meta: { requiresAuth: true } },
  { path: '/privacy', name: 'Privacy', component: PrivacyPolocy, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: UserDashBoardPage, meta: { requiresAuth: true } },
  { path: '/user/:id', name: 'UserDetail', component: UserDetailpage, meta: { requiresAuth: true } },
  { path: '/user/:id/edit', name: 'UserEdit', component: UserEditPage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// グローバルビフォーガード
// ルート遷移前に実行され、未ログインならログインページにリダイレクト
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // ログイン状態をチェック
    if (!isAuthenticated.value) {
      // ログインしていない場合、ログインページにリダイレクト
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
