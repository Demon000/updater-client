<template>
  <div class="tab-page extras-tab-page">
    <div
        class="list-container"
        ref="scrollable"
    >
      <div class="list">
        <template v-for="extra in extras">
          <downloadable-group
              v-bind="{
                title: extra.version,
                items: extra.extras,
              }"
          ></downloadable-group>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';
import DownloadableGroup from '../downloadable/DownloadableGroup.vue';
import {beforeTryError} from '../../js/router_utils';
import ApiService from '../../js/ApiService';

const loadExtrasBeforeHook = beforeTryError(() => {
  return ApiService.loadExtras();
});

export default {
  name: 'ExtrasTabPage',
  components: {
    DownloadableGroup,
  },
  beforeRouteEnter: loadExtrasBeforeHook,
  beforeRouteUpdate: loadExtrasBeforeHook,
  mounted() {
    new PerfectScrollbar(this.$refs.scrollable);
  },
  computed: {
    extras() {
      return this.$store.getters.extras;
    },
  },
}
</script>

<style scoped>
@import '../../css/tab-page.css';

</style>