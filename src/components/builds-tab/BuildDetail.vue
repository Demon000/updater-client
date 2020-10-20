<template>
  <div class="build-detail">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: 'BuildDetail',
  props: {
    title: String,
    value: String,
  },
}
</script>

<style scoped>
.build-detail {
  display: flex;
  padding: 4px 0;
}

.build-detail .title,
.build-detail .value {
  display: inline-block;
}

.build-detail .title {
  width: 25%;
  flex-shrink: 0;
  color: rgba(0, 0, 0, 0.6);
}

.build-detail .value {
  width: 85%;
  flex-shrink: 0;
  word-wrap: break-word;
}

@media (max-width: 1024px) {
  .build-detail {
    display: block;
  }

  .build-detail .title,
  .build-detail .value {
    display: block;
    width: 100%;
  }
}
</style>