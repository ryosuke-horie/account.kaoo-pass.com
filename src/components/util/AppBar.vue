<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
})
</script>

<template>
  <v-app-bar
    dark
    app
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-app-bar>
</template>
