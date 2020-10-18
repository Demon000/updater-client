<template>
  <div class="device">
    <navbar>
      <template v-slot:left>
        <span class="oem">{{ oem }}</span>
        <i class="mdi mdi-chevron-right arrow"></i>
        <span class="name">{{ name }}</span>
        <span class="model">{{ model }}</span>
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
import Navbar from '../navbar/Navbar.vue';
import HorizontalLoader from '../utils/HorizontalLoader.vue';
import ApiService from '../../js/ApiService';
import {beforeTryError} from '../../js/router_utils';

const loadDeviceBeforeHook = beforeTryError((to) => {
  return ApiService.loadDevice(to.params.model);
});

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
    };
  },
  beforeRouteEnter: loadDeviceBeforeHook,
  beforeRouteUpdate: loadDeviceBeforeHook,
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
      const data = this.$store.getters.getDevice(this.model);
      if (!data) {
        throw new Error('Failed to get device data');
      }

      [
        'info_url',
        'install_url',
        'name',
        'oem',
      ].forEach(k => this[k] = data[k]);
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

.device .content {
  flex-grow: 1;
}
</style>
