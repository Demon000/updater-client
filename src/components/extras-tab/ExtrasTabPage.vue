<template>
  <div class="tab-page extras-tab-page">
    <div
        class="list-container"
        ref="scrollable"
    >
      <div class="list">
        <template v-for="extra in extras">
          <extras-group v-bind="extra"></extras-group>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ExtrasGroup from './ExtrasGroup.vue';
import {beforeTryError} from '../../js/router_utils';
import ApiService from '../../js/ApiService';

const loadExtrasBeforeHook = beforeTryError(() => {
  return ApiService.loadExtras();
});

export default {
  name: 'ExtrasTabPage',
  components: {
    ExtrasGroup,
  },
  beforeRouteEnter: loadExtrasBeforeHook,
  beforeRouteUpdate: loadExtrasBeforeHook,
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