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
          <template v-for="buildChanges in buildsChanges">
            <changes-group v-bind="buildChanges"></changes-group>
          </template>
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
        <template v-for="i in skeletonCount" :key="i">
          <skeleton></skeleton>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Change from './Change.vue';
import ChangesGroup from './ChangesGroup.vue';
import ApiService from '../../js/ApiService';
import Skeleton from '../utils/Skeleton.vue';
import {beforeTryError} from '../../js/router_utils';

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
    Change,
    Skeleton,
  },
  props: {
    model: String,
  },
  data() {
    return {
      buildsChanges: [],
      scrollable: null,
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
      this.loadInitialChanges();
    },
    changes() {
      this.reloadDeviceChanges();
      this.loadChangesIfCannotScroll();
    },
  },
  mounted() {
    this.stopLoading = false;

    this.scrollable = this.$refs.scrollable;
    this.scrollable.addEventListener('scroll', this.loadChangesIfScrolledCompletely);

    this.skeletonHeight = this.$refs.hiddenSkeleton.height;
    this.calculateSkeletonCount();

    this.loadInitialChanges();
  },
  unmounted() {
    this.scrollable.removeEventListener('scroll', this.loadChangesIfScrolledCompletely);
    this.stopLoading = true;
  },
  methods: {
    hasAnyChanges() {
      if (this.model) {
        for (const buildChanges of this.buildsChanges) {
          if (buildChanges.items.length) {
            return true;
          }
        }
      } else {
        if (this.changes.length) {
          return true;
        }
      }

      return false;
    },
    loadInitialChanges() {
      this.reloadDeviceChanges();

      if (this.hasAnyChanges()) {
        return;
      }

      this.loadMoreChanges();
    },
    reloadDeviceChanges() {
      if (this.model) {
        this.buildsChanges = ApiService.getDeviceChanges(this.model);
      }
    },
    isScrolledToBottom(el) {
      return el.scrollHeight - el.scrollTop - el.clientHeight < 1;
    },
    isScrollable(el) {
      return el.scrollHeight > el.clientHeight;
    },
    loadChangesIfCannotScroll() {
      if (this.isScrollable(this.scrollable)) {
        return;
      }

      this.loadMoreChanges();
    },
    loadChangesIfScrolledCompletely() {
      if (!this.isScrolledToBottom(this.scrollable)) {
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
