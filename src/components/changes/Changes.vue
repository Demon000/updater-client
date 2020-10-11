<template>
  <div
      class="changes"
      ref="scrollable"
  >
    <horizontal-loader
        class="loading"
        v-if="isLoading"
    ></horizontal-loader>
    <template v-if="model">
      <template v-for="buildChanges in buildsChanges">
        <template v-if="buildChanges.items.length">
          <div class="header">
            <template v-if="buildChanges.for === 'next'">
              To be included in next build
            </template>
            <template v-else>
              Included in {{ buildChanges.for }}
            </template>
          </div>
          <template v-for="change in buildChanges.items">
            <change v-bind="change"></change>
          </template>
        </template>
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
import HorizontalLoader from '../utils/HorizontalLoader.vue';
import Change from './Change.vue';

export default {
  name: 'Changes',
  components: {
    HorizontalLoader,
    Change,
  },
  props: {
    model: String,
  },
  data() {
    return {
      buildsChanges: [],
      changes: [],
      page: 0,
      isLoading: false,
      scrollbar: null,
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
    this.scrollbar.getScrollElement().addEventListener('scroll', this.checkScrolledToBottom);
  },
  destroyed() {
    this.scrollbar.getScrollElement().removeEventListener('scroll', this.checkScrolledToBottom);
  },
  methods: {
    reloadChanges() {
      this.changes = [];
      this.buildsChanges = [];
      this.page = 0;
      this.loadMoreChanges();
    },
    isScrolledToBottom(el) {
      return el.scrollTop + el.offsetHeight >= el.scrollHeight - 64;
    },
    checkScrolledToBottom() {
      let scrollable = this.scrollbar.getScrollElement();
      if (!this.isScrolledToBottom(scrollable)) {
        return;
      }

      this.loadMoreChanges();
    },
    mergeBuildsChanges(buildsChanges) {
      for (const newBuildChanges of buildsChanges) {
        let found = false;

        for (const buildChanges of this.buildsChanges) {
          if (buildChanges.for !== newBuildChanges.for) {
            continue;
          }

          found = true;
          buildChanges.items = buildChanges.items.concat(newBuildChanges.items);
          break;
        }

        if (!found) {
          this.buildsChanges.push(newBuildChanges);
        }
      }
    },
    afterLoad() {
      this.page += 1;

      this.$nextTick(() => {
        this.isLoading = false;
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
            this.mergeBuildsChanges(response.data);
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

      this.isLoading = true;

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

.changes .header {
  padding: 16px 16px 0 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: #167c80;
  letter-spacing: 1px;
}

.changes .loading {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
