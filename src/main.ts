import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { scrollToggle } from './plugins/scroll';

import './assets/main.css';

const app = createApp(App);
app.use(scrollToggle);
app.use(createPinia());
app.mount('#app');
