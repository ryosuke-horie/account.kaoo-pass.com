<script setup>
const props = defineProps({
    title: {
        type: String,
    },
})
</script>

<template>
    <v-app-bar dark app>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
</template>
