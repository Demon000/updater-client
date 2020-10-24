<template>
  <div class="group changes-group" v-if="items.length">
    <div class="group-header">
      <template v-if="build.filename === 'next'">
        To be included in next {{ build.version }} build
      </template>
      <template v-else>
        Included in {{ build.filename }}
      </template>
    </div>
    <template v-for="change in items">
      <change v-bind="change"></change>
    </template>
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