<template>
  <div style="padding: 20px;">
    <h1 style="font-size: 22px; margin-bottom: 20px;">Funcionários</h1>

    <button
      @click="$router.push('/funcionarios/novo')"
      style="padding: 8px 14px; background: #3b82f6; color: white; border: none; cursor: pointer;"
    >
      + Novo Funcionário
    </button>

    <table border="1" cellpadding="10" style="margin-top: 20px; width: 100%;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Role</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="f in funcionarios" :key="f.id">
          <td>{{ f.id }}</td>
          <td>{{ f.nome }}</td>
          <td>{{ f.email }}</td>
          <td>{{ f.role }}</td>
          <td>
            <button @click="$router.push('/funcionarios/' + f.id)">Editar</button>
            <button @click="deletar(f.id)" style="margin-left: 6px; color: red;">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../../services/api.js";

export default {
  data() {
    return {
      funcionarios: [],
    };
  },

  async mounted() {
    try {
      const res = await api.get("/funcionarios");
      this.funcionarios = res.data;
    } catch (err) {
      console.error("Erro ao buscar funcionários:", err);
      alert("Erro ao carregar funcionários.");
    }
  },

  methods: {
    async deletar(id) {
      if (!confirm("Tem certeza que deseja excluir?")) return;

      try {
        await api.delete("/funcionarios/" + id);

        this.funcionarios = this.funcionarios.filter((f) => f.id !== id);
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Não foi possível excluir o funcionário.");
      }
    },
  },
};
</script>
