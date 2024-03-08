const state = {
  pageSize: 15,
  csrfToke: '',
  common: { token: '' },
  appSide: {
    visible: true,
    isSimple: false,
  },
  toolbar: true,
  loginUser: {
    userId: '',
  },
  cacheComponents: [], // 缓存组件，keepalive
  contextObj: { context: '', service: '' },
};

const getters = {};

const actions = {
  deleteCacheComponents({ commit }, componentName) {
    commit('deleteCacheComponents', componentName)
  },
};

const mutations = {
  setPageSize(state, data) {
    state.pageSize = data
  },
  addCacheComponents(state, componentName) {
    if (!state.cacheComponents.includes(componentName)) {
      state.cacheComponents.push(componentName)
    }
  },
  deleteCacheComponents(state, componentName) {
    const index = state.cacheComponents.indexOf(componentName);
    if (index > -1) {
      state.cacheComponents.splice(index, 1)
    }
  },
  setContext(state, contextObj) {
    state.contextObj = contextObj;
  },
  setToken(state, token) {
    state.common.token = token;
  },
  setLoginUser(state, loginUser) {
    state.loginUser = loginUser;
  },
  setCsrfToken(state, token) {
    state.csrfToke = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
