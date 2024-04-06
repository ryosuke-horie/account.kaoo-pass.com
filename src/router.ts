import { createRouter, createWebHistory } from "vue-router";
import useAuth from "./fooks/useAuth";

import LoginPage               from "./pages/LoginPage.vue";
import TopPage                 from "./pages/TopPage.vue";
import UserAddPage             from "./pages/UserAddPage.vue";
import UserDashBoardPage       from "./pages/UserDashBoardPage.vue";
import UserDetailpage          from "./pages/UserDetailpage.vue";
import UserEditPage            from "./pages/UserEditPage.vue";
import TermsPage               from "./pages/TermsPage.vue";
import PrivacyPolocy           from "./pages/PrivacyPolocy.vue";
import ContactPage             from "./pages/ContactPage.vue";

// Stripe関連
import StripeCreatePage        from "./pages/stripe/StripeCreatePage.vue";
import StripeCreateProductPage from "./pages/stripe/StripeCreateProductPage.vue";
import StripeProductListPage   from "./pages/stripe/StripeProductListPage.vue";

const routes = [
  { path: "/", name: "Top", component: TopPage, meta: { requiresAuth: true } },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/term", name: "Term", component: TermsPage },
  { path: "/contact", name: "Contact", component: ContactPage },
  { path: "/privacy", name: "Privacy", component: PrivacyPolocy },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: UserDashBoardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/add",
    name: "UserAdd",
    component: UserAddPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    component: UserDetailpage,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/:id/edit",
    name: "UserEdit",
    component: UserEditPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/stripe/create",
    name: "Stripe",
    component: StripeCreatePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/stripe/create/products",
    name: "StripeProduct",
    component: StripeCreateProductPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/stripe/products",
    name: "StripeProductList",
    component: StripeProductListPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// グローバルビフォーガード
// ルート遷移前に実行され、未ログインならログインページにリダイレクト
router.beforeEach((to, _from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // ログイン状態をチェック
    if (!isAuthenticated.value) {
      // ログインしていない場合、ログインページにリダイレクト
      next({ path: "/login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
