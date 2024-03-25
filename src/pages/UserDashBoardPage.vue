<script setup>
import { ref } from 'vue';

// @see https://vuetifyjs.com/en/components/data-tables/virtual-tables/#basic-example
// Data table - Virtual tablesを参照すること

const headers = ref([
  {
    title: '会員一覧',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: '年齢', key: 'age' },
  { title: '住所', key: 'address' },
  { title: 'メールアドレス', key: 'mail' },
  { title: '電話番号', key: 'phone' },
//   { title: '編集', key: 'edit' },
//   { title: '削除', key: 'delete' },
]);

const users = ref([
  {
    name: 'テストユーザー1',
    age: '20',
    address: 159,
    mail: 6.0,
    phone: 24,
  },
  {
    name: 'テストユーザー2',
    age: '20',
    address: 237,
    mail: 9.0,
    phone: 37,
  },
]);
</script>

<template>
  <v-data-table-virtual
    :headers="headers"
    :items="users"
    item-value="name"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.mail }}</td>
        <td>{{ item.phone }}</td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>
