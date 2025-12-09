<template>
  <div style="padding:20px">
    <h2>Membros</h2>

    <!-- Botão só para ADMIN -->
    <router-link v-if="usuario.perfil === 'admin'" to="/membros/novo">
      <button style="margin-bottom:12px">Cadastrar Membro</button>
    </router-link>

    <table border="1" cellpadding="8" v-if="membros">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Status</th>
          <th v-if="usuario.perfil === 'admin'">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="m in membros" :key="m.id">
          <td>{{ m.nome }}</td>
          <td>{{ m.email }}</td>
          <td>{{ m.cpf }}</td>
          <td>{{ m.status }}</td>

          <td v-if="usuario.perfil === 'admin'">
            <router-link :to="`/membros/${m.id}/edit`">Editar</router-link>
          </td>
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
    return { membros: null };
  },

  computed: {
    usuario() {
      return decodeToken();
    }
  },

  async mounted() {
    const r = await api.get('/membros');
    this.membros = r.data;
  }
}
</script>
