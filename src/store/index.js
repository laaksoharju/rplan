import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io(),
    user: null,
  },
  mutations: {
    login(state, user) {
      state.user = user;
    }
  },
  actions: {
  },
  modules: {
  }
})
