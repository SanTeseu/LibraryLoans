import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const routes = [
  // login
  { path: '/login', component: () => import('../views/Login.vue') },

  // livros (RF04)
  // rota raiz e listagem de livros (RF04)
  { path: '/', component: () => import('../views/LivrosLista.vue'), meta: { requiresAuth: true } },
  { path: '/livros/novo', component: () => import('../views/LivroFormulario.vue'), meta: { requiresAuth: true, role: 'admin' } },
  { path: '/livros/:id/edit', component: () => import('../views/LivroFormulario.vue'), meta: { requiresAuth: true, role: 'admin' } },

  // membros (RF06)
  { path: '/membros', component: () => import('../views/MembrosLista.vue'), meta: { requiresAuth: true } },
  { path: '/membros/novo', component: () => import('../views/MembroFormulario.vue'), meta: { requiresAuth: true, role: 'admin' } },
  { path: '/membros/:id/edit', component: () => import('../views/MembroFormulario.vue'), meta: { requiresAuth: true, role: 'admin' } },

  // empresstimos (RF07)
  { path: '/emprestimos', component: () => import('../views/EmprestimosLista.vue'), meta: { requiresAuth: true } },
  { path: '/emprestimos/novo', component: () => import('../views/EmprestimoFormulario.vue'), meta: { requiresAuth: true } },

  // funcionarios (RN04)
  { path: '/funcionarios', component: () => import('../views/FuncionariosLista.vue'), meta: { requiresAuth: true, role: 'admin' } },
  { path: '/funcionarios/novo', component: () => import('../views/FuncionarioFormulario.vue'), meta: { requiresAuth: true, role: 'admin' } },
  { path: '/funcionarios/:id/edit', component: () => import('../views/FuncionarioFormulario.vue'), meta: { requiresAuth: true, role: 'admin' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// JWT + Perfil (guard de navegação)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  
  // 1. rota de Login (Não deve ser acessada se já estiver logado)
  if (to.path === '/login') {
    if (token) {
      return next('/'); 
    } else {
      return next(); 
    }
  }

  // 2. Rota Protegida (requiresAuth)
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }

  // 3. checagem de Perfill (RN04)
  if (token) {
    const user = jwtDecode(token);

    if (!user) {
      localStorage.removeItem("token");
      return next('/login');
    }

    // Caso exija papel específico (adminOnly) e o perfil não corresponde (RN04)
    if (to.meta.role && user.perfil !== to.meta.role) {
      return next('/'); 
    }
  }

  // 4. permite a navegação
  next();
});

export default router;