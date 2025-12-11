<template>
  <div class="container">
    <h1>Registrar Empréstimo</h1>

    <form @submit.prevent="registrarEmprestimo">
      <!-- Selecionar aluno -->
      <label>Aluno:</label>
      <select v-model="form.aluno_id" required>
        <option disabled value="">Selecione um aluno</option>
        <option v-for="aluno in alunos" :key="aluno.id" :value="aluno.id">
          {{ aluno.nome }}
        </option>
      </select>

      <!-- Selecionar livro -->
      <label>Livro:</label>
      <select v-model="form.livro_id" required>
        <option disabled value="">Selecione um livro</option>
        <option v-for="livro in livros" :key="livro.id" :value="livro.id">
          {{ livro.titulo }}
        </option>
      </select>

      <!-- Data de empréstimo -->
      <label>Data de Empréstimo:</label>
      <input type="date" v-model="form.data_emprestimo" required />

      <!-- Data prevista devolução -->
      <label>Data prevista de devolução:</label>
      <input type="date" v-model="form.data_prevista" required />

      <button type="submit">Registrar</button>
    </form>

    <!-- Mensagens -->
    <p v-if="mensagem" :class="{ erro: erro }">{{ mensagem }}</p>
  </div>
</template>

<script>
import axios from "../axios";
import { useAuthStore } from "@/stores/auth";

export default {
  data() {
    return {
      alunos: [],
      livros: [],

      form: {
        aluno_id: "",
        livro_id: "",
        data_emprestimo: "",
        data_prevista: "",
      },

      mensagem: "",
      erro: false,
    };
  },

  async mounted() {
    this.carregarDados();

    const hoje = new Date().toISOString().split("T")[0];
    const devolucao = new Date();
    devolucao.setDate(devolucao.getDate() + 7);

    this.form.data_emprestimo = hoje;
    this.form.data_prevista = devolucao.toISOString().split("T")[0];
  },

  methods: {
    async carregarDados() {
      try {
        const token = localStorage.getItem("token");

        const [alunos, livros] = await Promise.all([
          axios.get("/alunos", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("/livros/disponiveis", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        this.alunos = alunos.data;
        this.livros = livros.data;

      } catch (error) {
        console.error(error);
        this.mensagem = "Erro ao carregar dados";
        this.erro = true;
      }
    },

    async registrarEmprestimo() {
      try {
        const token = localStorage.getItem("token");

        const r = await axios.post(
          "/emprestimos",
          this.form,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        this.mensagem = "Empréstimo registrado com sucesso!";
        this.erro = false;

        // limpar campos
        this.form.aluno_id = "";
        this.form.livro_id = "";

      } catch (error) {
        console.error(error);
        this.mensagem = "Erro ao registrar empréstimo";
        this.erro = true;
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 500px;
  margin: auto;
}
label {
  display: block;
  margin-top: 12px;
}
input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
}
button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
}
.erro {
  color: red;
}
</style>
