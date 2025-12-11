import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

import FuncionariosLista from "../views/FuncionariosLista.vue";
import MembrosLista from "../views/MembrosLista.vue";
import LivrosLista from "../views/LivrosLista.vue";
import EmprestimosLista from "../views/EmprestimosLista.vue";

const routes = [
    {
        path: "/",
        redirect: "/login"   // PRIMEIRA TELA = LOGIN
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: "/funcionarios",
        name: "Funcionarios",
        component: FuncionariosLista,
        meta: { requiresAuth: true }
    },
    {
        path: "/membros",
        name: "Membros",
        component: MembrosLista,
        meta: { requiresAuth: true }
    },
    {
        path: "/livros",
        name: "Livros",
        component: LivrosLista,
        meta: { requiresAuth: true }
    },
    {
        path: "/emprestimos",
        name: "Emprestimos",
        component: EmprestimosLista,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// ====== PROTEÇÃO DE ROTAS =======
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.requiresAuth && !token) {
        next("/login");
    } else {
        next();
    }
});

export default router;
