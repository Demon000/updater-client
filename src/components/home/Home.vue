<template>
  <div class="home">
    <navbar>
      <template v-slot:left>
      <span class="text">
        All devices
      </span>
      </template>
      <template v-slot:tabs>
        <router-link
            class="tab"
            v-bind:to="{
            name: 'home_changes',
          }"
        >
          Changes
        </router-link>
      </template>
    </navbar>

    <router-view class="content"></router-view>
  </div>
</template>

<script>
import Navbar from '../navbar/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
  },
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}

.home .navbar {
  flex-shrink: 0;
}

.home .content {
  flex-grow: 1;
}
</style>
