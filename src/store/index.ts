import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import permission from './modules/permission'
const store = new Vuex.Store({
  modules: {
    user,
    app,
    permission,
  },
  getters
})

//main.ts中需要额外引入
export default store;
