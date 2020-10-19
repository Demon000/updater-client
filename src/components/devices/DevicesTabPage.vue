<template>
  <div class="devices-tab-page tab-page">
    <div class="list-container">
      <div class="list">

      </div>
    </div>
  </div>
</template>

<script>
import DeviceSelectorMixin from '../device-selector/DeviceSelectorMixin';

export default {
  name: 'DevicesTab',
  mixins: [
      DeviceSelectorMixin,
  ],
}
</script>

<style scoped>
@import '../../css/tab-page.css';
</style>
