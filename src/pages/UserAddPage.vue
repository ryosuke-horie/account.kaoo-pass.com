<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import TextInput from '../components/Form/TextInput.vue'
import FileInput from '../components/Form/FileInput.vue'

const router = useRouter();

// 必須項目チェックのルール
const requreRule = [
  value => {
    if (value) return true
    return '必須項目です。'
  },
]

// ユーザー情報 Input要素の値
const name = ref('') // 氏名
const email = ref('') // メールアドレス
const phone = ref('') // 電話番号
const age = ref(0) // 年齢
const address = ref('') // 住所

// 画像
const avatar_image = ref(null)
const image2 = ref(null)
const image3 = ref(null)

// フォームの値を登録するsubmitアクション
// すべて必須項目
const submitForm = async () => {
  // FormDataオブジェクトを作成
  const formData = new FormData()

  // FormDataオブジェクトに値を集約
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('phone', phone.value)
  formData.append('age', age.value)
  formData.append('address', address.value)
  if (avatar_image.value && avatar_image.value.length > 0) {
    formData.append('avatar_image', avatar_image.value[0])
  }
  if (image2.value && image2.value.length > 0) {
    formData.append('image2', image2.value[0])
  }
  if (image3.value && image3.value.length > 0) {
    formData.append('image3', image3.value[0])
  }

  if (!name.value || !email.value || !phone.value || !age.value || !address.value || !avatar_image.value || !image2.value || !image3.value) {
    alert('すべての項目を入力してください。')
    return
  }

  try {
    const token = localStorage.getItem('token')
    const url = 'https://api.kaoo-pass.com/api/users'
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    alert('会員登録が完了しました。')

    name.value = ''
    email.value = ''
    phone.value = ''
    age.value = 0
    address.value = ''
    avatar_image.value = null
    image2.value = null
    image3.value = null

    // 会員一覧画面に遷移
    router.push('/dashboard');
  } catch (error) {
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
          v-model="email"
          :rules="requreRule"
          label="メールアドレス"
        />
        <TextInput
          v-model="phone"
          :rules="requreRule"
          label="電話番号"
        />
        <TextInput
          v-model="age"
          :rules="requreRule"
          label="年齢"
        />
        <TextInput
          v-model="address"
          :rules="requreRule"
          label="住所"
        />

        <FileInput
          v-model="avatar_image"
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
