
import { createApp } from 'vue';

import '../css/index.css';
import '@mdi/font/css/materialdesignicons.css';

import App from '../components/App.vue';
import store from './store';
import router from './router';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
