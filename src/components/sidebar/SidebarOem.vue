<template>
  <collapsible
      class="sidebar-oem"
      v-bind:forceExpanded="forceExpanded"
      v-bind:class="{
        'hidden': hidden,
      }"
  >
    <template v-slot:title="{ isExpanded }">
      <div
          class="title-container"
          v-bind:class="{
            expanded: isExpanded
          }"
      >
        <span class="title">
          {{ name }}
        </span>
        <i
            class="mdi mdi-chevron-down icon"
            v-if="!forceExpanded"
        >
        </i>
      </div>
    </template>
    <template v-slot:content>
      <div class="devices-container">
        <div class="devices">
          <template v-for="device in devices">
            <sidebar-device
                v-bind="device"
            ></sidebar-device>
          </template>
        </div>
      </div>
    </template>
  </collapsible>
</template>

<script>
import Collapsible from '../utils/Collapsible.vue';
import SidebarDevice from './SidebarDevice.vue';

export default {
  name: 'SidebarOem',
  props: {
    'name': {
      type: String,
    },
    'devices': {
      type: Array,
    },
    'forceExpanded': {
      type: Boolean,
      default: false,
    },
    'hidden': {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SidebarDevice,
    Collapsible,
  },
}
</script>

<style>
.sidebar-oem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  user-select: none;
}

.sidebar-oem.hidden {
  display: none;
}

.sidebar-oem .title-container {
  line-height: 16px;

  font-size: 14px;
  font-weight: 500;
}

.sidebar-oem .title-container {
  height: 48px;
  padding: 16px;
  position: relative;
  display: flex;
  justify-content: space-between;

  transition:
      height 0.25s ease-out,
      padding 0.25s ease-out,
      background 0.25s ease-out;

  cursor: pointer;
}

.sidebar-oem .title-container.expanded {
  height: 64px;
  padding: 24px 16px;

  background: rgba(0, 0, 0, 0.12)
}

.sidebar-oem .title-container .icon {
  font-size: 24px;

  transition:
      top 0.25s ease-out,
      transform 0.125s ease-out;

  color: rgba(0, 0, 0, 0.38);
}

.sidebar-oem .title-container.expanded .icon {
  transform: rotate(-180deg);
}

.sidebar-oem a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}
</style>
