<script setup>
import AppBar from '../../components/util/AppBar.vue'
import axios from 'axios';
import { ref } from 'vue';

const error = ref(null);

const redirectToStripeToCreateAccount = async () => {
    try {
        const response = await axios.get('https://api.kaoo-pass.com/api/stripe/create', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.onboarding_url) {
            window.location.href = response.data.onboarding_url;
        } else {
            error.value = 'リダイレクトURLが取得できませんでした';
        }
    } catch (err) {
        console.error(err);
        error.value = 'アカウント作成リクエストに失敗しました';
    }
};
</script>

<template>
  <AppBar title="Stripe決済用アカウント作成" />
  <v-col cols="auto">
    <v-btn
      size="x-large"
      @click="redirectToStripeToCreateAccount()"
    >
      アカウントを作成する
    </v-btn>
    <v-alert
      v-if="error"
      type="error"
    >
      {{ error }}
    </v-alert>
  </v-col>
</template>
