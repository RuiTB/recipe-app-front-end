import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.user !== null;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    }
  },
  actions: {
    setUser({ commit }, user) {
      localStorage.setItem('user', JSON.stringify(user));
      commit('setUser', user);
    },
    clearUser({ commit }) {
      commit('clearUser');
    },
    setToken({ commit }, token) {
      localStorage.setItem('token', token);
      commit('setToken', token)
    },
    clearToken({ commit }) {
      commit('clearToken');
    }
  },
  modules: {

  }
})
