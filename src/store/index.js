import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getter'
// 1.安装插件
Vue.use(Vuex)

const state = {
  cartList: [],
  // Actions管理异步操作。
  // mutations储存方法，可以被devtools跟踪管理。
  // state通过mutations改变数据，数据是响应式的。
}

// 2.创建实例store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

// 3.挂载在Vue实例上
// !!!要在main.js里导入store
export default store