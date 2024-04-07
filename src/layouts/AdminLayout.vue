<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../fooks/useAuth';

const router = useRouter();
const { logout } = useAuth();

// サイドバーの開閉状態管理
const drawer = ref(true);

// サイドバー内のメニューの開閉状態管理
const open = ref(['Authentication', 'UserManagement', 'Payment', 'Others']);

// 認証関連のメニュー
const userManagementItems = ref([
  ['会員一覧', 'mdi-account-multiple', '/dashboard'],
  ['会員登録', 'mdi-account-plus', '/user/add'],
]);

// 決済関連のメニュー
const paymentItems = ref([
  ['Stripe決済用アカウント作成', 'mdi-credit-card-plus', '/stripe/create'],
  ['Stripe商品作成', 'mdi-cart-plus', '/stripe/create/products'],
  ['Stripe商品一覧', 'mdi-format-list-bulleted', '/stripe/products'],
]);

// その他のメニュー
const otherItems = ref([
  ['利用規約', 'mdi-file-document', '/term'],
  ['プライバシーポリシー', 'mdi-shield-lock', '/privacy'],
  ['お問い合わせ', 'mdi-email', '/contact'],
]);

// ログアウトの処理
const handleLogout = async () => {
    try {
        // tokenをローカルストレージから削除する
        await logout();
        // ログイン画面に遷移
        router.push('/login');
    } catch (error) {
        // エラーハンドリング
        console.error('Logout failed:', error);
    }
};
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <img
        src="../assets/logo_150x50.webp"
        alt="logo"
        height="50"
      >
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="true"
      :mini-variant="!drawer"
      :expand-on-hover="!drawer"
      width="400"
    >
      <v-list
        v-model:opened="open"
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="mdi-home"
          title="メニュー"
        />

        <v-list-group value="Authentication">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              title="認証"
            />
          </template>

          <v-list-item
            prepend-icon="mdi-login"
            title="ログイン"
            to="/login"
          />
          <v-list-item
            prepend-icon="mdi-logout"
            title="ログアウト"
            @click="handleLogout"
          />
        </v-list-group>

        <v-list-group value="UserManagement">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-group"
              title="会員管理"
            />
          </template>

          <v-list-item
            v-for="([title, icon, path], i) in userManagementItems"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
            :to="path"
          />
        </v-list-group>

        <v-list-group value="Payment">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-credit-card"
              title="決済関連"
            />
          </template>

          <v-list-item
            v-for="([title, icon, path], i) in paymentItems"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
            :to="path"
          />
        </v-list-group>

        <v-list-group value="Others">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-dots-horizontal"
              title="その他"
            />
          </template>

          <v-list-item
            v-for="([title, icon, path], i) in otherItems"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
            :to="path"
          />
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px;"
    >
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
