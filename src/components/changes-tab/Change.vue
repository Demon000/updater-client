<template>
  <div
      class="change"
  >
    <a
        class="subject"
        target="_blank"
        v-bind:href="url"
    >
      {{ subject }}
    </a>
    <span class="repository">
        {{ repository }}
      </span>
  </div>
</template>

<script>
export default {
  name: 'Change',
  props: {
    url: String,
    subject: String,
    repository: String,
  },
}
</script>

<style scoped>
.change {
  padding: 8px 16px 8px 16px;
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