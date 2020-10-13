import 'simplebar';
import 'simplebar/dist/simplebar.css';

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import '../css/index.css';
import '@mdi/font/css/materialdesignicons.css';

import App from '../components/App.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';
import Device from '../components/device/Device.vue';
import Changes from '../components/changes/Changes.vue';
import Builds from '../components/builds/Builds.vue';
import Home from '../components/home/Home.vue';
import store from './store';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                sidebar: Sidebar,
                main: Home,
            },
            children: [
                {
                    path: '',
                    name: 'home_changes',
                    component: Changes,
                },
            ],
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
                    path: '',
                    name: 'device_builds',
                    component: Builds,
                    props: true,
                },
                {
                    path: 'changes',
                    name: 'device_changes',
                    component: Changes,
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

app.use(store);
app.use(router);
app.mount('#app');
