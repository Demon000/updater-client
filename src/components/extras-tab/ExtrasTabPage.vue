<template>
  <div class="tab-page extras-tab-page">
    <div
        class="list-container"
        ref="scrollable"
    >
      <div class="list">
        <downloadable-group
            v-for="(extra, index) in extras"
            v-bind:key="index"
            v-bind="{
              title: extra.version,
              items: extra.extras,
            }"
        ></downloadable-group>
      </div>
    </div>
  </div>
</template>

<script>
import OverlayScrollbars from 'overlayscrollbars';
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
  computed: {
    extras() {
      return this.$store.getters.extras;
    },
  },
  mounted() {
    OverlayScrollbars(this.$refs.scrollable, {});
  },
}
</script>

<style scoped>
@import '../../css/tab-page.css';

</style>