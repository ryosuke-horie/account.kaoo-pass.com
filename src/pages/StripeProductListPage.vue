<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import AppBar from '../components/util/AppBar.vue'

const router = useRouter();
const products = ref([]);

// 商品一覧取得
const getProducts = async () => {
  try {
    const token = localStorage.getItem('token')
    const url = 'https://api.kaoo-pass.com/api/stripe/products'
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    products.value = response.data.products;
  } catch (error) {
    console.error(error)
    alert('商品一覧の取得に失敗しました。')
  }
}

onMounted(() => {
  getProducts();
});
</script>

<template>
  <v-app>
    <AppBar title="Stripe商品一覧" />

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="product in products" :key="product.id" cols="12" md="4">
            <v-card>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-text>
                <p>価格: {{ product.price }}</p>
                <p>説明: {{ product.description }}</p>
                <p>ステータス: {{ product.is_active ? 'アクティブ' : '非アクティブ' }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
