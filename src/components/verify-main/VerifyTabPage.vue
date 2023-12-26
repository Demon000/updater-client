<template>
  <div
      class="tab-page verify-tab-page"
      v-on:dragover="fileDragOver"
      v-on:dragleave="fileDragLeave"
      v-on:drop="fileDropped"
  >
    <a href="#" class="verify-icon" v-on:click="verifyClicked">Verify OTA package signature</a>
    <form ref="form">
      <input type="file" ref="input" v-on:change="verifyFileInput" style="display: none;" />
    </form>
  </div>
</template>

<script>
import CryptoService from '../../js/CryptoService';

export default {
  name: 'ErrorMain',
  methods: {
    fileDragOver(event) {
      event.preventDefault();
      event.currentTarget.classList.add('dragover-border');
    },
    fileDragLeave(event) {
      event.currentTarget.classList.remove('dragover-border');
    },
    fileDropped(event) {
      event.preventDefault();
      event.currentTarget.classList.remove('dragover-border');
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
    verifyFileInput(event) {
      this.verifyFile(event.currentTarget.files[0]);
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

.dragover-border {
  border: 2px dashed #167c80;
}
</style>
