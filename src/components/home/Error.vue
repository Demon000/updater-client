<template>
  <div class="error">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    message: {
      type: String,
      default: 'An unknown error occurred',
    },
  },
}
</script>

<style scoped>
.error {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
}
</style>