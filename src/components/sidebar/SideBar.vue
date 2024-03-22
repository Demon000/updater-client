<template>
  <div class="sidebar">
    <router-link to="/">
      <div class="logo bg-brand-primary">
        <div class="logo-wrapper" v-html="logo"></div>
      </div>
    </router-link>
    <device-selector v-bind:active-model="activeModel"></device-selector>
  </div>
</template>

<script>
import DeviceSelector from '../device-selector/DeviceSelector.vue'
import logo from '../../assets/logo.svg?raw'

export default {
  name: 'SideBar',
  components: {
    DeviceSelector
  },
  props: {
    activeModel: String
  },
  data() {
    return {
      logo
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;

  position: relative;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
}

.sidebar .logo {
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  height: 100px;
}

.sidebar .logo .logo-wrapper {
  height: 40px;
}

.sidebar .logo .logo-wrapper::v-deep(path) {
  fill: #fff;
}
</style>
