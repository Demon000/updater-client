<template>
  <div class="group">
    <div
        class="group-header"
        v-if="title"
    >
      {{ title }}
    </div>
    <downloadable
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind="item"
    ></downloadable>
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