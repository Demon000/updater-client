<template>
  <collapsible class="oem"
               v-bind:forceExpanded="forceExpanded"
               v-bind:class="{
                 'hidden': hidden,
               }"
  >
    <template v-slot:title="{ isExpanded }">
      <div class="title-container"
           v-bind:class="{ expanded: isExpanded }"
      >
        <span class="title">
          {{ name }}
        </span>
        <i class="mdi icon"
           v-bind:class="{
             'mdi-chevron-up': isExpanded,
             'mdi-chevron-down': !isExpanded,
          }"
          v-if="!forceExpanded"
        >
        </i>
      </div>
    </template>
    <template v-slot:content>
      <div class="devices-container">
        <div class="devices">
          <router-link v-bind:to="{
            name: 'device',
            params: {
              device: device.model,
            },
          }" v-for="device in devices"
          >
            <div class="device"
                 v-bind:class="{
                   'hidden': device.hidden,
                   'selected': device.selected,
                 }"
            >
              <span class="device-name">
                {{ device.name }}
              </span>
              <span class="device-model">
                {{ device.model }}
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </template>
  </collapsible>
</template>

<script>
import Collapsible from './Collapsible.vue';

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
    Collapsible,
  },
}
</script>

<style>
.oem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  user-select: none;
}

.oem.hidden,
.device.hidden {
  display: none;
}

.title-container,
.device {
  line-height: 16px;

  font-size: 14px;
  font-weight: 500;
}

.title-container {
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

.title-container.expanded {
  height: 64px;
  padding: 24px 16px;

  background: rgba(0, 0, 0, 0.12)
}

.icon {
  font-size: 24px;

  transition: top 0.25s ease-out;

  color: rgba(0, 0, 0, 0.38);
}

.oem a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
}

.device {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 16px 16px 32px;

  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.device.selected {
  background: #167c80;
}

.device.selected .device-name {
  color: rgba(255, 255, 255, 0.87);
}

.device.selected .device-model {
  color: rgba(255, 255, 255, 0.5);
}

.device-model {
  color: rgba(0, 0, 0, 0.25);
}
</style>
