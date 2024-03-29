import { createApp } from 'vue';

import '@mdi/font/css/materialdesignicons.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import './css/index.css';

import App from './App.vue';
import store from './js/store';
import router from './js/router';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
