import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/services/:id',
    name: 'ServiceDetail',
    component: () => import('@/views/ServiceDetailView.vue'),
    props: true,
  },
  {
    path: '/join',
    name: 'JoinTeam',
    component: () => import('@/views/JoinTeamView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router