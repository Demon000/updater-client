<template>
  <div class="changelist" v-on:scroll="checkScrolledToBottom" ref="changelist">
    <div class="change" v-for="change in changes">
      <a class="subject" v-bind:href="change.url" target="_blank">
        {{ change.subject }}
      </a>
      <span class="repository">
        {{ change.repository }}
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {API_HOSTNAME} from "../js/config";

export default {
  name: 'Changelist',
  props: {
    device: String,
  },
  data() {
    return {
      changes: [],
      page: 0,
    };
  },
  watch: {
    device() {
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
      return el.scrollTop + el.offsetHeight === el.scrollHeight;
    },
    checkScrolledToBottom() {
      const changelist = this.$refs.changelist;
      if (!this.isScrolledToBottom(changelist)) {
        return;
      }

      this.loadMoreChanges();
    },
    loadMoreChanges() {
      axios
          .get(`${API_HOSTNAME}/api/v2/changes`, {
            params: {
              device: this.device,
              page: this.page,
            },
          })
          .then(response => {
            this.changes = this.changes.concat(response.data);
            this.page += 1;

            this.$nextTick(() => {
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
  height: 100%;
  width: 100%;
  overflow: auto;
}
.change {
  height: 64px;
  padding: 0 16px 16px 16px;
}
.change .subject,
.change .repository {
  display: block;

  vertical-align: text-bottom;
}

.change .subject {
  line-height: 28px;

  color: inherit;
  text-decoration: none;
}

.change .repository {
  line-height: 20px;
  font-size: 12px
}
</style>
