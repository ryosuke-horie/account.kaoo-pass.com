<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../fooks/useAuth'

const visible = ref(false)
const email = ref('')
const password = ref('')
const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
  try {
    await login({ email: email.value, password: password.value })
    // ログイン成功後、Topページにリダイレクト
    router.push('/')
  } catch (error) {
    // エラーハンドリング
    console.error('Login failed:', error)
    // 適切なエラーメッセージを表示
  }
}
</script>

<template>
  <div>
    <v-card
      class="mx-auto my-16 pa-12 pb-8 d-flex flex-column  justify-center"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <img
        class="mx-auto"
        alt="logo"
        src="../assets/logo_260x80.webp"
      >

      <div class="text-subtitle-1 text-medium-emphasis">
        アカウント
      </div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      />

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        パスワード

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          パスワードを忘れましたか?</a>
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="handleLogin"
      >
        ログイン
      </v-btn>
    </v-card>
  </div>
</template>
