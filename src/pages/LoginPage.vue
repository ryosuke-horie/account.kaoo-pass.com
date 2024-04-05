<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "../fooks/useAuth";
import type { AxiosError } from "axios";

const visible = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter();
const { login } = useAuth();
const emailError = ref("");
const passwordError = ref("");
const loginError = ref("");

interface ErrorResponse {
  error: string;
}

const handleLogin = async () => {
  emailError.value = "";
  passwordError.value = "";
  loginError.value = "";

  if (!email.value) {
    emailError.value = "必須項目です";
  }
  if (!password.value) {
    passwordError.value = "必須項目です";
  }

  if (email.value && password.value) {
    try {
      await login({ email: email.value, password: password.value });
      router.push("/dashboard");
    } catch (error) {
        console.log("Error:", error);
        console.log("Error response:", (error as AxiosError).response);
        console.log("Error response data:", (error as AxiosError<ErrorResponse>).response?.data);

        if (
          (error as AxiosError).response &&
          (error as AxiosError<ErrorResponse>).response?.data
        ) {
          loginError.value = "認証に失敗しました。メールアドレス・パスワードを確認してください。";
        } else {
          console.error("Login failed:", error);
        }
    }
  }
};
</script>

<template>
  <div>
    <v-card
      class="mx-auto my-16 pa-12 pb-8 d-flex flex-column justify-center"
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
        メールアドレス
      </div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        :error-messages="emailError"
      />

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        パスワード
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        :error-messages="passwordError"
        @click:append-inner="visible = !visible"
      />

      <v-alert
        v-if="loginError"
        type="error"
        class="mb-8"
      >
        {{ loginError }}
      </v-alert>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          ログイン情報がわからなくなった場合はお手数ですがお問い合わせからご連絡ください。
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
