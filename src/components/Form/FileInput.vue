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
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const onFileChange = (files) => {
  emit('update:modelValue', files)
}
</script>

<template>
  <v-file-input
    :model-value="modelValue"
    :accept="accept"
    :label="label"
    chips
    @update:model-value="onFileChange"
  />
</template>
