<script setup>
import { ref } from 'vue'

const props = defineProps({
  rules: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: 'Input Field',
  },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref('')

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <v-text-field
    :modelValue="inputValue"
    @input="onInput"
    :rules="rules"
    :label="label"
  ></v-text-field>
</template>
