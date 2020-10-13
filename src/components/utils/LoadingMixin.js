import UuidMixin from './UuidMixin';

export default {
    ...UuidMixin,
    computed: {
        isLoading() {
            return this.$store.getters.loading(this.uuid);
        },
    },
    methods: {
        setLoading(value) {
            this.$store.commit('loading', {
                uid: this.uuid,
                value,
            });
        },
    },
};
