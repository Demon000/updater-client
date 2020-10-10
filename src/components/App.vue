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

<style>
#app {
  height: 100%;
  width: 100%;

  display: flex;
}

#sidebar {
  width: 300px;
  max-width: 30%;
  min-width: 128px;
  height: 100%;
}

#main {
  flex-grow: 1;
  height: 100%;
}
</style>