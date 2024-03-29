import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import useAuth from './useAuth';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

// ユーザー情報を取得する
// const { fetchUser } = useAuth();
// fetchUser();

createApp(App).use(router).use(vuetify).mount('#app')
