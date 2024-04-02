<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
import AppBar from '../components/util/AppBar.vue'

const router = useRouter();
const products = ref([]);
const selectedProduct = ref(null);
const priceDialog = ref(false);
const price = ref(null);

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

// 価格設定
const setPrice = async () => {
  try {
    const token = localStorage.getItem('token')
    const url = 'https://api.kaoo-pass.com/api/stripe/prices'
    const data = {
      stripe_product_id: selectedProduct.value.stripe_product_id,
      price: price.value,
    }
    await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    alert('価格設定が完了しました。')
    priceDialog.value = false;
    price.value = null;
    await getProducts(); // 商品一覧を再取得
  } catch (error) {
    console.error(error)
    alert('価格設定に失敗しました。')
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
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            md="4"
          >
            <v-card @click="selectedProduct = product; priceDialog = true;">
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

    <v-dialog
      v-model="priceDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>価格設定</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="price"
            label="価格"
            type="number"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="setPrice"
          >
            設定
          </v-btn>
          <v-btn
            color="secondary"
            @click="priceDialog = false"
          >
            キャンセル
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
