import { Toast } from "vant"

const obj = {}

obj.install = function(){
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式，根据组件选择构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()
}
export default obj