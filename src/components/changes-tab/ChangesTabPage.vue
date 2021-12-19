<template>
  <div
      class="tab-page changes-tab-page"
      ref="scrollableContainer"
  >
    <skeleton
        class="skeleton-hidden"
        ref="hiddenSkeleton"
    ></skeleton>
    <div
        class="list-container"
        ref="scrollable"
    >
      <div class="list" ref="listContainer">
        <template v-if="model">
          <changes-group
              v-for="(buildChanges, index) in buildsChanges"
              v-bind:key="index"
              v-bind="buildChanges"
          ></changes-group>
        </template>
        <template v-else>
          <changes-group
              v-bind="{
                items: changes,
              }"
          ></changes-group>
        </template>
      </div>
      <div class="list" v-if="anyLoading">
        <skeleton
          v-for="i in skeletonCount"
          v-bind:key="i"
        ></skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';
import ChangesGroup from './ChangesGroup.vue';
import ApiService from '../../js/ApiService';
import Skeleton from '../utils/Skeleton.vue';
import {beforeTryError} from '../../js/router_utils';
import { nextTick } from '@vue/runtime-core';

const loadDeviceBuildsBeforeHook = beforeTryError((to) => {
  if (!to.params.model) {
    return;
  }

  return ApiService.loadDeviceBuilds(to.params.model);
});

export default {
  name: 'ChangesTabPage',
  components: {
    ChangesGroup,
    Skeleton,
  },
  props: {
    model: String,
  },
  data() {
    return {
      scrollbar: undefined,
      buildsChanges: [],
      stopLoading: false,
      skeletonCount: 5,
      skeletonHeight: 1,
    };
  },
  computed: {
    changes() {
      return this.$store.getters.changes;
    },
    anyLoading() {
      return !!this.$store.getters.ongoingRequests;
    },
  },
  beforeRouteEnter: loadDeviceBuildsBeforeHook,
  beforeRouteUpdate: loadDeviceBuildsBeforeHook,
  watch: {
    model() {
      this.reloadChanges();
    },
    changes: {
      handler() {
        this.reloadChanges();
      },
      deep: true,
    },
  },
  mounted() {
    this.stopLoading = false;

    this.scrollbar = new PerfectScrollbar(this.$refs.scrollable);
    this.$refs.scrollable.addEventListener('scroll', this.loadChangesIfNeeded);

    this.skeletonHeight = this.$refs.hiddenSkeleton.height;
    this.calculateSkeletonCount();

    this.reloadChanges();
  },
  beforeUnmount() {
    this.$refs.scrollable.removeEventListener('scroll', this.loadChangesIfNeeded);
    this.stopLoading = true;
  },
  methods: {
    reloadChanges() {
      if (this.model) {
        this.buildsChanges = ApiService.getDeviceChanges(this.model);
      }

      nextTick(() => {
        this.scrollbar.update();
        this.loadChangesIfNeeded();
      });
    },
    isScrolledToBottom(el) {
      return el.scrollHeight - el.scrollTop - el.clientHeight < 1;
    },
    isScrollable(el) {
      return el.scrollHeight > el.clientHeight;
    },
    loadChangesIfNeeded() {
      if (!this.$refs.scrollable) {
        return;
      }

      if (!this.isScrolledToBottom(this.$refs.scrollable)
          && this.isScrollable(this.$refs.scrollable)) {
        return;
      }

      this.loadMoreChanges();
    },
    async loadMoreChanges() {
      if (this.stopLoading) {
        return;
      }

      this.calculateSkeletonCount();

      try {
        await ApiService.loadMoreChanges();
      } catch (err) {
        console.error(err);
      }
    },
    calculateSkeletonCount() {
      const containerHeight = this.$refs.scrollableContainer.clientHeight;
      const listHeight = this.$refs.listContainer.clientHeight;
      const fillableHeight = containerHeight - listHeight;
      if (fillableHeight <= 0) {
        this.skeletonCount = 0;
      } else {
        this.skeletonCount = Math.floor(fillableHeight / this.skeletonHeight);
      }
    },
  },
}
</script>

<style scoped>
@import '../../css/tab-page.css';

.skeleton-hidden {
  visibility: hidden;
  position: absolute;
}
</style>
