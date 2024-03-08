import AppHeader from '../packages/appHeader/index.vue';
import AppFooter from '../packages/appFooter/index.vue';
import BaseListTable from '../packages/BaseListTable/BaseListTable.vue';
import waterMark from '../packages/WaterMark/index.js';
import store from './store/index';

const components = [
  AppHeader,
  AppFooter,
  BaseListTable,
  waterMark
];

const install = (Vue, opts = {}) => {
  const contextObj = {
    context: 'onecardgateway/baseService',
    service: 'base',
    downloadUrl: '',
    previewPath: 'previewEdm',
  };
  Object.assign(contextObj, opts);
  Vue.prototype.$context = contextObj;
  // store.commit('setContext', contextObj);
  store.commit('common/setCsrfToken', opts.cfsToken);
  Vue.prototype.$csfToken = opts.cfsToken || '';
  if (install.installed) return;

  install.installed = true;

  // 遍历注册全局组件
  components.forEach(component => {
    if (component.name) {
      Vue.component(component.name, component);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install, // 导出的对象必须具备install 方法
  ...components, // 组件列表
}
