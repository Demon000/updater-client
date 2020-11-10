<template>
  <div
      class="tab-page changes-tab-page"
      ref="scrollableContainer"
  >
    <div
        class="list-container"
        data-simplebar
    >
      <div class="list">
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
    </div>
  </div>
</template>

<script>
import SimpleBar from 'simplebar';
import Change from './Change.vue';
import ChangesGroup from './ChangesGroup.vue';
import ApiService from '../../js/ApiService';
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
  },
  props: {
    model: String,
  },
  data() {
    return {
      buildsChanges: [],
      scrollable: null,
      stopLoading: false,
    };
  },
  computed: {
    changes() {
      return this.$store.getters.changes;
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
        await ApiService.loadMoreChanges();
      } catch (err) {
        console.error(err);
      }
    },
  },
}
</script>

<style scoped>
@import '../../css/tab-page.css';
</style>
