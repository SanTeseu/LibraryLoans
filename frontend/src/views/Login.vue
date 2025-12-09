<template>
  <div class="login-page">
    <div class="overlay">
      <form class="login-box" @submit.prevent="submit">
        <h2>Entrar</h2>
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="senha" type="password" placeholder="Senha" required />
        <div style="display: flex; gap: 8px; margin-top: 12px">
          <button type="submit">Entrar</button>
          <button type="button" @click="fillAdmin">Usar admin</button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <div class="attribution">
        Imagem de fundo: Afrodite (dominio público) - Michelangelo
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
export default {
  data() {
    return { email: "", senha: "", error: null };
  },
  methods: {
    async submit() {
      this.error = null;
      try {
        const r = await api.post("/auth/login", {
          email: this.email,
          senha: this.senha,
        });
        localStorage.setItem("token", r.data.token);
        this.$userState.token = r.data.token;
        this.$router.push("/");
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro";
      }
    },
    fillAdmin() {
      this.email = "admin@bibliotech.com";
      this.senha = "Admin@123";
    },
  },
};
</script>
<style scoped>
.login-page {
  min-height: 100vh;
  background-image: url('https://institutofreedom.com.br/blog/wp-content/uploads/2019/04/2017-03-09-2.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay {
  background: rgba(0, 0, 0, 0.45);
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.login-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 24px;
  border-radius: 8px;
  width: 320px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}
.login-box h2 {
  margin: 0 0 12px 0;
  text-align: center;
}
.login-box input {
  padding: 8px 10px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login-box button {
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 8px;
  text-align: center;
}
.attribution {
  color: #ddd;
  margin-top: 12px;
  font-size: 12px;
}
</style>
