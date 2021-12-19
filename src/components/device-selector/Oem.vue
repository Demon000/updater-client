<template>
  <collapsible
      class="oem"
      v-bind:forceExpanded="forceExpanded"
      v-bind:class="{
        'hidden': hidden,
      }"
  >
    <template
        v-slot:title="{
          isExpanded,
          toggleManualExpansion,
        }"
    >
      <div
          class="title-container"
          v-on:click="toggleManualExpansion"
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
          <device
              v-for="(device, index) in devices"
              v-bind:key="index"
              v-bind="device"
          ></device>
        </div>
      </div>
    </template>
  </collapsible>
</template>

<script>
import Collapsible from '../utils/Collapsible.vue';
import Device from './Device.vue';

export default {
  name: 'Oem',
  props: {
    name: String,
    devices: Array,
    forceExpanded: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Device,
    Collapsible,
  },
}
</script>

<style scoped>
.oem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  user-select: none;
}

#app.dark .oem {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.oem.hidden {
  display: none;
}

.oem .title-container {
  line-height: 16px;

  font-size: 14px;
  font-weight: 500;
}

.oem .title-container {
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

.oem .title-container.expanded {
  height: 64px;
  padding: 24px 16px;

  background: rgba(0, 0, 0, 0.12)
}

#app.dark .oem .title-container.expanded {
  background: rgba(255, 255, 255, 0.05)
}

.oem .title-container .icon {
  font-size: 24px;

  transition:
      top 0.25s ease-out,
      transform 0.125s ease-out;

  color: rgba(0, 0, 0, 0.38);
}

#app.dark .oem .title-container .icon {
  color: rgba(255, 255, 255, 0.38);
}

.oem .title-container.expanded .icon {
  transform: rotate(-180deg);
}

.oem a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}

#app.dark .oem a {
  color: rgba(255, 255, 255, 0.87);
}
</style>
