<template lang="html">
  <div class="anomaly">
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>

<script>
export default {
  name:'anomalyBonus',
  data:()=>({
    columns:[{
      title:'头像',
      align:'center',
      render:(h,params)=>{
        return h('img',{
          src:params.url,
          height:'40px',
          width:'40px'
        })
      }
    },{
      title:'昵称',
      key:'',
      align:'center'
    },{
      title:'openid',
      key:'',
      align:'center'
    },{
      title:'发包金额',
      key:'',
      align:'center'
    },{
      title:'领取个数',
      key:'',
      align:'center'
    },{
      title:'退款金额',
      key:'',
      align:'center'
    },{
      title:'手续费',
      key:'',
      align:'center'
    },{
      title:'状态',
      key:'',
      align:'center'
    },{
      title:'操作',
      align:'center',
      render: (h, params) => {
        return h('Button', {
          props: {
            type: 'info'
          },
          on: {
            click: () => {

            }
          }
        }, '查看异常')
      }
    }],
    keyword:'',
    myData:[],
    tableLoading: false,
    pageprops: { //分页配置
      showSizer: true,
      total: 0,
    },
    fy: { //当前分页属性
      page: 1,
      size: 20
    },
    searchForm: {}, //搜索框属性
    my_search: {},
    params:''
  }),
  methods:{
    refresh() {
      this.getData();
    },
    search(data) {
      this.searchForm = data;
      this.getData();
    },
    pageChange(page) {
      this.fy.page = page;
      this.getData();
    },
    pageSizeChange(size) {
      this.fy.size = size;
      this.getData();
    },
    getData(){
        this.tableLoading = true;
        this.axios.get('backend-order-recharge', {
          params: this.searchData
        }).then(res => {
          // console.log(res);
          if (res) {
            this.tableLoading = false;
            this.myData = res.data.list;
            this.pageprops.total = res.data.total;
          }
        })
    },
    test(){
      console.log(location.href.split('=')[1]);
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss">
.anomaly{
  margin: 50px;
}
</style>
