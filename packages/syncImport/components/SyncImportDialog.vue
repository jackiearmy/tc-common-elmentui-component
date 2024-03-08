<template>
  <dialog-layout
    ref="dialog"
    :top="top"
    :title="title"
    @before-close="handleClose"
  >
    <div class="tips">
      {{ message }}
    </div>
    <upload-and-download
      :headers="headers"
      :accept="accept"
      :before-upload="beforeUpload"
      :upload-btn-text="uploadBtnText"
      :download-text="downloadText"
      :download-text-async="downloadTextAsync"
      :on-success="onSuccess"
      :on-error="onError"
      :isAsyncTemp="isAsyncTemp"
      :loading="showUploadLoading && uploading"
      @download="downloadTemp"
      @downloadAsync="downloadAsyncTemp"
    />
    <file-list
      v-if="fileList.length > 0"
      :file-list="fileList"
      :file-validate-text="fileValidateText"
      @delete="handleDelete"
    />
    <template>
      <el-button
        type="primary"
        v-if="isShowSubmit"
        :loading="isLoading"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        {{ submitText }}
      </el-button>
      <el-button @click="closeDialog">
        {{ cancleText }}
      </el-button>
    </template>
  </dialog-layout>
</template>

<script>
import Axios from "axios";
import DialogLayout from "./common/DialogLayout.vue";
import UploadAndDownload from "./common/UploadAndDownload.vue";
import FileList from "./common/FileList.vue";
import CommonMixin from "./importMixins.js";

export default {
  name: "SyncImportDialog",
  mixins: [CommonMixin],
  components: {
    DialogLayout,
    UploadAndDownload,
    FileList,
  },
  data() {
    return {
      submitText: "",
      cancleText: "",
      fileValidateText: "",
      fileList: [],
      isLoading: false,
    };
  },
  computed: {
    canSubmit() {
      if (!this.fileList.length) return false;
      return this.fileList.every((item) => item.error === "");
    },
  },
  methods: {
    onSuccess(response, file) {
      if (file) {
        this.fileList = [
          {
            file: file.raw,
            error: response.msg || (response.isSuccess ? "" : response.massage),
          },
        ];
      }
      this.uploadLoading = false;
      this.uploadSuccess = true;
    },
    closeDialog() {
      this.$refs.dialog.close();
    },
    deletFile(index) {
      this.fileList.splice(index, 1);
    },
    handleSubmit() {
      if (this.submitBtnCb) {
        return this.submitBtnCb(this);
      }
      this.isLoading = true;
      const data = new FormData();
      // 获取所有校验成功的文件列表
      const fileList = this.fileList.filter((item) => !item.error);
      fileList.forEach((item) => {
        data.append("files", item.file);
      });
      let url = location.origin + this.action;
      if (url.indexOf("?") > -1) {
        url += "&operateType=importData";
      } else {
        url += "?operateType=importData";
      }
      return Axios({
        url,
        data,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        if (response.msg && Array.isArray(response.msg)) {
          this.closeDialog();
          this.success && this.success(response.msg);
        } else {
          if (response.msg === "") {
            this.closeDialog();
            this.success && this.success(response.msg);
          } else if (response.isSuccess && response.message) {
            this.closeDialog();
            this.success && this.success(response.message);
          } else {
            this.$message({
              message: response.msg || response.message || response,
              type: "error",
            });
          }
        }

        this.isLoading = false;
      });
    },
    handleClose() {},
  },
};
</script>

<style scoped lang="less" scoped>
.tips {
  margin-bottom: 12px;
  padding: 10px 8px;
  background: #f5f5f5;
  color: #666;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #666;
  line-height: 16px;
  word-break: break-word;
}
</style>
