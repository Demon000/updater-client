<template>
  <div
      class="changes"
      ref="scrollable"
  >
    <template v-if="model">
      <template v-for="buildChanges in buildsChanges">
        <build-changes v-bind="buildChanges"></build-changes>
      </template>
    </template>
    <template v-else>
      <template v-for="change in changes">
        <change v-bind="change"></change>
      </template>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import SimpleBar from 'simplebar';
import {API_HOSTNAME} from '../../js/config';
import Change from './Change.vue';
import BuildChanges from './BuildChanges.vue';
import LoadingMixin from '../utils/LoadingMixin';

export default {
  name: 'Changes',
  mixins: [
    LoadingMixin,
  ],
  components: {
    BuildChanges,
    Change,
  },
  props: {
    model: String,
  },
  data() {
    return {
      buildsChanges: [],
      bumpedBuildsChanges: [],
      changes: [],
      page: 0,
      scrollbar: null,
      scrollable: null,
    };
  },
  watch: {
    model() {
      this.reloadChanges();
    },
  },
  mounted() {
    this.reloadChanges();

    this.scrollbar = new SimpleBar(this.$refs.scrollable);
    this.scrollable = this.scrollbar.getScrollElement();
    this.scrollable.addEventListener('scroll', this.checkScrolledToBottom);
  },
  unmounted() {
    this.scrollable.removeEventListener('scroll', this.checkScrolledToBottom);
    this.scrollbar.unMount();
  },
  methods: {
    reloadChanges() {
      this.changes = [];
      this.buildsChanges = [];
      this.page = 0;
      this.loadMoreChanges();
    },
    extractBumpedChanges(buildsChanges) {
      const bumpedBuildsChanges = [];

      for (const newBuildChanges of buildsChanges) {
        if (!newBuildChanges.items.length) {
          continue;
        }

        const bumpedBuildChanges = {
          build: newBuildChanges.build,
          items: [],
        };

        for (let i = newBuildChanges.items.length - 1; i >= 0; i--) {
          const change = newBuildChanges.items[i];
          if (change.updated > change.submitted) {
            bumpedBuildChanges.items.push(change);
            newBuildChanges.items.splice(i, 1);
          }
        }

        bumpedBuildsChanges.push(bumpedBuildChanges);
      }

      return bumpedBuildsChanges;
    },
    mergeBuildsChanges(buildsChanges, targetBuildsChanges, checkIfHasAny=false) {
      for (const newBuildChanges of buildsChanges) {
        let found = false;

        if (!newBuildChanges.items.length) {
          continue;
        }

        for (const buildChanges of targetBuildsChanges) {
          if (buildChanges.build.filename !== newBuildChanges.build.filename ||
              buildChanges.build.version !== newBuildChanges.build.version) {
            continue;
          }

          found = true;

          if (!checkIfHasAny || buildChanges.items.length !== 0) {
            buildChanges.items = buildChanges.items.concat(newBuildChanges.items);
            newBuildChanges.items = [];
          }

          break;
        }

        if (!found) {
          targetBuildsChanges.push(newBuildChanges);
        }
      }
    },
    sortBuildsChanges(buildsChanges) {
      buildsChanges.sort((first, second) => {
        if (first.build.filename === 'next') {
          if (second.build.filename === 'next') {
            return parseFloat(second.build.version) - parseFloat(first.build.version);
          } else {
            return -1;
          }
        } else {
          if (second.build.filename === 'next') {
            return 1;
          }
        }

        return second.build.datetime - first.build.datetime;
      });

      for (const buildChanges of buildsChanges) {
        buildChanges.items.sort((first, second) => {
          return second.submitted - first.submitted;
        });
      }
    },
    isScrolledToBottom(el) {
      return el.scrollHeight - el.scrollTop === el.clientHeight;
    },
    checkScrolledToBottom() {
      if (!this.isScrolledToBottom(this.scrollable)) {
        return;
      }

      this.loadMoreChanges();
    },
    afterLoad() {
      this.page += 1;

      this.$nextTick(() => {
        this.setLoading(false);
        this.checkScrolledToBottom();
      });
    },
    loadDeviceChanges() {
      axios
          .get(`${API_HOSTNAME}/api/v2/devices/${this.model}/changes`, {
            params: {
              page: this.page,
            },
          })
          .then(response => {
            const buildsChanges = response.data;
            const bumpedBuildsChanges = this.extractBumpedChanges(buildsChanges);
            this.mergeBuildsChanges(bumpedBuildsChanges, this.bumpedBuildsChanges);
            this.mergeBuildsChanges(buildsChanges, this.buildsChanges);
            this.mergeBuildsChanges(this.bumpedBuildsChanges, this.buildsChanges, true);
            this.sortBuildsChanges(this.buildsChanges);
            this.afterLoad();
          })
          .catch(err => {
            console.error(err);
          });
    },
    mergeAllChanges(changes) {
      this.changes = this.changes.concat(changes);
    },
    loadAllChanges() {
      axios
          .get(`${API_HOSTNAME}/api/v2/changes`, {
            params: {
              page: this.page,
            },
          })
          .then(response => {
            this.mergeAllChanges(response.data);
            this.afterLoad();
          })
          .catch(err => {
            console.error(err);
          });
    },
    loadMoreChanges() {
      if (this.isLoading) {
        return;
      }

      this.setLoading(true);

      if (this.model) {
        this.loadDeviceChanges();
      } else {
        this.loadAllChanges();
      }
    },
  },
}
</script>

<style scoped>
.changes {
  width: 100%;
  max-height: 100%;
  overflow: auto;

  position: relative;
}
</style>
