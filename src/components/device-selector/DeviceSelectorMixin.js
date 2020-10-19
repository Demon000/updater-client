export default {
    props: {
        activeModel: {
            type: String,
            default: 'all',
        },
    },
    data() {
        return {
            filterText: '',
        };
    },
    computed: {
        oems() {
            return this.$store.getters.oems;
        },
    },
    watch: {
        activeModel() {
            const cleared = this.clearFilterText();
            if (!cleared) {
                this.refreshDevices();
            }
        },
        filterText() {
            this.onFilterChange();
        },
        oems() {
            this.refreshDevices();
        },
    },
    methods: {
        clearFilterText() {
            if (this.filterText === '') {
                return false;
            }

            this.filterText = '';
            return true;
        },
        resetFilterDevices() {
            for (const oem of this.oems) {
                oem.forceExpanded = false;
                oem.hidden = false;
                for (const device of oem.devices) {
                    device.hidden = false;
                    device.selected = false;
                }
            }
        },
        selectActiveDevice() {
            for (const oem of this.oems) {
                for (const device of oem.devices) {
                    if (device.model === this.activeModel) {
                        oem.forceExpanded = true;
                        oem.hidden = false;
                        device.hidden = false;
                        device.selected = true;
                    }
                }
            }
        },
        refreshDevices() {
            this.resetFilterDevices();
            this.selectActiveDevice();
        },
        filterDevices(filterText) {
            if (!filterText) {
                this.refreshDevices();
                return;
            }

            this.resetFilterDevices();

            for (const oem of this.oems) {
                if (oem.name.toLowerCase().includes(filterText)) {
                    oem.forceExpanded = true;
                    continue;
                }

                oem.hidden = true;
                for (const device of oem.devices) {
                    device.hidden = true;

                    if (device.name.toLowerCase().includes(filterText) ||
                        device.model.toLowerCase().includes(filterText)) {
                        oem.forceExpanded = true;
                        oem.hidden = false;
                        device.hidden = false;
                    }
                }
            }

            this.selectActiveDevice();
        },
        onFilterChange() {
            this.filterDevices(this.filterText.toLowerCase());
        },
    },
}