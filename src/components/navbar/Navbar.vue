<template>
  <div class="navbar">
    <div class="top">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="tabs">
      <slot name="tabs"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    model: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    oem: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
    versions: {
      type: Array,
      default: [],
    },
  },
}
</script>

<style scoped>
.navbar {
  width: 100%;

  font-size: 18px;

  position: relative;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  padding: 0 32px;
}

.navbar .top {
  padding: 16px 0;
  line-height: 24px;
  min-height: 56px;

  display: flex;
  justify-content: space-between;
}
.navbar .tabs {
  min-height: 48px;
  line-height: 48px;
}

.navbar .tabs::v-deep(.tab) {
  vertical-align: top;

  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);

  display: inline-block;

  height: 48px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 24px;
  text-transform: uppercase;
}

.navbar .tabs::v-deep(.tab.router-link-exact-active) {
  border-bottom: 4px solid #167c80;
}
</style>
