<template>
  <router-view id="sidebar" name="sidebar"></router-view>
  <router-view id="main" name="main" v-bind:key="$route.fullPath"></router-view>
</template>

<script>
import Sidebar from './Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
}
</script>

<style scoped>
#sidebar {
  width: 300px;
  max-width: 30%;
  min-width: 128px;
  height: 100%;
  overflow: auto;
}

#main {
  flex-grow: 1;
  height: 100%;
  overflow: auto;
}
</style>
