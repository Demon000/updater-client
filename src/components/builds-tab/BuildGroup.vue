<template>
  <div class="group build-group">
    <downloadable
        v-bind="{
          date,
          datetime,
          filename,
          filepath,
          sha256,
          size,
          type,
          url,
          version,
        }"
    ></downloadable>
    <downloadable
        v-if="recovery"
        v-bind="recovery"
    ></downloadable>
  </div>
</template>

<script>
import Downloadable from '../downloadable/Downloadable.vue';

export default {
  name: 'BuildGroup',
  components: {
    Downloadable,
  },
  props: {
    build: Object,
    date: String,
    datetime: Number,
    filename: String,
    filepath: String,
    sha256: String,
    size: Number,
    type: String,
    url: String,
    version: String,
    recovery: Object,
  },
}
</script>

<style scoped>
@import '../../css/group.css';
</style>
