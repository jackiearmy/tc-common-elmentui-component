
import axios from 'axios'
import Util from '@/utils/util'

export default {
  data() {
    return {
      top: '40vh',
      action: '',
      message: '',
      download: '',
      close: null,
      success: null, // 上传成功回调
      uploadSuccess: null, // 上传文件成功回调
      onDownload: null, // 下载文件成功回调
      error: null, // 上传失败回调
      accept: '.xls,.xlsx',
      uploadLoading: false,
      submitBtnCb: null,
      headers: {
        'Authorization': 'Bearer ' + Util.getToken()
      }
    }
  },
  mounted() {
    window.addEventListener('hashchange', this.$refs.dialog.close)
  },
  methods: {
    beforeUpload(file) {
      const acceptArr = this.accept.replace(/\./g, '').split(',')
      this.uploadLoading = true;
      return Util.uploadLimit(file, window.Vue, acceptArr.length ? acceptArr : ['xls', 'xlsx']);
    },
    // 下载模板
    async downloadTemp() {
      if (typeof this.download === 'string') {
        window.open(this.download, '_blank');
      } else if (typeof this.download === 'object') {
        const { url, data, filename } = this.download;
        const blob = await axios.post({ url, data, method: 'post', responseType: 'blob' });
        this.downloadFile(blob, filename);
      }
      this.onDownload && this.onDownload();
    },
    async downloadAsyncTemp() {
      this.$refs.dialog.close();
      this.downloadAsyncTempHandler && this.downloadAsyncTempHandler();
    },
    downloadFile(blob, filename) {
      const URL = window.URL || window.webkitURL;
      const downloadUrl = URL.createObjectURL(blob?.data || blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.target = '_blank';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      const timer = setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
        clearTimeout(timer);
      }, 100);
    },
    onError(err, file, fileList) {
      let errObj;
      try {
        errObj = JSON.parse(err.message);
        this.errorMsg || this.$message.error(errObj.message);
      } catch (err) {
        errObj = err;
      }
      this.uploadLoading = false;
      // 执行error回调
      this.error && this.error(errObj, file, fileList);
    },
    handleClose(done) {
      done && done();
      this.uploadLoading = false;
      // 执行close 回调
      this.close && this.close();
    }
  },
}
