<template>
  <collapsible
      class="build"
  >
    <template
        v-slot:title="{
          isExpanded,
          toggleManualExpansion,
        }"
    >
      <div
          class="title-container"
          v-bind:class="{
            expanded: isExpanded
          }"
      >
        <div class="title">
          {{ filename }}
        </div>
        <div class="controls">
          <i
              class="mdi mdi-information icon expand-icon"
              v-on:click="toggleManualExpansion"
          ></i>
          <a
              class="mdi mdi-download icon"
              v-bind:href="url"
          ></a>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="details">
        <build-detail
            title="Date"
            v-bind:value="date"
        ></build-detail>
        <build-detail
          title="Type"
          v-bind:value="type"
        ></build-detail>
        <build-detail
            title="Size"
            v-bind:value="sizeHuman"
        ></build-detail>
        <build-detail
            title="SHA256"
            v-bind:value="sha256"
        ></build-detail>
      </div>
    </template>
  </collapsible>
</template>

<script>
import Collapsible from '../utils/Collapsible.vue';
import BuildDetail from './BuildDetail.vue';

export default {
  name: 'Build',
  components: {
    Collapsible,
    BuildDetail,
  },
  props: {
    date: String,
    datetime: Number,
    filename: String,
    filepath: String,
    sha256: String,
    size: Number,
    type: String,
    url: String,
    version: String,
  },
  computed: {
    sizeHuman() {
      return `${(this.size / 1000000).toFixed(2)} MB`;
    },
  },
}
</script>

<style scoped>
.build {
  line-height: 24px;
  vertical-align: center;
  padding: 8px 0;
}

.build .title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 4px;
}

.build .title-container .controls {
  display: flex;
}

.build .title-container .controls .icon {
  display: block;
  flex-shrink: 0;

  font-size: 24px;
  line-height: 36px;
  height: 36px;
  width: 36px;
  text-align: center;
  border-radius: 50%;

  transition: background 0.125s ease-out;

  color: rgba(0, 0, 0, 0.56);

  cursor: pointer;
}

.build .title-container .icon:hover {
  background: rgba(0, 0, 0, 0.15);
}

.build .title-container.expanded .expand-icon {
  color: #167c80;
}

.builds-tab-page .details {
  line-height: 24px;
  padding: 4px 8px;
  border-radius: 2px;

  font-size: 14px;

  background: rgba(0, 0, 0, 0.05);
}
</style>