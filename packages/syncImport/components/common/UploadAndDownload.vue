<template>
  <div class="foot-box">
    <el-upload
      class="upload-btn"
      :header="headers"
      :accept="accept"
      :multiple="false"
      :show-file-list="false"
      :action="action"
      :on-success="onSuccess"
      :on-error="onError"
      :before-upload="beforeUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-button
      v-if="isAsyncTemp"
      size="small"
      type="primary"
      @click="$emit('downloadAsync')"
      >提交</el-button
    >
    <el-button v-else size="small" type="primary" @click="$emit('dwonload')"
      >下载</el-button
    >
  </div>
</template>

<script>
export default {
  name: "UploadAndDownload",
  props: {
    headers: {
      type: Object,
      default: () => {
        return {
          Authorization: "Bearer " + localStorage.getItem("token"),
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=UTF-8",
          "x-csrf-token": window.$csrf,
        };
      },
      accept: {
        type: String,
        default:
          "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      action: {
        type: String,
        default: "http://localhost:8080/api/upload",
      },
      onSuccess: {
        type: Function,
        default: () => {},
      },
      onError: {
        type: Function,
        default: () => {},
      },
      beforeUpload: {
        type: Function,
        default: () => {},
      },
      isAsyncTemp: {
        type: Boolean,
        default: false,
      },
    },
  },
};
</script>

<style lang="less" scoped>
.upload-btn {
  display: inline-block;
  margin-right: 10px;
}
</style>
