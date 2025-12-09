<template>
  
  <nav style="...">
    
    <div style="font-weight: 700">Library&Loans</div>
    
    <div>
      
      <router-link to="/" style="margin-right: 12px; color: white"
        >Livros</router-link
      >
      <router-link to="/membros" style="margin-right: 12px; color: white"
        >Membros</router-link
      >
      <router-link to="/emprestimos" style="margin-right: 12px; color: white"
        >Empréstimos</router-link
      >
      <router-link
        v-if="isAdmin"
        to="/funcionarios"
        style="margin-right: 12px; color: white"
        >Funcionários</router-link
      >
           
      <button @click="logout" style="margin-left: 8px; padding: 6px 10px">
        Sair
      </button>
         
    </div>
     
  </nav>
</template>

<script>
export default {
  computed: {
    userProfile() {
      if (!this.$userState || !this.$userState.token) return null;
      return "admin";
    },
    isAdmin() {
      return this.userProfile === "admin";
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$userState.token = null;
      this.$router.push("/login");
    },
  },
};
</script>
