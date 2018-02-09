<template>
  <div id="cash-apply">
    <title-bar title="提现列表" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>
export default {
  name: "cash-apply",
  data() {
    return {
      columns: [{
        title:'序号',
        type:'index',
        width:80,
        align:'center'
      }, {
          title: 'id',
          key: 'uid',
          align: 'center'
        },{
          title: '昵称',
          key: 'nickname',
          align: 'center'
        }, {
          title: '提现订单号',
          key: 'order_sn',
          align: 'center'
        }, {
          title: '提现金额（rmb）',
          key: 'money',
          align: 'center'
        },{
          title: '申请时间',
          key: 'created_at',
          align: 'center'
        },{
          title: '提现通过时间',
          key: 'finish_at',
          align:'center'
        },{
          title:'提现状态',
          key:'',
          align:'center'
        },{
          title:'审核人',
          key:'',
          align:'center'
        }
      ],
      myData: [],
      tableLoading: false,
      searchList: [
        {
          label: '昵称',
          type: 'input',
          placeholder: '用户昵称',
          model: 'keyword'
        },{
          label: '申请时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'apply_time',
          start_end: ['start_time','end_time']
        }
      ],
      pageprops: { //分页配置
        showSizer:true,
        total:0,
      },
      fy: { //当前分页属性
        page: 1,
        size: 10
      },
      searchForm: {}, //搜索框属性
      cardsearch: {
        status: 1,
        difference:1
      }
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm,this.cardsearch);
    }
  },
  watch:{
    searchData:function () {
      this.getData();
    }
  },
  methods: {
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
    getData() {
      // console.log(this.searchData);
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
  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
</style>
