<script setup lang="ts">
import AdminLayout from './layouts/AdminLayout.vue';
</script>

<template>
  <AdminLayout>
    <!-- この中でコンテンツを表示します -->
    <router-view />
  </AdminLayout>
</template>
