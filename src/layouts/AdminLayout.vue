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
        <router-link to="/login">
            ログイン
        </router-link>

        <router-link to="/logout">
            ログアウト
        </router-link>

        <v-list-item title="会員管理">
          <router-link to="/dashboard">
            会員一覧
          </router-link>
        </v-list-item>

        <v-list-item title="その他">
          <router-link to="/term">
            利用規約
          </router-link>
          <router-link to="/privacy">
            プライバシーポリシー
          </router-link>
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
