<template>
  <div class="group extras-group">
    <div class="group-header">
      {{ version }}
    </div>
    <template v-for="extra in extras">
      <downloadable v-bind="extra"></downloadable>
    </template>
  </div>
</template>

<script>
import Downloadable from '../downloadable/Downloadable.vue';

export default {
  name: 'ExtrasGroup',
  components: {
    Downloadable,
  },
  props: {
    version: String,
    extras: Array,
  },
}
</script>

<style scoped>
@import '../../css/group.css';
</style>