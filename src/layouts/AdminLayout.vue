<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="｛ジム名｝ 会員管理" />

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="ナビゲーションメニューを記載する場所" />
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
