import 'simplebar';
import 'simplebar/dist/simplebar.css';

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import '../css/index.css';
import '@mdi/font/css/materialdesignicons.css';

import App from '../components/App.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';
import Device from '../components/device/Device.vue';
import Change from '../components/changes/Changes.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            components: {
                sidebar: Sidebar,
                main: Device,
            },
        },
        {
            path: '/devices/:model',
            name: 'device',
            components: {
                sidebar: Sidebar,
                main: Device,
            },
            children: [
                {
                    path: 'changes',
                    name: 'device_changes',
                    component: Change,
                    props: true,
                },

            ],
            props: {
                sidebar(route) {
                    return {
                        activeModel: route.params.model,
                    };
                },
                main: true,
            },
        },
    ],
});

const app = createApp(App);

app.use(router);
app.mount('#app');
