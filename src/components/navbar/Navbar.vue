<template>
  <div class="navbar">
    <template v-if="model">
      <span class="oem">{{ oem }}</span>
      <i class="mdi mdi-chevron-right arrow"></i>
      <span class="name">{{ name }}</span>
      <span class="model">{{ model }}</span>
    </template>
    <template v-else>
      <span class="text">
        {{ text }}
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    model: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    oem: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
    versions: {
      type: Array,
      default: [],
    },
  },
}
</script>

<style scoped>
.navbar {
  width: 100%;

  padding: 16px 32px;
  line-height: 40px;
  font-size: 18px;

  position: relative;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.navbar .oem,
.navbar .arrow,
.navbar .name,
.navbar .model,
.navbar .text {
  display: inline-block;
  vertical-align: top;
}

.navbar .arrow,
.navbar .model {
  margin: 0 8px;
}

.navbar .arrow {
  height: 40px;
}

.navbar .model {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
