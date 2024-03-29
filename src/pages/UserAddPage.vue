<script setup>
import { ref } from 'vue'
import TextInput from '../components/Form/TextInput.vue'
import FileInput from '../components/Form/FileInput.vue'

// 氏名
const name = ref('') // 氏名
const nameRule = [
  value => {
    if (value) return true
    return '必須項目です。'
  },
]

// 画像
const avatarImage = ref(null)
</script>

<template>
  <v-sheet
    class="mx-auto"
    width="500"
  >
    <v-form @submit.prevent>
      <TextInput
        v-model="name"
        :rules="nameRule"
        label="氏名"
      />
      <FileInput
        v-model="avatarImage"
        accept="image/*"
        label="顔写真1"
      />
      <v-btn
        class="mt-2"
        type="submit"
        block
      >
        Submit
      </v-btn>
    </v-form>
  </v-sheet>
</template>
