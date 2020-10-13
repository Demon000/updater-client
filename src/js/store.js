import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            loading: {},
        };
    },
    mutations: {
        loading(state, payload) {
            state.loading[payload.uid] = !!payload.value;
        },
    },
    getters: {
        anyLoading(state) {
            for (const property in Object.getOwnPropertyNames(state.loading)) {
                if (state.loading[property]) {
                    return true;
                }
            }

            return false;
        },
        loading: (state) => (uid) => {
            return state.loading[uid];
        },
    },
});
