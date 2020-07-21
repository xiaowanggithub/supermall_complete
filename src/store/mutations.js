export default {
    addCounter(state,playload){
    playload.count++
    },
    addToCart(state,payload){
      payload.checked = true
      state.cartList.push(payload)
      // console.log(payload);
      
    },
    transChecked(state,product){
      // state.cartList[index].checked = change
      // console.log('vuex'+state.cartList[index].checked);
      // console.log(product);
      for(let i=0; i<state.cartList.length; i++){
        if(product.iid === state.cartList[i].iid){
          // 监测到点击button，切换checked属性
          state.cartList[i].checked = !state.cartList[i].checked
          // console.log(state.cartList);
          break
        }
      }
    }
  
}