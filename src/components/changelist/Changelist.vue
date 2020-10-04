<template>
  <div
      class="changelist"
      ref="changelist"
      v-on:scroll="checkScrolledToBottom"
  >
    <div
        class="change"
        v-for="change in changes"
    >
      <a
          class="subject"
          target="_blank"
          v-bind:href="change.url"
      >
        {{ change.subject }}
      </a>
      <span class="repository">
        {{ change.repository }}
      </span>
    </div>
    <div
        class="change"
        v-if="isLoading"
    >
      <span class="subject">
        Loading...
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {API_HOSTNAME} from '../../js/config';

export default {
  name: 'Changelist',
  props: {
    model: {
      type: String,
      default: 'all',
    },
  },
  data() {
    return {
      changes: [],
      page: 0,
      isLoading: false,
    };
  },
  watch: {
    model() {
      this.reloadChanges();
    },
  },
  mounted() {
    this.reloadChanges();
  },
  methods: {
    reloadChanges() {
      this.changes = [];
      this.page = 0;
      this.loadMoreChanges();
    },
    isScrolledToBottom(el) {
      return el.scrollTop + el.offsetHeight >= el.scrollHeight;
    },
    checkScrolledToBottom() {
      const changelist = this.$refs.changelist;
      if (!this.isScrolledToBottom(changelist)) {
        return;
      }

      this.loadMoreChanges();
    },
    loadMoreChanges() {
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;
      axios
          .get(`${API_HOSTNAME}/api/v2/changes`, {
            params: {
              device: this.model,
              page: this.page,
            },
          })
          .then(response => {
            this.changes = this.changes.concat(response.data);
            this.page += 1;

            this.$nextTick(() => {
              this.isLoading = false;
              this.checkScrolledToBottom();
            });
          })
          .catch(err => {
            console.error(err);
          });
    },
  },
}
</script>

<style scoped>
.changelist {
  width: 100%;
  overflow: auto;

  padding: 16px;
}
.changelist .change {
  height: 64px;
  padding: 8px 16px 8px 16px;
}
.changelist .change .subject,
.changelist .change .repository {
  display: block;

  vertical-align: text-bottom;
}

.changelist .change .subject {
  line-height: 28px;

  color: inherit;
  text-decoration: none;
}

.changelist .change .repository {
  line-height: 20px;
  font-size: 12px
}
</style>
