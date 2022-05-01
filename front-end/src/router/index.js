import { createRouter, createWebHistory } from 'vue-router';
let userİnfoTernary = localStorage.getItem('userİnfo') == null || localStorage.getItem('userİnfo') == "";

const routes = [
  {
    path: '/',
    redirect : userİnfoTernary ? "/recording" : "/user"
  },
  {
    path: '/recording',
    name: 'recording',
    component: () => userİnfoTernary ? import('../views/Recording.vue') : import('../views/Error.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => userİnfoTernary ? import('../views/Error.vue') : import('../views/User.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => userİnfoTernary ? import('../views/Error.vue') : import('../views/Setting.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/Error.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
