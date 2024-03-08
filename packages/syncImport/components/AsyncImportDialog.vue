<template>
  <DialogLayout ref="dialog" :top="top">
    <div class="tips">
      {{message}}
      <div class="tip-warning">{{warningInfo}}</div>
    </div>
    <template #footer>
      <upload-and-download :headers="headers"
      :accept="accept"
      :action="action"
      :before-upload="beforeUpload"
      :onSuccess="onSuccess"
      onError="onError"
      :isAsync="isAsync"
      @download="downloadTemp"
      @downloadAsync="downloadAsyncTemp"
      ></upload-and-download>
  </DialogLayout>
</template>

<script>
import DialogLayout from "./components/DialogLayout.vue";
import UploadAndDownload from "./components/UploadAndDownload.vue";
import importMixin from "./mixins/importMixin";
export default {
  name: "AsyncImport",
  mixins: [importMixin],
  components: {
    DialogLayout,
    UploadAndDownload,
  },
  methods: {
    onSuccess(res) {
      this.$refs.dialog.close();
      this.success && this.success(res);
    },
  },
};
</script>

<style lang="less" scoped>
.tips {
  padding: 10px 8px;
  background: #f5f5f5;
  color: #666;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 16px;
  word-break: break-word;
}
.tip-warning {
  display: inline;
  font-weight: 700;
  color: #666;
}
</style>
