<template>
  <div class="skeleton">
    <div
      class="title"
      :style="{
        width: titleWidth,
      }"
    ></div>
    <div class="type"></div>
    <div
      class="repo"
      :style="{
        width: repoWidth,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  data() {
    return {
      titleWidth: '0px',
      repoWidth: '0px',
    }
  },
  computed: {
    height() {
      return this.$el.clientHeight;
    },
  },
  mounted() {
    this.titleWidth = Math.floor(50 + Math.random() * 50) + '%';
    this.repoWidth = Math.floor(160 + Math.random() * 60) + 'px';
  },
}
</script>

<style scoped>
.skeleton {
  height: 68px;
  width: 100%;
  padding: 8px 0px;
  max-width: 500px;
}

.skeleton * {
  --text: rgba(0, 0, 0, 0.2);
  --bubble: rgba(0, 0, 0, 0.08);
  --background: white;

  border-radius: 12px;

  background-repeat: no-repeat;
  background-image:
    linear-gradient(
        90deg,
        transparent 0%,
        var(--background) 50%,
        transparent 100%
      );

  background-size:
    40% 100%;

  background-position:
    -350% 0;

  animation: loading 3.5s infinite;
}

#app.dark .skeleton * {
  --text: rgba(255, 255, 255, 0.20);
  --bubble: rgba(255, 255, 255, 0.08);
  --background: rgba(18, 18, 18, 0.5);
}

@keyframes loading {
  to {
    background-position:
      350% 0;
  }
}

.skeleton .title {
  background-color: var(--text);
  width: 100%;
  height: 1em;
  margin-top: 6px;
}

.skeleton .type {
  background-color: var(--bubble);
  margin: 6px 8px 6px 0px;
  width: 100px;
  max-width: 160px;
  height: 24px;
  display: inline-block;
}

.skeleton .repo {
  background-color: var(--text);
  margin: 6px 0px 12px 0px;
  width: 180px;
  height: 1em;
  display: inline-block;
  font-size: 12px;
}
</style>
