import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/login", component: Login },

  // LIVROS
  {
    path: "/",
    component: () => import("../views/livros/LivrosLista.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/livros/novo",
    component: () => import("../views/livros/LivroFormulario.vue"),
    meta: { requiresAuth: true, perfil: "admin" }
  },
  {
    path: "/livros/:id/edit",
    component: () => import("../views/livros/LivroFormulario.vue"),
    meta: { requiresAuth: true, perfil: "admin" }
  },

  // MEMBROS
  {
    path: "/membros",
    component: () => import("../views/membros/MembrosLista.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/membros/novo",
    component: () => import("../views/membros/MembroFormulario.vue"),
    meta: { requiresAuth: true, perfil: "admin" }
  },
  {
    path: "/membros/:id/edit",
    component: () => import("../views/membros/MembroFormulario.vue"),
    meta: { requiresAuth: true, perfil: "admin" }
  },

  // EMPRÉSTIMOS
  {
    path: "/emprestimos",
    component: () => import("../views/emprestimos/EmprestimosLista.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/emprestimos/novo",
    component: () => import("../views/emprestimos/EmprestimoFormulario.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/emprestimos/atrasados",
    component: () => import("../views/emprestimos/EmprestimosAtrasados.vue"),
    meta: { requiresAuth: true }
  },

  // FUNCIONÁRIOS
  {
    path: "/funcionarios",
    component: () => import("../views/funcionarios/FuncionariosLista.vue"),
    meta: { requiresAuth: true, perfil: "admin" }
  },
  {
    path: "/funcionarios/novo",
    component: () => import("../views/funcionarios/FuncionarioFormulario.vue"),
    meta: { requiresAuth: true, perfil: "admin" }
  },
  {
    path: "/funcionarios/:id/edit",
    component: () => import("../views/funcionarios/FuncionarioFormulario.vue"),
    meta: { requiresAuth: true, perfil: "admin" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (!auth.initialized) {
    await auth.loadUserFromToken();
  }

  const token = auth.token;

  if (to.path === "/login" && token) return next("/");

  if (to.meta.requiresAuth && !token) return next("/login");

  if (to.meta.perfil) {
    const userRole = auth.user?.perfil || auth.user?.role;
    if (userRole !== to.meta.perfil) {
      return next("/");
    }
  }

  next();
});


export default router;
