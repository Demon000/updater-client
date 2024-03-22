<template>
  <div class="navbar">
    <div class="top">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="right">
        <slot name="right">
          <div class="logo" v-html="logo"></div>
        </slot>
      </div>
    </div>
    <div class="tabs">
      <slot name="tabs"></slot>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/logo.svg?raw'

export default {
  name: 'NavBar',
  props: {
    model: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    },
    oem: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    },
    versions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      logo
    }
  }
}
</script>

<style scoped>
.navbar {
  width: 100%;

  font-size: 18px;

  position: relative;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
}

.navbar .top {
  line-height: 24px;
  height: 56px;

  display: flex;
  justify-content: space-between;
}

.navbar .left,
.navbar .right {
  height: 100%;
  padding: 16px;
}

.navbar .left {
  display: flex;

  overflow: auto;
  white-space: nowrap;
}

.navbar .logo {
  height: 24px;

  display: none;
}

.navbar .logo::v-deep(path) {
  fill: var(--tw-brand-primary);
}

.navbar .tabs {
  line-height: 16px;

  overflow: auto;
  white-space: nowrap;

  display: flex;
}

.navbar .tabs::v-deep(.tab) {
  padding: 8px 16px 16px 16px;
  text-decoration: none;

  display: block;

  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
}

.navbar .tabs::v-deep(.mobile-visible-tab) {
  display: none;
}

.navbar .tabs::v-deep(.tab.router-link-exact-active) {
  border-bottom: 4px solid var(--tw-brand-primary);
}

@media (max-width: 1024px) {
  .navbar .tabs::v-deep(.mobile-visible-tab) {
    display: block;
  }

  .navbar .logo {
    display: block;
  }
}
</style>
