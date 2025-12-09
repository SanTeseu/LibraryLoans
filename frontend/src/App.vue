<template>
  <NavBar v-if="showNav" />
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  components: { NavBar },
  computed: {
    showNav(){ return !this.$route.path.startsWith('/login'); }
  }
}
</script>
