import {request} from './request';
// 如果没有用defulte导出都要加大括号

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page,
    }
    // 专门针对get请求的参数拼接
  })
}