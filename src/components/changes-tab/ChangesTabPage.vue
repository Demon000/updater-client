<template>
  <div
      class="tab-page changes-tab-page"
      ref="scrollableContainer"
  >
    <div
        class="list-container"
        data-simplebar
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
      <div class="list" v-if="anyLoading" style="padding: 16px">
        <skeleton ref="firstSkeleton"/>
        <template v-for="n in skeletonCount - 1">
          <skeleton />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleBar from 'simplebar';
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

    this.$nextTick(() => {
      const scrollbarElement = this.$refs.scrollableContainer.querySelector('[data-simplebar]');
      const scrollbar = SimpleBar.instances.get(scrollbarElement);
      this.scrollable = scrollbar.getScrollElement();
      this.scrollable.addEventListener('scroll', this.loadChangesIfScrolledCompletely);
    });

    if (this.$refs.firstSkeleton != undefined) {
      this.skeletonHeight = this.$refs.firstSkeleton.getHeight;
    }
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

      try {
        this.calculateSkeletonCount();
        await ApiService.loadMoreChanges();
      } catch (err) {
        console.error(err);
      }
    },
    calculateSkeletonCount() {
      if (this.$refs.scrollableContainer == undefined) return;
      var containerHeight = this.$refs.scrollableContainer.clientHeight;
      var listHeight = this.$refs.listContainer.clientHeight;
      this.skeletonCount = Math.max((containerHeight - listHeight - 32) / this.skeletonHeight, 5);
      this.skeletonCount = Math.floor(this.skeletonCount);
    },
  },
}
</script>

<style scoped>
@import '../../css/tab-page.css';
</style>
