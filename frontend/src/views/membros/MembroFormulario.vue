<template>
  <div class="container" style="max-width:720px">
    <div class="page-head"><h1>{{ isEdit ? 'Editar Membro' : 'Novo Membro' }}</h1></div>

    <form @submit.prevent="salvar">
      <div class="form-row"><label>Nome</label><input v-model="form.nome" required /></div>
      <div class="form-row"><label>CPF</label><input v-model="form.cpf" required /></div>
      <div class="form-row"><label>Telefone</label><input v-model="form.telefone" /></div>
      <div class="form-row"><label>Email</label><input v-model="form.email" type="email" /></div>
      <div class="form-row"><label>Status</label>
        <select v-model="form.status"><option value="ativo">Ativo</option><option value="suspenso">Suspenso</option><option value="inativo">Inativo</option></select>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end">
        <button type="button" class="btn secondary" @click="cancel">Cancelar</button>
        <button type="submit" class="btn">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute(), router = useRouter()
const id = route.params.id
const isEdit = !!id
const form = ref({ nome:'', cpf:'', telefone:'', email:'', status:'ativo' })
onMounted(async ()=>{ if(isEdit){ const r = await api.get(`/membros/${id}`); form.value = r.data || form.value } })
async function salvar(){ if(isEdit) await api.put(`/membros/${id}`, form.value); else await api.post('/membros', form.value); router.push('/membros') }
function cancel(){ router.back() }
</script>
