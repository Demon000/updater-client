<template>
  <router-link
      v-bind:to="{
        name: 'device_builds',
        params: {
          model,
        },
      }"
  >
    <div
        class="sidebar-device"
        v-bind:class="{
          'hidden': hidden,
          'selected': selected,
        }"
    >
      <span class="device-name">
        {{ name }}
      </span>
      <span class="device-model">
        {{ model }}
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'SidebarDevice',
  props: {
    hidden: Boolean,
    selected: Boolean,
    name: String,
    model: String,
  },
}
</script>

<style scoped>
.sidebar-device.hidden {
  display: none;
}

.sidebar-device {
  line-height: 16px;

  font-size: 14px;
  font-weight: 500;
}

.sidebar-device {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 16px 16px 32px;

  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.sidebar-device .device-model {
  color: rgba(0, 0, 0, 0.25);
}

.sidebar-device.selected {
  background: #167c80;
}

.sidebar-device.selected .device-name {
  color: rgba(255, 255, 255, 0.87);
}

.sidebar-device.selected .device-model {
  color: rgba(255, 255, 255, 0.5);
}
</style>
