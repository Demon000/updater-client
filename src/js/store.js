import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            ongoingRequests: 0,
            oems: [],
            devices: {},
            builds: {},
            changes: {
                page: -1,
                items: [],
            },
        };
    },
    mutations: {
        startRequest(state) {
            state.ongoingRequests++;
        },
        endRequest(state) {
            state.ongoingRequests--;
        },
        setOems(state, oems) {
            state.oems = oems;
        },
        setDevice(state, payload) {
            state.devices[payload.model] = payload.data;
        },
        setDeviceBuilds(state, payload) {
            state.builds[payload.model] = payload.data;
        },
        addNextChangesPage(state, changes) {
            state.changes.items = state.changes.items.concat(changes);
            state.changes.page++;
        },
    },
    getters: {
        ongoingRequests(state) {
            return state.ongoingRequests;
        },
        oems(state) {
            return state.oems;
        },
        getDevice: (state) => (model) => {
            return state.devices[model];
        },
        getDeviceBuilds: (state) => (model) => {
            return state.builds[model];
        },
        changes(state) {
            return state.changes.items;
        },
        changesPage(state) {
            return state.changes.page;
        },
    },
});
