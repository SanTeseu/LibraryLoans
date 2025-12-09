<template>
  <div style="padding:20px; max-width:600px">
    <h2>Registrar Empréstimo</h2>

    <form @submit.prevent="save">
      <div>
        <label>ID do Livro</label><br>
        <input type="number" v-model.number="form.livroId" required />
      </div>

      <div>
        <label>ID do Membro</label><br>
        <input type="number" v-model.number="form.membroId" required />
      </div>

      <div>
        <label>Data de Retirada</label><br>
        <input type="date" v-model="form.data_retirada" required />
      </div>

      <div>
        <label>Data de Devolução Prevista</label><br>
        <input type="date" v-model="form.data_devolucao_prevista" required />
      </div>

      <button style="margin-top:12px">Salvar</button>
    </form>

    <p style="color:red" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api';
import { decodeToken } from '../services/api';

export default {
  data() {
    return {
      form: {
        livroId: null,
        membroId: null,
        data_retirada: "",
        data_devolucao_prevista: ""
      },
      error: null
    }
  },

  computed: {
    usuario() {
      return decodeToken();
    }
  },

  methods: {
    async save() {
      try {
        await api.post('/emprestimos', this.form);
        this.$router.push('/emprestimos');
      } catch(e) {
        this.error = e.response?.data?.error || "Erro ao registrar empréstimo.";
      }
    }
  }
}
</script>
