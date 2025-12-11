<template>
  <div style="max-width: 500px; margin: 40px auto;">
    <h1 style="font-size: 22px; margin-bottom: 20px;">
      {{ isEdit ? "Editar Funcionário" : "Novo Funcionário" }}
    </h1>

    <form @submit.prevent="salvar">
      <label>Nome</label>
      <input v-model="funcionario.nome" required style="width: 100%; padding: 8px; margin-bottom: 12px;" />

      <label>Email</label>
      <input v-model="funcionario.email" required style="width: 100%; padding: 8px; margin-bottom: 12px;" />

      <label>Role (cargo)</label>
      <select v-model="funcionario.role" style="width: 100%; padding: 8px; margin-bottom: 12px;">
        <option value="admin">Admin</option>
        <option value="funcionario">Funcionário</option>
      </select>

      <button
        type="submit"
        style="padding: 10px 14px; background: #3b82f6; color: white; border: none; cursor: pointer;"
      >
        Salvar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funcionario: {
        nome: "",
        email: "",
        role: "funcionario",
      },
      isEdit: false,
    };
  },

  async mounted() {
    const id = this.$route.params.id;

    if (id) {
      this.isEdit = true;

      const res = await fetch("http://localhost:3000/funcionarios/" + id);
      this.funcionario = await res.json();
    }
  },

  methods: {
    async salvar() {
      const id = this.$route.params.id;
      const url = "http://localhost:3000/funcionarios" + (id ? "/" + id : "");
      const method = id ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.funcionario),
      });

      this.$router.push("/funcionarios");
    },
  },
};
</script>
