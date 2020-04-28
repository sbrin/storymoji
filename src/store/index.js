import Vue from 'vue'
import actions from './actions'

const state = Vue.observable({
  isAuthorized: false,
  userInfo: {}
})

export default {
  state,
  actions
};
