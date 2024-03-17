<script setup lang="ts">
import AdminLayout from './layouts/AdminLayout.vue';
</script>

<template>
    <AdminLayout>
        この中でコンテンツを表示します
    </AdminLayout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
