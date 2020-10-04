<template>
  <div class="device">
    <navbar>
      <template v-slot:left v-if="loaded">
        <template v-if="model">
          <span class="oem">{{ oem }}</span>
          <i class="mdi mdi-chevron-right arrow"></i>
          <span class="name">{{ name }}</span>
          <span class="model">{{ model }}</span>
        </template>
        <template v-else>
          <span class="text">
            All devices
          </span>
        </template>
      </template>
      <template v-slot:tabs>
        <router-link
            class="tab"
            v-bind:to="{
              name: 'device_changes',
              params: {
                model,
              },
            }"
        >
        Changes
        </router-link>
      </template>
    </navbar>

    <router-view class="content"></router-view>
  </div>
</template>

<script>
import axios from "axios";

import {API_HOSTNAME} from '../../js/config';

import Navbar from '../navbar/Navbar.vue';
import Changelist from '../changelist/Changelist.vue';

export default {
  name: 'Device',
  components: {
    Navbar,
    Changelist,
  },
  props: {
    model: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      builds: [],
      info_url: '',
      install_url: '',
      name: '',
      oem: '',
      versions: [],
      loaded: false,
    };
  },
  watch: {
    model() {
      this.loadDeviceDetails();
    },
  },
  mounted() {
    this.loadDeviceDetails();
  },
  methods: {
    loadDeviceDetails() {
      if (!this.model) {
        this.loaded = true;
        return;
      }

      this.loaded = false;
      axios
          .get(`${API_HOSTNAME}/api/v2/devices/${this.model}`)
          .then(response => {
            [
              'builds',
              'info_url',
              'install_url',
              'name',
              'oem',
              'versions'
            ].forEach(k => this[k] = response.data[k]);
            this.loaded = true;
          })
          .catch(err => {
            console.error(err);
          });
    },
  },
}
</script>

<style scoped>
.device {
  width: 100%;

  display: flex;
  flex-direction: column;
}

.device .navbar {
  flex-shrink: 0;
}

.device .navbar .oem,
.device .navbar .arrow,
.device .navbar .name,
.device .navbar .model,
.device .navbar .text {
  display: inline-block;
  vertical-align: top;
}

.device .navbar .arrow,
.device .navbar .model {
  margin: 0 8px;
}

.device .navbar .arrow {
  height: 24px;
}

.device .navbar .model {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
}

.device .content {
  flex-grow: 1;
  overflow: auto;
}

.device .tab {
  vertical-align: top;

  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);

  display: inline-block;

  height: 48px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 24px;
  text-transform: uppercase;
}

.device .tab.router-link-exact-active {
  border-bottom: 4px solid #167c80;
}
</style>
