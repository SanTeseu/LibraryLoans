<template>
  <div style="padding:20px; max-width:600px">
    <h2>{{ isEdit ? 'Editar Livro' : 'Cadastrar Livro' }}</h2>

    <form @submit.prevent="save">
      <div>
        <label>Título</label><br>
        <input v-model="form.titulo" required />
      </div>

      <div>
        <label>Autor</label><br>
        <input v-model="form.autor" />
      </div>

      <div>
        <label>ISBN</label><br>
        <input v-model="form.isbn" />
      </div>

      <div>
        <label>Total de Exemplares</label><br>
        <input type="number" v-model.number="form.exemplares_total" min="1" />
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
      form: { titulo:'', autor:'', isbn:'', exemplares_total:1 },
      error: null
    }
  },

  computed: {
    isEdit() { return !!this.$route.params.id },
    usuario() { return decodeToken(); }
  },

  async mounted() {
    if (this.isEdit) {
      const id = this.$route.params.id;
      const r = await api.get('/livros');
      const livro = r.data.find(x => String(x.id) === id);
      if (livro) this.form = { ...livro };
    }
  },

  methods: {
    async save() {
      try {
        if (this.isEdit)
          await api.put(`/livros/${this.$route.params.id}`, this.form);
        else
          await api.post('/livros', this.form);

        this.$router.push('/');
      } catch(e) {
        this.error = e.response?.data?.error || "Erro ao salvar livro.";
      }
    }
  }
}
</script>
