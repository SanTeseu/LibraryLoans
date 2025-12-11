<template>
  <div>
    <NavBar v-if="auth.user && showNav" />
    <router-view v-if="auth.initialized" />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import { useAuthStore } from "./stores/auth";
import { useRoute } from "vue-router";
import { computed } from "vue";

const auth = useAuthStore();
auth.loadUserFromToken();

const route = useRoute();

const showNav = computed(() => !route.path.startsWith("/login"));
</script>

<style>
@import './assets/style.css';
</style>
