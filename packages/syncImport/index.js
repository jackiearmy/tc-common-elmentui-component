import Vue from 'vue'
import SyncImportDialog from './components/SyncImportDialog.vue';
import AsyncImportDialog from './components/AsyncImportDialog.vue';

const SyncImportDialogConstructor = Vue.extend(SyncImportDialog);
const AsyncImportDialogConstructor = Vue.extend(AsyncImportDialog);

function importDialog({
  title,
  accept,
  headers,
  action,
  download,
  top,
  message,
  close,
  success,
  uploadSuccess,
  downloadAsyncTempHanler,
  error,
  isAsyncTemp,
  type,
  onDwonLoad,
  warningInfo,
  showUploadLoading,
  isShowSubmitBtn,
  submitBtnCb
}) {
  type = type || 'async';
  download = download || '';
  const langCN = this.$i18n.locale === 'zh-CN';
  const ImportDialogConstructor = type === 'async' ? AsyncImportDialogConstructor : SyncImportDialogConstructor;
  const messageCN = "注意：导入前请确保您已下载了最新模板，否则可能导致数据不完整或失败。";
  const messageEN = "Note: Please make sure you have downloaded the latest template before importing, otherwise it may cause incomplete or failed data.";
  const importInstant = new ImportDialogConstructor({
    data: {
      close,
      success,
      uploadSuccess,
      downloadAsyncTempHanler,
      error,
      onDwonLoad,
      action,
      top: top || '40vh',
      download,
      title: title || langCN ? '导入' : 'Import',
      headers: headers || { 'x-csrf-token': window.secToken },
      accept: accept || '.xlsx, .xls',
      message: langCN ? messageCN : messageEN,
      warningInfo: warningInfo || "",
      isAsyncTemp: isAsyncTemp || false,
      showUploadLoading: showUploadLoading || false,
      isShowSubmitBtn: isShowSubmitBtn || false,
      submitBtnCb: submitBtnCb || null,
    }
  });
  importInstant.$mount();
  // 插入body
  document.body.appendChild(importInstant.$el);
}

// 同步导入
Vue.prototype.$importDialog = function (options) {
  return importDialog.call(this, {
    ...options,
    type: 'sync'
  });
};

// 异步导入
Vue.prototype.$asyncImportDialog = function (options) {
  return importDialog.call(this, {
    ...options,
    type: 'async'
  });
}

export default { importDialog }
