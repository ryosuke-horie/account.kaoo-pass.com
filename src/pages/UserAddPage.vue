<script setup>
import { ref, watch } from 'vue'
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

// フォームの値を登録するsubmitアクション
// すべて必須項目
const submitForm = async () => {
  // フォームの値をオブジェクトにまとめる
  const formData = {
    name: name.value,
    mail: mail.value,
    phone: phone.value,
    avatarImage: avatarImage.value,
    image2: image2.value,
    image3: image3.value,
  }

  // 空の値がある場合はアラートを表示して処理を中断する
  if (!formData.name || !formData.mail || !formData.phone || !formData.avatarImage || !formData.image2 || !formData.image3) {
      alert('すべての項目を入力してください。')
      return
  }

  try {
    // TODO:サーバーにデータを送信する処理を実装する
    // const response = await axios.post('/api/register', formData)

    // 送信が成功した場合はアラートを表示する
    alert('会員登録が完了しました。')

    // フォームの値をリセットする
    name.value = ''
    mail.value = ''
    phone.value = ''
    avatarImage.value = null
    image2.value = null
    image3.value = null
  } catch (error) {
    // エラーハンドリングを行う
    console.error(error)
    alert('会員登録に失敗しました。')
  }
}
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
      <v-form @submit.prevent="submitForm">
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
