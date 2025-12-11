<template>
  <div class="container">
    <div class="page-head">
      <h1>Membros</h1>
      <div><button class="btn" @click="novo">Novo Membro</button></div>
    </div>

    <table class="table">
      <thead><tr><th>ID</th><th>Nome</th><th>CPF</th><th>Status</th><th>Ações</th></tr></thead>
      <tbody>
        <tr v-for="m in membros" :key="m.id">
          <td>{{m.id}}</td>
          <td>{{m.nome}}</td>
          <td>{{m.cpf}}</td>
          <td><span class="badge" :class="m.status==='ativo' ? 'green' : (m.status==='suspenso' ? 'red' : '')">{{m.status}}</span></td>
          <td>
            <button class="btn" @click="editar(m.id)" style="margin-right:8px">Editar</button>
            <button class="btn danger" @click="excluir(m.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'
import { useRouter } from 'vue-router'
const router = useRouter()
const membros = ref([])
async function carregar(){ membros.value = (await api.get('/membros')).data || [] }
function novo(){ router.push('/membros/novo') }
function editar(id){ router.push(`/membros/${id}`) }
async function excluir(id){ if(!confirm('Excluir?')) return; await api.delete(`/membros/${id}`); carregar() }
onMounted(carregar)
</script>
