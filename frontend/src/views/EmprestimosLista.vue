<template>
  <div style="padding:20px">
    <h2>Empréstimos</h2>

    <router-link to="/emprestimos/novo">
      <button style="margin-bottom:12px">Registrar Empréstimo</button>
    </router-link>

    <table border="1" cellpadding="8" v-if="emprestimos">
      <thead>
        <tr>
          <th>Livro</th>
          <th>Membro</th>
          <th>Retirada</th>
          <th>Prevista</th>
          <th>Devolução</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="e in emprestimos" :key="e.id">
          <td>{{ e.livro?.titulo }}</td>
          <td>{{ e.membro?.nome }}</td>
          <td>{{ e.data_retirada }}</td>
          <td>{{ e.data_devolucao_prevista }}</td>
          <td>{{ e.data_devolucao_real || '-' }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>Carregando...</div>
  </div>
</template>

<script>
import api from '../services/api';
import { decodeToken } from '../services/api';

export default {
  data() {
    return { emprestimos: null };
  },

  computed: {
    usuario() {
      return decodeToken();
    }
  },

  async mounted() {
    const r = await api.get('/emprestimos');
    this.emprestimos = r.data;
  }
}
</script>
