<template>
  <div class="build-group">
    <build
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
    ></build>
    <build
        v-if="recovery"
        v-bind="recovery"
    ></build>
  </div>
</template>

<script>
import Build from './Build.vue';

export default {
  name: 'BuildGroup',
  components: {
    Build,
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
.build-group {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>