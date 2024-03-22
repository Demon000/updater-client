<template>
  <div class="loader-track bg-brand-primary/[.5]">
    <div class="loader-first bg-brand-primary"></div>
    <div class="loader-second bg-brand-primary"></div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalLoader'
}
</script>

<style scoped>
.loader-track {
  height: 4px;
  width: 100%;

  position: relative;

  overflow: hidden;
}

.loader-first,
.loader-second {
  height: 100%;
  width: auto;

  top: 0;
  left: 0;

  position: absolute;
}

.loader-first {
  animation: horizontal-loader-animation-first 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.loader-second {
  animation: horizontal-loader-animation-second 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s
    infinite;
}

@keyframes horizontal-loader-animation-first {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes horizontal-loader-animation-second {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}
</style>
