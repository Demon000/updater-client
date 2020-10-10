<template>
  <div class="builds">
    <template v-if="loaded">
      <div
          class="build"
          v-for="build in builds"
      >
        {{ build.filename }}
      </div>
    </template>
    <template v-else>
      <span>
        Loading...
      </span>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import {API_HOSTNAME} from '../../js/config';

export default {
  name: 'Builds',
  props: {
    model: String,
  },
  data() {
    return {
      builds: [],
      loaded: false,
    };
  },
  watch: {
    model() {
      this.loadBuilds();
    },
  },
  mounted() {
    this.loadBuilds();
  },
  methods: {
    loadBuilds() {
      axios
          .get(`${API_HOSTNAME}/api/v2/devices/${this.model}/builds`)
          .then(response => {
            this.builds = response.data;
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

</style>