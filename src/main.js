import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import TcComponent from './index';
import VueI18n from 'vue-i18n';
import { getLangList } from '@/api/lang';

Vue.use(TcComponent);
Vue.use(VueI18n);
const locale = zhLocale;
const i18n = new VueI18n({
  locale,
  silentTranslationWarn: true,
});
i18n.locale = 'zh-CN';
i18n.setLocaleMessage('zh-CN', null);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale,
  size: 'small',
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

(async function() {
  const langObj = await getLangList({ lang: 'cn' });
  // console.log("test langObj", langObj);
  window.vue = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
  });
})();

