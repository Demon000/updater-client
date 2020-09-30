<template>
  <div>
    <div v-on:click="toggleManualExpansion">
      <slot name="title" v-bind:isExpanded="isExpanded"></slot>
    </div>
    <height-transition v-bind:speed="forceExpanded ? '0s' : '0.25s'">
      <slot name="content" v-if="isExpanded"></slot>
    </height-transition>
  </div>
</template>

<script>
import HeightTransition from './HeightTransition.vue';

export default {
  name: 'Collapsible',
  components: {
    HeightTransition,
  },
  props: {
    forceExpanded: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    forceExpanded() {
      this.refreshExpansion();
    },
  },
  data() {
    return {
      isManuallyExpanded: false,
      isExpanded: false,
    };
  },
  mounted() {
    this.refreshExpansion();
  },
  methods: {
    refreshExpansion() {
      if (this.forceExpanded) {
        this.isExpanded = true;
      } else {
        this.isExpanded = this.isManuallyExpanded;
      }
    },
    toggleManualExpansion() {
      this.isManuallyExpanded = !this.isManuallyExpanded;
      this.refreshExpansion();
    }
  }
}
</script>
