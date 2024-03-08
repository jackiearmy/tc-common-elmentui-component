<template>
  <ul class="file-list">
    <li
      v-for="(item, index) in data"
      :class="{ 'error-state': item.error, 'success-state': !item.error }"
      :key="index"
      @mouseenter="activeFile(index)"
      @mouseleave="unActiveFile(index)"
    >
      <div class="file-info">
        <span class="file-icon" :class="item.icon"></span>
        <div
          class="file-name"
          :title="item.file.name"
          @click="downloadFile(item)"
        >
          <span class="full-name">{{ item.name }}</span>
          .{{ item.fileSuffix }}
        </div>
      </div>
      <i
        v-if="item.active && !item.error"
        class="el-icon-close"
        @click="deleteFile(index)"
      ></i>
      <div v-else class="file-state">
        <i v-if="item.error" class="el-icon-circle-check"></i>
        <el-popover
          v-else
          popper-class="ui-import-error-popover"
          placement="bottom"
          trigger="hover"
        >
          <p class="title">{{ fileValidateText }}</p>
          <div class="error-message">
            <div class="message" v-html="$xss(item.error)"></div>
          </div>
          <i slot="reference" class="el-icon-warning-outline"></i>
        </el-popover>
      </div>
    </li>
  </ul>
</template>

<script>
import Util from "@/utils/util";
export default {
  name: "FileList",
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    fileValidateText: {
      type: String,
      default: "上传文件失败，请重新上传",
    },
  },
  data() {
    return {
      data: [],
    };
  },
  watch: {
    fileList: {
      handler(val) {
        this.initFileList(val);
      },
      deep: true,
    },
  },
  computed: {},
  mounted() {
    this.initFileList(this.fileList);
  },
  methods: {
    initFileList(val) {
      this.data = this.fileList.map(({ file, error }) => {
        const fileNameArr = file.name.split(".");
        const fileSuffix = fileNameArr.pop(); // 获取文件后缀
        return {
          file,
          fileSuffix,
          error,
          name: file.name,
          icon: Util.getFileIcon(fileSuffix),
          blobPath: Util.getObjectURL(file),
        };
      });
    },
    downloadFile(blob) {
      const fileName = blob.name + "." + blob.fileSuffix;
      const a = document.createElement("a");
      a.href = blob.blobPath;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
    },
    deleteFile(index) {
      this.$emit("delete", index);
    },
    activeFile(index) {
      this.$set(this.data[index], "active", true);
    },
    unActiveFile(index) {
      this.$set(this.data[index], "active", false);
    },
  },
};
</script>

<style lang="less" scoped>
.file-list {
  margin-top: 20px;
  .success-state {
    &:hover {
      background: #e6f7ff;
      .file-name {
        color: #1890ff;
      }
    }
  }
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    line-height: 24px;
    padding-right: 4px;
    .file-icon {
      margin-right: 3px;
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: text-bottom;
      zoom: 1;
    }
    .file-info {
      display: flex;
      align-items: center;
    }
    .file-state {
      .el-icon-circle-check {
        color: #52c31a;
        font-size: 16px;
      }
    }
    .file-name {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      color: #333;
      line-height: 19px;
      cursor: pointer;
      .full-name {
        display: inline-block;
        max-width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 19px;
      }
    }
    .el-icon-close {
      color: #999;
      font-size: 16px;
      cursor: pointer;
    }
    .el-icon-warning-outline {
      color: #f5222d;
      font-size: 16px;
    }
  }
  .error-state {
    .file-name {
      color: #f5222d;
    }
  }
}
.title {
  font-weight: 700;
  font-size: 12px;
}
.error-message {
  max-height: 200px;
  overflow-y: auto;
  font-size: 12px;
  color: #333;
  line-height: 20px;
}
</style>
<style lang="less">
.ui-import-error-popper {
  margin-top: 6px !important;
  padding: 6px;
  max-width: 400px;
  .popper__arrow {
    display: block !important;
  }
}
</style>
