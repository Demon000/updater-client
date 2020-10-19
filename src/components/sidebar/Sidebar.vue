<template>
  <div class="sidebar">
    <div class="logo">
      <router-link to="/">
        <img src="../../assets/header.png" alt="LineageOS Logo">
      </router-link>
    </div>
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

import HeightTransition from '../utils/HeightTransition.vue';
import DeviceSelector from '../device-selector/DeviceSelectorMixin';
import {beforeTryError} from '../../js/router_utils';
import ApiService from '../../js/ApiService';

export default {
  name: 'Sidebar',
  mixins: [
      DeviceSelector,
  ],
  components: {
    HeightTransition,
    SidebarOem,
  },
  beforeRouteEnter: beforeTryError(() => {
    return ApiService.loadOems();
  }),
  mounted() {
    this.refreshDevices();
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

  height: 100px;
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
