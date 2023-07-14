import { defineStore } from "pinia";
import apiClient from "../services/api";
import { useRouter } from "vue-router";

const router = useRouter();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false
  }),
  actions: {
    setToken(token) {
      this.token = token;
      this.isAuthenticated = true;
    },
    clearToken() {
      this.token = null;
      this.isAuthenticated = false;
    },
    async login(credentials) {
      const response = await apiClient.post('/login', JSON.stringify(credentials));
      // console.log(response);
      const token  = response.headers.authorization
      this.setToken(token);
      localStorage.setItem('token', token);
      return true;
    }
  }

})