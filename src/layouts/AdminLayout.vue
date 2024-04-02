<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '../fooks/useAuth';

const router = useRouter();
const { logout } = useAuth();

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
      <img
        src="../assets/logo_150x50.webp"
        alt="logo"
        height="50"
      >
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="認証">
          <router-link to="/login">
            ログイン
          </router-link>
          <br>
          <a
            class="text-decoration-underline"
            @click="handleLogout"
          >
            ログアウト
          </a>
        </v-list-item>

        <v-list-item title="会員管理">
          <router-link to="/dashboard">
            会員一覧
          </router-link>
          <br>
          <router-link to="/user/add">
            会員登録
          </router-link>
        </v-list-item>

        <v-list-item title="決済関連">
          <router-link to="/stripe/create">
            Stripe決済用アカウント作成
          </router-link>
          <br>
          <router-link to="/stripe/create/products">
            Stripe商品作成
          </router-link>
        </v-list-item>

        <v-list-item title="その他">
          <router-link to="/term">
            利用規約
          </router-link>
          <br>
          <router-link to="/privacy">
            プライバシーポリシー
          </router-link>
          <br>
          <router-link to="/contact">
            お問い合わせ
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px;"
    >
      <slot />
    </v-main>
  </v-layout>
</template>
