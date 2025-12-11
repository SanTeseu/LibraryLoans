<template>
  <div class="container" style="max-width:700px">
    <div class="page-head"><h1>{{ isEdit ? 'Editar Livro' : 'Novo Livro' }}</h1></div>

    <form @submit.prevent="salvar">
      <div class="form-row"><label>Título</label><input v-model="form.titulo" required /></div>
      <div class="form-row"><label>Autor</label><input v-model="form.autor" required /></div>
      <div class="form-row"><label>ISBN</label><input v-model="form.isbn" /></div>
      <div class="form-row"><label>Categoria</label><input v-model="form.categoria" /></div>
      <div class="form-row"><label>Exemplares totais</label><input type="number" min="0" v-model.number="form.exemplares_total" /></div>
      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:10px">
        <button type="button" class="btn secondary" @click="cancel">Cancelar</button>
        <button type="submit" class="btn">{{ isEdit ? 'Salvar' : 'Criar' }}</button>
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
const form = ref({ titulo:'', autor:'', isbn:'', categoria:'', exemplares_total:1 })

onMounted(async ()=>{
  if(isEdit){
    const res = await api.get(`/livros/${id}`)
    form.value = res.data || form.value
  }
})

async function salvar(){
  try{
    if(isEdit) await api.put(`/livros/${id}`, form.value)
    else await api.post('/livros', form.value)
    router.push('/')
  }catch(e){ alert('Erro ao salvar') }
}

function cancel(){ router.back() }
</script>
