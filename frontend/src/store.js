import Vue from 'vue';
import Vuex from 'vuex';

import router from './router'

// para decodificar el jwt
import decode from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  // INICIAL STATE
  state: {
    token: '',
    userDB: '',
  },
  // MODIFY STATE
  mutations: {
    getUser(state, payload) {
      state.token = payload;
      if (payload === '') {
        state.userDB = '';
      } else {
        state.userDB = decode(payload);
        router.push({ name: 'notes' });
      }
    },
  },
  // EXECUTE MUTATIONS
  actions: {
    saveUser({ commit }, payload) {
      localStorage.setItem('token', payload);
      commit('getUser', payload);
    },
    logoutUser({commit}){
      commit('getUser', '');
      localStorage.removeItem('token');
      router.push({name: 'login'});
    },
    readToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('getUser', token);
      }else{
        commit('getUser', '');
      }
    }
  },
  getters: {
    isActive: state => !!state.token
  },
});
