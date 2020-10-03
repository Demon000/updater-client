<template>
  <router-view
      id="sidebar"
      name="sidebar"
  ></router-view>
  <router-view
      id="main"
      name="main"
      v-bind:key="$route.fullPath"
  ></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>
