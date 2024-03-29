<script setup>
import { ref } from 'vue'
import InputField from '../components/Form/TextInput.vue'

// 氏名
const name = ref('') // 氏名
const nameRule = [
  value => {
    if (value) return true
    return '必須項目です。'
  },
]


</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent>
      <InputField v-model="name" :rules="nameRule" label="氏名" />
      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>
