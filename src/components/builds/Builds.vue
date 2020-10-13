<template>
  <div class="builds">
    <div
        class="build"
        v-for="build in builds"
    >
      {{ build.filename }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {API_HOSTNAME} from '../../js/config';
import LoadingMixin from '../utils/LoadingMixin';

export default {
  name: 'Builds',
  mixins: [
    LoadingMixin,
  ],
  props: {
    model: String,
  },
  data() {
    return {
      builds: [],
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
      this.setLoading(true);

      axios
          .get(`${API_HOSTNAME}/api/v2/devices/${this.model}/builds`)
          .then(response => {
            this.builds = response.data;

            this.$nextTick(() => {
              this.setLoading(false);
            });
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