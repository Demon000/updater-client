import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import '../css/index.css';
import '@mdi/font/css/materialdesignicons.css';

import App from '../components/App.vue';
import Changelist from '../components/Changelist.vue';
import Sidebar from '../components/Sidebar.vue';
import AllDevices from '../components/AllDevices.vue';
import Device from '../components/Device.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            components: {
                sidebar: Sidebar,
                main: AllDevices,
            },
        },
        {
            path: '/devices/:device',
            name: 'device',
            components: {
                sidebar: Sidebar,
                main: Device,
            },
            props: {
                sidebar: true,
                main: true,
            },
        },
    ],
});

const app = createApp(App);

app.use(router);
app.mount('#app');
