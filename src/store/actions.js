export default {
    addCart(context,payload){
      return new Promise((resolve,reject) => {
        // payload是detail传过来的obj对象（新添加的商品）
        let oldProduct = null;
        for(let item of context.state.cartList){
          if(item.iid === payload.iid){
            // 如果现有的商品中有传过来的商品
            // 现在的商品就是oldProduct已经存在的
            oldProduct = item
            
          }
        }
        
        // 2.判断oldProduct，如果商品列表已经有这个商品了
        if(oldProduct){
          // oldProduct.count += 1
          context.commit('addCounter',oldProduct)
          resolve('商品+1')
        }else{
          payload.count = 1 
          context.commit('addToCart',payload)
          resolve('商品已经加入购物车')
        }
        // !!!通过mutations改变state的状态，让vuex能跟踪到
      })
  },
  changeChecked(context,product){
    // for(let i=0; i<context.state.cartList.length; i++){
    //   if(product.iid === context.state.cartList[i].iid){
    //     context.commit('transChecked',i,product.checked)
    //     console.log(product.checked);
    //     break
    //   }
    // }
    context.commit('transChecked',product)
    
  }
}
