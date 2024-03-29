<script setup>
import { ref } from 'vue'

const props = defineProps({
  accept: {
    type: String,
    default: '*',
  },
  label: {
    type: String,
    default: 'File input',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedFiles = ref(null)

const onFileChange = (files) => {
  emit('update:modelValue', files)
}
</script>

<template>
  <v-file-input
    :modelValue="selectedFiles"
    @update:modelValue="onFileChange"
    :accept="accept"
    :label="label"
    :multiple="multiple"
    chips
  ></v-file-input>
</template>
