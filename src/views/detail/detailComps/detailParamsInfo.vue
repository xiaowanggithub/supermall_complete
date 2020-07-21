<template>
  <div class="params-info" v-if='Object.keys(params).length !== 0'>
    <table class="params-sizes">
      <tr v-for="(item,index) in params.sizes[0]"
      :key='index'
      class="params-sizes-tr">
        <td v-for="(item1,index1) in params.sizes[0][index]"
      :key='index1'>{{params.sizes[0][index][index1]}}</td>
      </tr>
    </table>
    
    <table class="params-describe">
      <tr v-for="(item,index) in params.infos"
        :key='index'
        class="params-describe-tr">
        <td class="params-describe-key">{{ params.infos[index].key}}</td>
        <td class="params-describe-value">{{ params.infos[index].value}}</td>
      </tr>
    </table>
    
  </div>
</template>
<script>
export default {
  name:'DetailParamsInfo',
  props:{
    params:{
      type:Object,
      default(){
        return {}
      },
    }
  }
}
</script>
  
<style scoped>
  .params-info{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
    color: #666666;
  }
  .params-sizes {
    /* background-color: red; */
    width: 100%;
  }
  .params-sizes{
    border-bottom: 2px solid rgba(100,100,100,.1);
  }
  .params-sizes-tr{
    width: 100%;
  }
  .params-sizes-tr td{
    border-bottom: 1px solid rgba(100,100,100,.1);
    padding: 12px 0;
    width: 12%;
  }
  .params-describe td{
    padding: 10px 0;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .params-describe-key{
    width: 25%;
  }
  .params-describe-value{
    color: var(--color-high-text);
  }
</style>