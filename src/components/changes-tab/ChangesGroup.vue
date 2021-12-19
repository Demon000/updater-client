<template>
  <div class="group" v-if="items.length">
    <div
        class="group-header"
        v-if="build"
    >
      <template v-if="build.filename === 'next'">
        To be included in next {{ build.version }} build
      </template>
      <template v-else>
        Included in {{ build.filename }}
      </template>
    </div>
      <change
          v-for="change in items"
          v-bind:key="change.url"
          v-bind="change"
      ></change>
  </div>
</template>

<script>
import Change from './Change.vue';

export default {
  name: 'ChangesGroup',
  components: {
    Change,
  },
  props: {
    build: Object,
    items: Array,
  },
}
</script>

<style scoped>
@import '../../css/group.css';
</style>