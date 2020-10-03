<template>
  <div class="device">
    <template v-if="model">
      <navbar
          v-bind="{
            model,
            name,
            oem,
          }"
      ></navbar>
    </template>
    <template v-else>
      <navbar
          v-bind="{
            text: 'All devices',
          }"
      ></navbar>
    </template>
    <changelist
        class="content"
        v-bind:model="model ? model : 'all'"
    ></changelist>
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
    };
  },
  mounted() {
    if (this.model) {
      this.loadDeviceDetails();
    }
  },
  methods: {
    loadDeviceDetails() {
      axios
          .get(`${API_HOSTNAME}/api/v2/devices/${this.model}`)
          .then(response => {
            ['builds', 'info_url', 'install_url', 'name', 'oem', 'versions']
              .forEach(k => this[k] = response.data[k]);
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

.device .content {
  flex-grow: 1;
  overflow: auto;
}
</style>
