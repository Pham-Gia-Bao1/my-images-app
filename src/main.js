// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome styles

createApp(App)
  .use(router)
  .mount('#app');
