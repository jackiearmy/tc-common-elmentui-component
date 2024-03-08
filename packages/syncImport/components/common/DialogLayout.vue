<template>
  <el-dialog
    v-if="isVisible"
    custom-class="dialog-layout"
    :append-to-body="appendToBody"
    :top="top"
    :title="title"
    :width="width"
    :before-close="beforeClose"
    :close-on-click-modal="closeOnClickModal"
    :destroy-on-close="destroyOnClose"
  >
    <slot></slot>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogLayout",
  props: {
    appendToBody: {
      type: Boolean,
      default: false,
    },
    top: {
      type: String,
      default: "15vh",
    },
    title: {
      type: String,
      default: "弹窗标题",
    },
    width: {
      type: String,
      default: "50%",
    },
    beforeClose: {
      type: Function,
      default: () => {},
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: true,
      titleValue: this.title,
    };
  },
  watch: {
    title(val) {
      this.titleValue = val;
    },
  },
  methods: {
    close() {
      this.isVisible = false;
    },
    beforeClose() {
      this.$emit("before-close", this.close);
    },
  },
};
</script>

<style>
</style>
