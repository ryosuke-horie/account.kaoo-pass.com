<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import useAuth from '../fooks/useAuth'

const users = ref([]);
const { token, fetchUser } = useAuth();

// APIからデータを取得する
const fetchUsers = async () => {
    try {
        const response = await axios.get('https://api.kaoo-pass.com/api/users', {
            headers: {
                'Authorization': 'Bearer ' + token.value
            }
        });
        users.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    await fetchUsers(); // ユーザー一覧を取得
});

const headers = ref([
    { title: '写真', key: 'avatar_iamge' },
    {
        title: '名前',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    { title: '年齢', key: 'age' },
    { title: 'メールアドレス', key: 'email' },
    { title: '電話番号', key: 'phone' },
    { title: '住所', key: 'address' },
]);
</script>

<template>
  <v-data-table-virtual
    :headers="headers"
    :items="users"
    item-value="name"
  >
    <template #item="{ item }">
      <tr>
        <v-avatar>
          <v-img :src="item.avatar_image" />
        </v-avatar>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<style scoped>
.avatar {
    width: 50px;
    height: 50px;
    border-radius: 20%;
}
</style>
