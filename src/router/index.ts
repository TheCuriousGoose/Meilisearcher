import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/config/new',
      name: 'config-create',
      component: () => import('../views/configs/CreateConfig.vue')
    },
    {
      path: '/config/:slug',
      name: 'config-show',
      component: () => import('../views/configs/ShowConfig.vue')
    }
  ]
})

export default router
