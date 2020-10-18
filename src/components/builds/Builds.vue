<template>
  <div class="builds">
    <div
        class="banner"
        v-if="!bannerHidden"
    >
      <div class="text">
        You can verify a file has not been tampered with by checking its signature.
      </div>
      <div class="buttons">
        <a
            class="button"
            v-on:click="hideBanner"
        >
          Got it
        </a>
        <a
            class="button"
            href="https://wiki.lineageos.org/verifying-builds.html"
            target="_blank"
        >
          Learn more
          <span class="mdi mdi-open-in-new"></span>
        </a>
      </div>
    </div>
    <div class="content">
      <div
          class="build"
          v-for="build in builds"
      >
        {{ build.filename }}
      </div>
    </div>
  </div>
</template>

<script>
import HeightTransition from '../utils/HeightTransition.vue';
import ApiService from '../../js/ApiService';
import {beforeTryError} from '../../js/router_utils';

const VERIFY_BUILD_BANNER_HIDE = 'verify-build-banner-hide';

const loadDeviceBuildsBeforeHook = beforeTryError((to) => {
  return ApiService.loadDeviceBuilds(to.params.model);
});

export default {
  name: 'Builds',
  components: {
    HeightTransition,
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
.builds .banner {
  padding: 16px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.builds .banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.builds .banner.hidden {
  display: none;
}

.builds .banner .button {
  vertical-align: middle;

  text-decoration: none;
  color: #167c80;

  display: inline-block;

  line-height: 36px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 24px;
  text-transform: uppercase;

  border-radius: 2px;

  cursor: pointer;

  transition: background 0.25s ease-out;

  user-select: none;
}

.builds .banner .button:hover {
  background: rgba(22, 124, 128, 0.15);
}

.builds .banner .button:active {
  background: rgba(22, 124, 128, 0.35);
}

.builds .content {
  padding: 16px;
}
</style>