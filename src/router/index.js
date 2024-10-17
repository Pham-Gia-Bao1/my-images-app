// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; // Cập nhật tên component

const routes = [
  {
    path: '/',
    name: 'HomePage', // Cập nhật tên route
    component: HomePage,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
