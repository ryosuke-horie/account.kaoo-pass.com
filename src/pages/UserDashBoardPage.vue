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
        <td>
          <v-btn color="error" @click="confirmUnsubscribeUser(item)">退会</v-btn>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

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
    { title: '操作', key: 'actions', sortable: false },
]);

// 退会ボタンクリックで確認ダイアログを表示
const confirmUnsubscribeUser = (user) => {
    if (confirm(`${user.name}さんを退会させますか？`)) {
        unsubscribeUser(user);
    }
};

// ユーザー退会処理
const unsubscribeUser = async (user) => {
    try {
        const response = await axios.delete(`https://api.kaoo-pass.com/api/users/unsubscribe/${user.id}`, {
            headers: {
                'Authorization': 'Bearer ' + token.value
            }
        });
        alert('退会処理が完了しました。');
        await fetchUsers();
    } catch (error) {
        console.error(error);
        alert('退会処理に失敗しました。');
    }
};
</script>
