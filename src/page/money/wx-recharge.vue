<template>
  <div id="wx-recharge">
    <title-bar title="微信充值列表" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>
export default {
  name: "wx-recharge",
  data() {
    return {
      columns: [{
        title:'序号',
        type:'index',
        width:80,
        align:'center'
      },{
          title: '用户昵称',
          key: 'nickname',
          align: 'center'
        },{
          title: '用户id',
          key: 'uid',
          align: 'center'
        }, {
          title: '交易流水号',
          key: 'trade_no',
          align: 'center'
        }, {
          title: '充值金额',
          key: 'money',
          align: 'center'
        }, {
          title: '时间',
          key: 'created_at',
          align: 'center'
        }
      ],
      myData: [{uuid:1}],
      tableLoading: false,
      searchList: [
        {
          label: '用户昵称',
          type: 'input',
          placeholder: '用户昵称',
          model: 'keyword'
        },{
          label: '通过时间',
          type: 'daterange',
          placeholder: '请选择时间',
          model: 'register_time',
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
      searchForm: {} ,//搜索框属性
      my_search:{
        difference:0
      }
    }
  },
  computed: {
    searchData () {
      return Object.assign(this.fy,this.searchForm,this.my_search);
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
  mounted(){
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
</style>
