<script setup>
import { ref } from 'vue'
import TextInput from '../components/Form/TextInput.vue'
import FileInput from '../components/Form/FileInput.vue'

// 必須項目チェックのルール
const requreRule = [
  value => {
    if (value) return true
    return '必須項目です。'
  },
]

// ユーザー情報 Input要素の値
const name = ref('') // 氏名
const mail = ref('') // メールアドレス
const phone = ref('') // 電話番号

// 画像
const avatarImage = ref(null)
const image2 = ref(null)
const image3 = ref(null)
</script>

<template>
  <v-app-bar
    dark
    app
  >
    <v-toolbar-title>会員登録</v-toolbar-title>
  </v-app-bar>
  <v-container>
    <v-sheet
      class="mx-auto"
      width="500"
    >
      <v-form @submit.prevent>
        <TextInput
          v-model="name"
          :rules="requreRule"
          label="氏名"
        />
        <TextInput
          v-model="mail"
          :rules="requreRule"
          label="メールアドレス"
        />
        <TextInput
          v-model="phone"
          :rules="requreRule"
          label="電話番号"
        />

        <FileInput
          v-model="avatarImage"
          accept="image/*"
          label="顔写真1"
        />
        <FileInput
          v-model="image2"
          accept="image/*"
          label="顔写真2"
        />
        <FileInput
          v-model="image3"
          accept="image/*"
          label="顔写真3"
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
  </v-container>
</template>
