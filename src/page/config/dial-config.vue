<template lang="html">
<div class="">
  <div id="income-detail">
    <title-bar title="大转盘配置" @refresh="getData"></title-bar>
        <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
  </div>
</div>
</template>

<script>
export default {
  data:()=>({
    columns:[{
      title:'位置',
      type:'index',
      align:'center'
    },{
      title:'文案',
      key:'',
      align:'center'
    },{
      title:'奖项',
      key:'',
      align:'center'
    },{
      title:'概率',
      key:'',
      align:'center'
    }],
    myData:[],
    tableLoading:false,
  }),
  methods:{
    getData(){

    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<style lang="css">
</style>
