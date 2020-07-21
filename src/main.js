import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

// import toast from '@/components/common/toast'
import { Toast } from "vant"
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(Toast)

// 使用fastclick解决移动端300ms延迟
FastClick.attach(document.body);

// 使用懒加载的插件
Vue.use(VueLazyLoad,{
  // 在js中导入图片直接放路径不行
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
