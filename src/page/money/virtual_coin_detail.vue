<template>
<div id="virtual_coin_detail">
  <title-bar title="虚拟币明细流水" @refresh="refresh"></title-bar>
  <search-group :searchList="searchList" @search="search"></search-group>
  <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
    <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
  </table-container>
</div>
</template>
<script>
export default {
  name: "virtalCoinDetail",
  data() {
    return {
      columns: [{
        title: '序号',
        type: 'index',
        width: 60,
        align: 'center'
      }, {
        title: '用户昵称',
        key: 'nickname',
        align: 'center'
      }, {
        title: 'openid',
        key: 'uid',
        align: 'center'
      }, {
        title: '类型',
        key: 'symbol',
        align: 'center'
      }, {
        title: '行为',
        key: 'type',
        align: 'center'
      }, {
        title: '金币变化',
        align: 'center',
        render:(h,params)=>{
          if (params.row.symbol === '支出') {
            return h('span','-'+params.row.coin)
          }else {
            return h('span','+'+params.row.coin)
          }
        }
      }, {
        title: '时间',
        key: 'created_at',
        align: 'center'
      }, {
        title: '金币余额',
        key: 'balance',
        align: 'center'
      }],
      myData: [],
      tableLoading: false,

      searchList: [{
        label: '检索',
        type: 'input',
        placeholder: 'openid',
        model: 'openid'
      }, {
        label: '充值时间',
        type: 'daterange',
        placeholder: '请选择时间',
        model: 'register_time',
        start_end: ['start_time', 'end_time']
      }, {
        label: '类型/行为',
        type: 'cascader',
        placeholder: '请选择类型/行为',
        options: [{
          label: '支出',
          value: 1,
          children:[{
            label: '参与大转盘',
            value: 5
          }, {
            label: '发起猜拳',
            value: 0
          }, {
            label: '发起押注',
            value: 1
          }, {
            label: '发起应战',
            value: 3
          }]
        }, {
          label: '收入',
          value: 0,
          children:[{
            label:'充值',
            value:7
          },{
            label:'签到',
            value: 8
          },{
            label:'大转盘奖励',
            value:6
          },{
            label:'押注奖励',
            value:2
          },{
            label:'猜拳奖励',
            value:10
          }]
        }],
        model: 'type'
      }],
      pageprops: { //分页配置
        showSizer: true,
        total: 0,
      },
      fy: { //当前分页属性
        page: 1,
        size: 10
      },
      searchForm: {}, //搜索框属性
      my_search:{}
    }
  },
  computed: {
    searchData() {
      return Object.assign(this.fy, this.searchForm, this.my_search);
    },
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
    },
    pageChange(page) {
      this.fy.page = page;
      this.getData()
    },
    pageSizeChange(size) {
      this.fy.size = size;
      this.getData()
    },
    getData() {
      this.tableLoading = true;
      this.axios.get('coin-search', {
        params: this.searchData
      }).then(res => {
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
