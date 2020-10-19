<template>
  <div class="builds-tab-page">
    <div
        class="banner"
        v-if="!bannerHidden"
    >
      <div class="text">
        You can verify that a file has not been tampered with by checking its signature.
      </div>
      <div class="buttons">
        <a
            class="button"
            href="https://wiki.lineageos.org/verifying-builds.html"
            target="_blank"
        >
          Learn more
          <span class="mdi mdi-open-in-new"></span>
        </a>
        <a
            class="button"
            v-on:click="hideBanner"
        >
          Got it
        </a>
      </div>
    </div>
    <div
        class="list-container"
        data-simplebar
    >
      <div class="list">
        <template v-for="build in builds">
          <build-group v-bind="build"></build-group>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '../../js/ApiService';
import {beforeTryError} from '../../js/router_utils';
import BuildGroup from './BuildGroup.vue';

const VERIFY_BUILD_BANNER_HIDE = 'verify-build-banner-hide';

const loadDeviceBuildsBeforeHook = beforeTryError((to) => {
  return ApiService.loadDeviceBuilds(to.params.model);
});

export default {
  name: 'Builds',
  components: {
    BuildGroup,
  },
  props: {
    model: String,
  },
  data() {
    return {
      builds: [],
      bannerHidden: false,
    };
  },
  beforeRouteEnter: loadDeviceBuildsBeforeHook,
  beforeRouteUpdate: loadDeviceBuildsBeforeHook,
  watch: {
    model() {
      this.loadBuilds();
    },
  },
  mounted() {
    this.bannerHidden = this.isBannerHidden();
    this.loadBuilds();
  },
  methods: {
    isBannerHidden() {
      return localStorage.getItem(VERIFY_BUILD_BANNER_HIDE) === '1';
    },
    hideBanner() {
      localStorage.setItem(VERIFY_BUILD_BANNER_HIDE, '1');
      this.bannerHidden = true;
    },
    async loadBuilds() {
      const data = this.$store.getters.getDeviceBuilds(this.model);
      if (!data) {
        throw new Error('Failed to get device builds');
      }

      this.builds = data;
    },
  },
}
</script>

<style scoped>
.builds-tab-page {
  width: 100%;
  height: 100%;

  display: flex;
}

.builds-tab-page .banner {
  flex-shrink: 0;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  line-height: 32px;

  padding: 16px 16px 15px 16px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.builds-tab-page .banner.hidden {
  display: none;
}

.builds-tab-page .banner .button {
  vertical-align: top;

  text-decoration: none;
  color: #167c80;

  display: inline-block;

  font-size: 14px;
  font-weight: 500;
  padding: 0 16px;
  margin: 0 8px;
  text-transform: uppercase;

  border-radius: 2px;

  cursor: pointer;

  transition: background 0.25s ease-out;

  user-select: none;
}

.builds-tab-page .banner .button:hover {
  background: rgba(22, 124, 128, 0.15);
}

.builds-tab-page .banner .button:active {
  background: rgba(22, 124, 128, 0.35);
}

.builds-tab-page .list-container {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.builds-tab-page .list {
  min-width: 0;
  max-width: 756px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .builds-tab-page .banner .buttons {
    text-align: right;
  }
}

</style>