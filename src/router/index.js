import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
  routes: [
    { path: '/', name: 'home', component: () => import('../views/home.vue') },
  ],
  history: createWebHashHistory(),
});
export default router;
