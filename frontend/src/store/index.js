import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default createStore({
  state() {
    return {
      isAuthenticated: false,
      token: null,
      userId: null
    }
  },
  getters: {
    isAuthenticated:  state => state.isAuthenticated,
    token: state => state.token,
    userId: state => state.userId
  },
  mutations: {
    authenticate(state, data) {
      state.isAuthenticated  = true;
      state.token = data.token;
      state.userId = data.userId;
    },
    logout(state) {
      state.isAuthenticated =  false,
      state.token =  null,
      state.userId =  null
    }
  },
  actions: {
  },
  plugins: [vuexLocal.plugin]
})
