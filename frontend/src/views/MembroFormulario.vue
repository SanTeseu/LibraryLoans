<template>
  <div style="padding:20px; max-width:600px">
    <h2>{{ isEdit ? 'Editar Membro' : 'Cadastrar Membro' }}</h2>

    <form @submit.prevent="save">
      <div>
        <label>Nome</label><br>
        <input v-model="form.nome" required />
      </div>

      <div>
        <label>Email</label><br>
        <input type="email" v-model="form.email" required />
      </div>

      <div>
        <label>CPF</label><br>
        <input v-model="form.cpf" required />
      </div>

      <button style="margin-top:12px">
        {{ isEdit ? 'Salvar Alterações' : 'Cadastrar' }}
      </button>
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
      form: { nome:'', email:'', cpf:'' },
      error: null
    };
  },

  computed: {
    isEdit() { return !!this.$route.params.id; },
    usuario() { return decodeToken(); }
  },

  async mounted() {
    if (this.isEdit) {
      const id = this.$route.params.id;
      const r = await api.get('/membros');
      const membro = r.data.find(x => String(x.id) === id);
      if (membro) this.form = { ...membro };
    }
  },

  methods: {
    async save() {
      try {
        if (this.isEdit)
          await api.put(`/membros/${this.$route.params.id}`, this.form);
        else
          await api.post('/membros', this.form);

        this.$router.push('/membros');
      } catch (e) {
        this.error = e.response?.data?.error || "Erro ao salvar membro.";
      }
    }
  }
}
</script>
