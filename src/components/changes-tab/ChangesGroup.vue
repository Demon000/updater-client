<template>
  <div class="changes-group" v-if="items.length">
    <div class="header">
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
.changes-group .header {
  padding: 16px 16px 0 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: #167c80;
  letter-spacing: 1px;
}

.changes-group {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>