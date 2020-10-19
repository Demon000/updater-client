import {createRouter, createWebHashHistory} from 'vue-router';

import Sidebar from '../components/sidebar/Sidebar.vue';
import HomeMain from '../components/home/HomeMain.vue';
import ChangesTabPage from '../components/changes/ChangesTabPage.vue';
import DeviceMain from '../components/device/DeviceMain.vue';
import Builds from '../components/builds/BuildsTabPage.vue';
import ErrorMain from '../components/error/ErrorMain.vue';
import DevicesTabPage from '../components/devices/DevicesTabPage.vue';
import ApiService from './ApiService';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                sidebar: Sidebar,
                main: HomeMain,
            },
            children: [
                {
                    path: '',
                    name: 'home_changes',
                    component: ChangesTabPage,
                },
                {
                    path: 'devices',
                    name: 'home_devices',
                    component: DevicesTabPage,
                }
            ],
        },
        {
            path: '/devices/:model',
            name: 'device',
            components: {
                sidebar: Sidebar,
                main: DeviceMain,
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
                },
                {
                    path: 'changes',
                    name: 'device_changes',
                    component: ChangesTabPage,
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
                main: ErrorMain,
            },
        }
    ],
});
