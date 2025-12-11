<template>
  <div class="container">
    <div class="page-head">
      <h1>Empréstimos</h1>
      <div><button class="btn" @click="novo">Novo Empréstimo</button></div>
    </div>

    <table class="table">
      <thead><tr><th>ID</th><th>Livro</th><th>Membro</th><th>Devolver até</th><th>Status</th><th>Ações</th></tr></thead>
      <tbody>
        <tr v-for="e in lista" :key="e.id">
          <td>{{e.id}}</td>
          <td>{{e.livro?.titulo}}</td>
          <td>{{e.membro?.nome}}</td>
          <td>{{e.data_devolucao_prevista || '—'}}</td>
          <td><span class="badge" :class="e.status==='ativo' ? 'yellow' : (e.status==='atrasado' ? 'red' : 'green')">{{e.status}}</span></td>
          <td><button class="btn" @click="editar(e.id)">Editar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import api from '../../services/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const lista = ref([]), router = useRouter()
async function carregar(){ lista.value = (await api.get('/emprestimos')).data || [] }
function novo(){ router.push('/emprestimos/novo') }
function editar(id){ router.push(`/emprestimos/${id}/edit`) }
onMounted(carregar)
</script>
