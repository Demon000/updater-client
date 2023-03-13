<template>
  <collapsible
      class="downloadable"
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
            expanded: isExpanded,
          }"
      >
        <div class="title">
          {{ name || filename }}
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
        <downloadable-detail
            title="Date"
            v-if="date"
            v-bind:value="date"
        ></downloadable-detail>
        <downloadable-detail
            title="Type"
            v-if="type"
            v-bind:value="type"
        ></downloadable-detail>
        <downloadable-detail
            title="Size"
            v-if="sizeHuman"
            v-bind:value="sizeHuman"
        ></downloadable-detail>
        <downloadable-detail
            title="SHA256"
            v-if="sha256"
            v-bind:value="sha256"
        ></downloadable-detail>
      </div>
    </template>
  </collapsible>
</template>

<script>
import Collapsible from '../utils/Collapsible.vue';
import DownloadableDetail from './DownloadableDetail.vue';

export default {
  name: 'Downloadable',
  components: {
    Collapsible,
    DownloadableDetail,
  },
  props: {
    date: String,
    datetime: Number,
    name: String,
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
      if (this.size !== undefined) {
        const units = {
          'GiB': 3,
          'MiB': 2,
          'KiB': 1,
        };

        for (const [unit, exponent] of Object.entries(units)) {
          if (this.size >= Math.pow(1024, exponent)) {
            return `${(this.size / Math.pow(1024, exponent)).toFixed(2)} ${unit}`;
          }
        }

        return `${this.size} B`;
      }
      return '';
    },
  },
}
</script>

<style scoped>
.downloadable {
  line-height: 24px;
  vertical-align: center;
}

.downloadable .title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 4px 0;
}

.downloadable .title-container .controls {
  display: flex;
}

.downloadable .title-container .controls .icon {
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

#app.dark .downloadable .title-container .controls .icon {
  color: rgba(255, 255, 255, 0.56);
}

.downloadable .title-container .controls .icon:hover {
  background: rgba(0, 0, 0, 0.15);
}

#app.dark .downloadable .title-container .controls .icon:hover {
  background: rgba(255, 255, 255, 0.15);
}

.downloadable .title-container.expanded .controls .expand-icon,
#app.dark .downloadable .title-container.expanded .controls .expand-icon {
  color: #167c80;
}

.downloadable .details {
  line-height: 24px;
  padding: 4px 8px;
  border-radius: 3px;

  font-size: 14px;

  background: rgba(0, 0, 0, 0.05);
}

#app.dark  .downloadable .details {
  background: rgba(255, 255, 255, 0.05);
}

</style>