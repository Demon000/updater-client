<template>
  <div class="changes-tab-page">
    <div
        class="list-container"
        ref="scrollable"
    >
      <div class="list">
        <template v-if="model">
          <template v-for="buildChanges in buildsChanges">
            <changes-group v-bind="buildChanges"></changes-group>
          </template>
        </template>
        <template v-else>
          <template v-for="change in changes">
            <change v-bind="change"></change>
          </template>
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
      scrollbar: null,
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
      this.reloadDeviceChanges();
    },
    changes() {
      this.reloadDeviceChanges();
      this.checkScrolledToBottom();
    },
  },
  mounted() {
    this.stopLoading = false;
    this.scrollbar = new SimpleBar(this.$refs.scrollable);
    this.scrollable = this.scrollbar.getScrollElement();
    this.scrollable.addEventListener('scroll', this.checkScrolledToBottom);

    this.checkScrolledToBottom();
  },
  unmounted() {
    this.scrollable.removeEventListener('scroll', this.checkScrolledToBottom);
    this.scrollbar.unMount();
    this.stopLoading = true;
  },
  methods: {
    reloadDeviceChanges() {
      if (this.model) {
        this.buildsChanges = ApiService.getDeviceChanges(this.model);
      }
    },
    isScrolledToBottom(el) {
      return el.scrollHeight - el.scrollTop - el.clientHeight < 1;
    },
    checkScrolledToBottom() {
      if (!this.isScrolledToBottom(this.scrollable)) {
        return;
      }

      if (this.stopLoading) {
        return;
      }

      this.loadMoreChanges();
    },
    async loadMoreChanges() {
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
.changes-tab-page {
  width: 100%;
  height: 100%;

  display: flex;
}

.changes-tab-page .list-container {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.changes-tab-page .list {
  min-width: 0;
  max-width: 756px;
  margin: 0 auto;
}
</style>
