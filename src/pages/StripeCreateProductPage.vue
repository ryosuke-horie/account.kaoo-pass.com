<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import AppBar from '../components/util/AppBar.vue'
import TextInput from '../components/Form/TextInput.vue'

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
const description = ref('') // 商品説明

// すべて必須項目
const submitForm = async () => {
  // FormDataオブジェクトを作成
  const formData = new FormData()

  // FormDataオブジェクトに値を集約
  formData.append('name', name.value)
  formData.append('description', description.value)

  if (!name.value) {
    alert('すべての項目を入力してください。')
    return
  }

  try {
    const token = localStorage.getItem('token')
    const url = 'https://api.kaoo-pass.com/api/stripe/products'
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    alert('商品登録が完了しました。')

    name.value = ''
    description.value = ''

    // 会員一覧画面に遷移
    router.push('/stripe/products');
  } catch (error) {
    console.error(error)
    alert('商品登録に失敗しました。すべての項目が入力されていることをご確認ください。解決しない場合はお問い合わせください。')
  }
}
</script>

<template>
  <AppBar title="Stripe商品作成" />
  <v-container>
    <v-sheet
      class="mx-auto"
      width="500"
    >
      <v-form @submit.prevent="submitForm">
        <TextInput
          v-model="name"
          :rules="requreRule"
          label="商品名"
        />
        <TextInput
          v-model="description"
          :rules="requreRule"
          label="商品説明"
        />

        <v-btn
          class="mt-2"
          type="submit"
          block
        >
          登録する
        </v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>
