<template>
  <div class="sidebar">
    <router-link to="/">
      <div class="logo">
        <img src="../../assets/header.png" alt="LineageOS Logo">
      </div>
    </router-link>
    <div class="search-container">
      <input type="text" placeholder="Search..." v-model="filterText">
      <i class="mdi mdi-close clear" v-on:click="clearFilterText"></i>
    </div>
    <div
        class="oems"
        data-simplebar
    >
      <sidebar-oem
          v-for="oem in oems"
          v-bind="oem"
      ></sidebar-oem>
    </div>
  </div>
</template>

<script>
import SidebarOem from './SidebarOem.vue';
import ApiService from '../../js/ApiService';
import {beforeTryError} from '../../js/router_utils';

import HorizontalLoader from '../utils/HorizontalLoader.vue';

export default {
  name: 'Sidebar',
  components: {
    HorizontalLoader,
    SidebarOem,
  },
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
    }
  },
  beforeRouteEnter: beforeTryError(() => {
    return ApiService.loadOems();
  }),
  watch: {
    activeModel() {
      this.refreshDevices();
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
      this.filterText = '';
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
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;

  position: relative;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
}

.sidebar .logo {
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: #167c80;

  height: 104px;
}
.sidebar .logo img {
  height: 40px;
}

.sidebar .search-container {
  width: 100%;
  height: 64px;

  padding: 16px;

  display: flex;

  position: relative;

  flex-shrink: 0;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.sidebar .search-container input {
  width: 100%;
  height: 32px;
  outline: 0;
  border: 0;

  padding: 0;
}

.sidebar .clear {
  height: 32px;
  line-height: 32px;

  font-size: 24px;

  cursor: pointer;

  color: rgba(0, 0, 0, 0.38);
}

.sidebar .oems {
  max-height: 100%;
  flex-grow: 1;
  overflow: auto;
}
</style>
