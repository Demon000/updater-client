import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            ongoingRequests: 0,
            oems: [],
            extras: [],
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
        incrementChangesPage(state) {
            state.changes.page++;
        },
        addChanges(state, changes) {
            for (const change of changes) {
                state.changes.items.push(change);
            }
        },
        setExtras(state, extras) {
            state.extras = extras;
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
        extras(state) {
            return state.extras;
        },
    },
});
