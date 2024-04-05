import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default createStore({
  state() {
    return {
      isAutenthicated: false,
      token: null,
      userId: null
    }
  },
  getters: {
    isAutenthicated:  state => state.isAutenthicated,
    token: state => state.token,
    userId: state => state.userId
  },
  mutations: {
    authenticate(state, data) {
      state.isAutenthicated  = true;
      state.token = data.token,
      state.userId = data.userId
    },
    logout(state) {
      state.isAutenthicated =  false,
      state.token =  null,
      state.userId =  null
    }
  },
  actions: {
  },
  modules: [vuexLocal.plugin]
})
