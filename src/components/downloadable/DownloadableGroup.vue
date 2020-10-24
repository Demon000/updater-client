<template>
  <div class="group">
    <div class="group-header" v-if="title">
      {{ title }}
    </div>
    <template v-for="item in items">
      <downloadable v-bind="item"></downloadable>
    </template>
  </div>
</template>

<script>
import Downloadable from './Downloadable.vue';

export default {
  name: 'DownloadableGroup',
  components: {
    Downloadable,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    items: Array,
  },
}
</script>

<style scoped>
@import '../../css/group.css';
</style>