import { defineStore } from "pinia";
import api from "../api";
import { jwtDecode } from "jwt-decode"; // ← IMPORT CORRETO

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    initialized: false,
  }),

  actions: {
    async login(email, senha) {
      try {
        const r = await api.post("/auth/login", { email, senha });

        this.token = r.data.token;
        localStorage.setItem("token", this.token);

        this.user = jwtDecode(this.token); // corrigido
        this.initialized = true;

        return true;
      } catch (error) {
        console.error("Erro no login:", error);
        return false;
      }
    },

    loadUserFromToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        this.initialized = true;
        return;
      }

      try {
        this.user = jwtDecode(token); // corrigido
        this.token = token;
      } catch (e) {
        console.error("Token inválido, deslogando…");
        this.logout();
      } finally {
        this.initialized = true;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      this.initialized = true;
    },
  },
});
