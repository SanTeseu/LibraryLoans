<template>
  <div class="container">
    <div class="page-head">
      <h1>Livros</h1>
      <div class="controls">
        <input v-model="q" placeholder="Buscar título / autor / ISBN" @input="debounced" style="padding:8px;border-radius:8px;border:1px solid var(--border)" />
        <button class="btn" @click="novo">+ Novo Livro</button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr><th>ID</th><th>Título</th><th>Autor</th><th>Disponível</th><th>Ações</th></tr>
      </thead>
      <tbody>
        <tr v-for="l in livros" :key="l.id">
          <td>{{ l.id }}</td>
          <td>{{ l.titulo }}</td>
          <td>{{ l.autor }}</td>
          <td>
            <span class="badge" :class="badgeClass(l.disponibilidade)">{{ l.disponibilidade ?? '—' }}</span>
          </td>
          <td>
            <router-link :to="`/livros/${l.id}/edit`" class="btn secondary" style="margin-right:8px;padding:6px 8px">Editar</router-link>
            <button class="btn danger" @click="excluir(l.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" style="padding:12px;text-align:center;color:var(--muted)">Carregando...</div>
    <div v-if="!loading && livros.length===0" style="padding:12px;text-align:center;color:var(--muted)">Nenhum livro encontrado.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'
import { useRouter } from 'vue-router'
const router = useRouter()

const livros = ref([])
const loading = ref(false)
const q = ref('')
let t = null

async function carregar(){
  loading.value = true
  try{
    const resp = await api.get('/livros', { params: { q: q.value } })
    livros.value = resp.data || []
  }catch(e){ console.error(e) }
  loading.value = false
}

function debounced(){
  clearTimeout(t)
  t = setTimeout(carregar, 300)
}

function novo(){ router.push('/livros/novo') }

async function excluir(id){
  if(!confirm('Confirma exclusão?')) return
  try{
    await api.delete(`/livros/${id}`)
    carregar()
  }catch(e){ alert('Erro ao excluir') }
}

function badgeClass(n){
  if(n === null || n === undefined) return ''
  if(n <= 0) return 'red'
  if(n <= 2) return 'yellow'
  return 'green'
}

onMounted(carregar)
</script>
