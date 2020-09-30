<template>
  <div class="all-devices">
    <changelist device="all"></changelist>
  </div>
</template>

<script>
import Changelist from './Changelist.vue';

export default {
  name: 'AllDevices',
  components: {
    Changelist,
  },
}
</script>

<style scoped>
.all-devices {
  height: 100%;
  width: 100%;
}
</style>
