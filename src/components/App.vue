<template>
  <router-view
      id="sidebar"
      name="sidebar"
  ></router-view>
  <router-view
      id="main"
      name="main"
  ></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>
