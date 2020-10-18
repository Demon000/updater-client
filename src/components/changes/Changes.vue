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
import SimpleBar from 'simplebar';
import Change from './Change.vue';
import BuildChanges from './BuildChanges.vue';
import ApiService from '../../js/ApiService';
import {beforeTryError} from '../../js/router_utils';

const loadDeviceBuildsBeforeHook = beforeTryError((to) => {
  if (!to.params.model) {
    return;
  }

  return ApiService.loadDeviceBuilds(to.params.model);
});

export default {
  name: 'Changes',
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
      scrollbar: null,
      scrollable: null,
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
    },
  },
  mounted() {
    this.scrollbar = new SimpleBar(this.$refs.scrollable);
    this.scrollable = this.scrollbar.getScrollElement();
    this.scrollable.addEventListener('scroll', this.checkScrolledToBottom);

    this.loadMoreChanges();
  },
  unmounted() {
    this.scrollable.removeEventListener('scroll', this.checkScrolledToBottom);
    this.scrollbar.unMount();
  },
  methods: {
    reloadDeviceChanges() {
      if (this.model) {
        this.buildsChanges = ApiService.getDeviceChanges(this.model);
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
    async loadMoreChanges() {
      try {
        await ApiService.loadMoreChanges();
        this.checkScrolledToBottom();
      } catch (err) {
        console.error(err);
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
