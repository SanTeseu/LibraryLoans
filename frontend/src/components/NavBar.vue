<template>
  <nav class="navbar">
    <div class="logo">
      <span class="logo-text">BiblioTech</span>
    </div>

    <div class="links">
      <router-link to="/" class="nav-item">Livros</router-link>
      <router-link to="/membros" class="nav-item">Membros</router-link>
      <router-link to="/emprestimos" class="nav-item">Empréstimos</router-link>

      <router-link v-if="isAdmin" to="/funcionarios" class="nav-item">Funcionários</router-link>

      <button class="btn btn-logout" @click="onLogout">Sair</button>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = useAuthStore();
    const router = useRouter();

    function onLogout() {
      auth.logout();
      router.push("/login");
    }

    const isAdmin = () => {
      // backend usa "role" no model, mas token pode ter "perfil" ou "role"
      return (auth.user && (auth.user.perfil === "admin" || auth.user.role === "admin"));
    };

    return { auth, onLogout, isAdmin };
  }
};
</script>

<style scoped>
.logo-text {
  font-weight: 700;
  font-size: 20px;
}

.links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-logout {
  background: #13263f;
  color: white;
  padding: 7px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
