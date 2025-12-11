<template>
  <div class="login-page">
    <div class="overlay">
      <form class="login-box" @submit.prevent="submit">
        <h2>Entrar</h2>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          v-model="senha"
          type="password"
          placeholder="Senha"
          required
        />

        <div class="btn-row">
          <button type="submit" class="btn-primary">Entrar</button>
          <button type="button" class="btn-secondary" @click="fillAdmin">
            Usar admin
          </button>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <div class="attribution">
        Imagem de fundo: A Nascença de Vênus – Botticelli (Domínio Público)
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const senha = ref("");
const error = ref(null);

const auth = useAuthStore();
const router = useRouter();

async function submit() {
  error.value = null;

  const ok = await auth.login(email.value, senha.value);

  if (!ok) {
    error.value = "Email ou senha incorretos.";
    return;
  }

  router.push("/");
}

function fillAdmin() {
  email.value = "admin@bibliotech.com";
  senha.value = "Admin@123";
}
</script>

<style scoped>
/* —————————————— */
/* Fundo e overlay */
/* —————————————— */
.login-page {
  min-height: 100vh;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1200px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg');
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

/* —————————————— */
/* Card de login */
/* —————————————— */
.login-box {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  padding: 26px;
  border-radius: 10px;
  width: 330px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 14px;
  font-weight: 600;
}

/* —————————————— */
/* Inputs */
/* —————————————— */
.login-box input {
  padding: 10px 12px;
  margin: 7px 0;
  border: 1px solid #bbb;
  border-radius: 6px;
  transition: 0.2s;
  font-size: 14px;
}

.login-box input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

/* —————————————— */
/* Botões */
/* —————————————— */
.btn-row {
  display: flex;
  gap: 8px;
  margin-top: 15px;
}

.btn-primary {
  flex: 1;
  padding: 8px 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  flex: 1;
  padding: 8px 10px;
  background: #64748b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}

.btn-secondary:hover {
  background: #475569;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}

.attribution {
  color: #eee;
  margin-top: 14px;
  font-size: 12px;
}
</style>
