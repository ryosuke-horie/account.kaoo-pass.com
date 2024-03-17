<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
        <img src="../assets/logo_150x50.webp" alt="logo" height="50" />
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="ナビゲーションメニューを記載する場所" />
        <v-list-item>
          <router-link to="/login">
            ログイン
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
