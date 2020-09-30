<template>
  <div class="sidebar">
    <router-link to="/">
      <div class="logo">
        <img src="../assets/header.png" alt="LineageOS Logo">
      </div>
    </router-link>
    <div class="content">
      <div class="search-container">
        <input type="text" placeholder="Search..." v-model="filterText">
      </div>
      <sidebar-oem v-for="oem in oems" v-bind="oem"></sidebar-oem>
      <div class="loading" v-if="!loaded">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SidebarOem from './SidebarOem.vue';
import {API_HOSTNAME} from "../js/config";

export default {
  name: 'Sidebar',
  components: {
    SidebarOem,
  },
  props: {
    device: {
      type: String,
      default: 'all',
    },
  },
  data() {
    return {
      oems: [],
      filterText: '',
      loaded: false,
    };
  },
  watch: {
    device() {
      this.refreshDevices();
    },
    filterText() {
      this.onFilterChange();
    },
  },
  mounted() {
    this.loadOems();
  },
  methods: {
    loadOems() {
      axios
          .get(`${API_HOSTNAME}/api/v2/oems`)
          .then(response => {
            this.oems = response.data;
            this.loaded = true;

            this.refreshDevices();
          })
          .catch(err => {
            console.error(err);
          });
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
          if (device.model === this.device) {
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

  /*border-right: 1px solid rgba(0, 0, 0, 0.12);*/

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  /*box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);*/
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: #167c80;
  padding: 16px;

  height: 96px;
}
.logo img {
  width: 100%;
  max-width: 128px;
}

.search-container {
  width: 100%;
  height: 64px;

  flex-shrink: 0;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.search-container input {
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0;
  padding: 16px;
}
.loading {
  height: 48px;
  padding: 16px;
  text-align: center;
  font-size: 14px;
}

.content {
  flex-grow: 1;
}
</style>
