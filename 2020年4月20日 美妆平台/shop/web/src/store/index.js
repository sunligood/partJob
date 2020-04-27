import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    saveUserInfo(state, params) {
      state.userInfo = params
    }
  },
  actions: {},
  modules: {}
});
