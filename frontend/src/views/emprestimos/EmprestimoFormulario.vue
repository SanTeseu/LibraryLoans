<template>
  <div class="container" style="max-width:700px">
    <div class="page-head"><h1>{{ isEdit ? 'Editar Empréstimo' : 'Novo Empréstimo' }}</h1></div>
    <form @submit.prevent="salvar">
      <div class="form-row"><label>Livro</label>
        <select v-model="form.livroId"><option v-for="l in livros" :key="l.id" :value="l.id">{{l.titulo}}</option></select>
      </div>
      <div class="form-row"><label>Membro</label>
        <select v-model="form.membroId"><option v-for="m in membros" :key="m.id" :value="m.id">{{m.nome}}</option></select>
      </div>
      <div class="form-row"><label>Data Prevista</label><input type="date" v-model="form.data_devolucao_prevista" /></div>
      <div style="display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn secondary" @click="cancel">Cancelar</button>
        <button type="submit" class="btn">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import api from '../../services/api'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter(), route = useRoute()
const isEdit = !!route.params.id
const livros = ref([]), membros = ref([])
const form = ref({ livroId:'', membroId:'', data_devolucao_prevista:'' })

async function carregar(){
  livros.value = (await api.get('/livros')).data || []
  membros.value = (await api.get('/membros')).data || []
  if(isEdit){ const r = await api.get(`/emprestimos/${route.params.id}`); Object.assign(form.value, r.data) }
}
async function salvar(){
  if(isEdit) await api.put(`/emprestimos/${route.params.id}`, form.value)
  else await api.post('/emprestimos', form.value)
  router.push('/emprestimos')
}
function cancel(){ router.back() }
onMounted(carregar)
</script>
