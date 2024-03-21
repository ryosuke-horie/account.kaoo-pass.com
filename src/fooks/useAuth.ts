import { ref, computed } from 'vue';
import axios, { AxiosError } from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const backend = 'https://api.kaoo-pass.com'
// ログインAPIのURL
const loginUrl = `${backend}/api/login`

export default function useAuth() {
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: LoginCredentials) {
    try {
      const response = await axios.post<LoginResponse>(loginUrl, credentials);
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
      user.value = response.data.user;
    } catch (error) {
      if (error instanceof AxiosError) {
        // AxiosError型のエラーハンドリング
        console.error('Login failed:', error.message);
      } else {
        // その他のエラーハンドリング
        console.error('Login failed:', error);
      }
      throw error;
    }
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('token');
    user.value = null;
  }

  // ユーザー情報を取得する
  async function fetchUser() {
    if (token.value) {
      try {
        const response = await axios.get<User>('/api/user', {
          headers: { Authorization: `Bearer ${token.value}` },
        });
        user.value = response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          // AxiosError型のエラーハンドリング
          console.error('Fetch user failed:', error.message);
        } else {
          // その他のエラーハンドリング
          console.error('Fetch user failed:', error);
        }
        throw error;
      }
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  };
}
