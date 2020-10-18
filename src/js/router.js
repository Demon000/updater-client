import {createRouter, createWebHashHistory} from 'vue-router';

import Sidebar from '../components/sidebar/Sidebar.vue';
import Home from '../components/home/Home.vue';
import Changes from '../components/changes/Changes.vue';
import Device from '../components/device/Device.vue';
import Builds from '../components/builds/Builds.vue';
import Error from '../components/home/Error.vue';
import ApiService from './ApiService';

export default createRouter({
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
            props: {
                sidebar(route) {
                    return {
                        activeModel: route.params.model,
                    };
                },
                main: true,
            },
            children: [
                {
                    path: '',
                    name: 'device_builds',
                    component: Builds,
                    props: true,
                    async beforeEnter(to, from, next) {
                        try {
                            await ApiService.loadDeviceBuilds(to.params.model);
                        } catch (err) {
                            console.error(err);
                            return;
                        }

                        next();
                    },
                },
                {
                    path: 'changes',
                    name: 'device_changes',
                    component: Changes,
                    props: true,
                },

            ],
        },
        {
            path: '/error',
            name: 'error',
            props: true,
            components: {
                sidebar: Sidebar,
                main: Error,
            },
        }
    ],
});
