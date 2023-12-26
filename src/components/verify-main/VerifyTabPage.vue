<template>
  <div class="tab-page verify-tab-page" ondragover="event.preventDefault()" v-on:drop="fileDropped">
    <a href="#" class="verify-icon" v-on:click="verifyClicked">Verify OTA package signature</a>
    <form ref="form">
      <input type="file" ref="input" style="display: none;" />
    </form>
  </div>
</template>

<script>
import CryptoService from '../../js/CryptoService';

export default {
  name: 'ErrorMain',
  mounted() {
    const input = this.$refs.input;
    input.onchange = () => this.verifyFile(input.files[0]);
  },
  methods: {
    fileDropped(event) {
      event.preventDefault();
      this.verifyFile(event.dataTransfer.files[0]);
    },
    verifyClicked() {
      const input = this.$refs.input;
      input.click();
    },
    verifyFile(blob) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const result = await CryptoService.verifyPackage(await fileReader.result);
        alert(result.msg);

        const form = this.$refs.form;
        form.reset();
      };
      fileReader.readAsArrayBuffer(blob);
    },
  }
}
</script>

<style scoped>
@import '../../css/tab-page.css';

.verify-tab-page {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.verify-icon {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  gap: 10px;
  background: #CCE8E9;
  color: #000;
  text-decoration: none;
  border-radius: 16px;
  height: 32px;
  justify-content: center;
  transition: background 0.125s ease-out;
}

#app.dark .verify-icon {
  background: #324B4C !important;
  color: #CCE8E9 !important;
}

@media (hover: hover), (-moz-touch-enabled: 0) {
  .verify-icon:hover {
    background: #167c80 !important;
  }

  #app.dark .verify-icon:hover {
    background: #167c80 !important;
  }
}
</style>
