import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null,
  }),

  actions: {
    login(token) {
      this.token = token;
      this.user = jwtDecode(token);
      localStorage.setItem("token", token);
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
  },
});