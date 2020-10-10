<template>
  <div class="device">
    <navbar>
      <template v-slot:left>
        <template v-if="loaded">
          <span class="oem">{{ oem }}</span>
          <i class="mdi mdi-chevron-right arrow"></i>
          <span class="name">{{ name }}</span>
          <span class="model">{{ model }}</span>
        </template>
        <template v-else>
          <horizontal-loader class="loading">
          </horizontal-loader>
        </template>
      </template>
      <template v-slot:tabs>
        <router-link
            class="tab"
            v-bind:to="{
              name: 'device_builds',
              params: {
                model,
              },
            }"
        >
          Builds
        </router-link>
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
        <a
            class="tab"
            target="_blank"
            v-bind:href="info_url"
        >
          Device info
          <span class="mdi mdi-open-in-new"></span>
        </a>
        <a
            class="tab"
            target="_blank"
            v-bind:href="install_url"
        >
          Install instructions
          <span class="mdi mdi-open-in-new"></span>
        </a>
      </template>
    </navbar>

    <router-view class="content"></router-view>
  </div>
</template>

<script>
import axios from "axios";
import {API_HOSTNAME} from '../../js/config';

import Navbar from '../navbar/Navbar.vue';
import HorizontalLoader from '../utils/HorizontalLoader.vue';

export default {
  name: 'Device',
  components: {
    Navbar,
    HorizontalLoader,
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

.device .navbar .loading {
  position: absolute;
  top: 0;
  left: 0;
}

.device .content {
  flex-grow: 1;
}
</style>
