<template>
  <div style="padding:20px">
    <h2>Livros</h2>

    <router-link v-if="usuario.perfil === 'admin'" to="/livros/novo">
      <button style="margin-bottom:12px">Cadastrar Livro</button>
    </router-link>

    <table border="1" cellpadding="8" v-if="livros && livros.length">
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>ISBN</th>
          <th>Total</th>
          <th>Disponíveis</th>
          <th v-if="usuario.perfil === 'admin'">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="l in livros" :key="l.id">
          <td>{{ l.titulo }}</td>
          <td>{{ l.autor }}</td>
          <td>{{ l.isbn }}</td>
          <td>{{ l.exemplares_total }}</td>
          
          <td :style="{ fontWeight: 'bold', color: getDisponibilidadeColor(l.id) }">
            {{ disponivelMap[l.id] ?? '0' }}
          </td>

          <td v-if="usuario.perfil === 'admin'">
            <router-link :to="`/livros/${l.id}/edit`">Editar</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-else-if="livros && livros.length === 0">Nenhum livro cadastrado.</div>
    <div v-else>Carregando...</div>
  </div>
</template>

<script>
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      livros: null,
      emprestimosAtivos: [],
      disponivelMap: {},
      usuario: {} // "salva" o perfil do usuário logado
    };
  },
  async created() {
    //  get perfil do usuário
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // decodifica o token para admin/bibliotecario terem acesso ao perfil 
        this.usuario = jwtDecode(token);
      } catch (e) {
        console.error("Token inválido ao decodificar:", e);
      }
    }
    
    //  carrega os dados
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        //  requisições para livros e empretimos ativos ao mesmo tempo
        // obs: endpoint emprestimos/ativos deve ser implementado no backend
        // pra retornar apenas os empretimos que ainda não foram devolvidos
        const [livrosResponse, emprestimosResponse] = await Promise.all([
          api.get('/livros'),
          // obs:  endpoint  (emprestimos/ativos) vai ser criado no backend
          // == == == == == == == == == ==
          api.get('/emprestimos/ativos') 
        ]);

        this.livros = livrosResponse.data;
        this.emprestimosAtivos = emprestimosResponse.data;
        
        this.calculateAvailability();
      } catch (e) {
        console.error("Erro ao carregar dados do Livros:", e);
      }
    },
    calculateAvailability() {
      //  contar empréstimos ativos por livro
      const emprestimosCount = this.emprestimosAtivos.reduce((acc, loan) => {
        const livroId = loan.livro_id; 
        acc[livroId] = (acc[livroId] || 0) + 1;
        return acc;
      }, {});
      
      // 2. calcular a disponibilidade
      this.disponivelMap = this.livros.reduce((acc, livro) => {
        const total = livro.exemplares_total;
        const emprestados = emprestimosCount[livro.id] || 0;
        acc[livro.id] = total - emprestados;
        return acc;
      }, {});
    },
    //  regra de cores do RF08
    getDisponibilidadeColor(livroId) {
      const disponivel = this.disponivelMap[livroId] ?? 0;
      if (disponivel > 2) {
        return 'green'; // dissponivel (> 2 exemplares)
      } else if (disponivel > 0) {
        return 'darkorange'; // amarelo (1 ou 2 exemplares)
      } else {
        return 'red'; // indisponivel (zero exemplares)
      }
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  text-align: left;
}
</style>