<template lang="html">
  <div class="money-check">
    <Card class="money">
      <table>
        <tr>
          <th>账户余额</th>
          <th>当前可提现余额</th>
          <th>今日充值金额</th>
          <th>今日已提现金额</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </table>
    </Card>
    <title-bar title="红包数据" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Button type="info" name="btn" slot="btn" @click="exportData">导出数据</Button>
      <Table :columns="columns" :data="myData" border :loading="tableLoading" ref="table"></Table>
    </table-container>
  </div>
</template>

<script>
export default {
  name: 'moneyCheck',
  data: () => ({
    myData: [],
    columns: [{
      title: '日期',
      key: '',
      align: 'center'
    }, {
      title: '红包充值',
      key: '',
      align: 'center'
    }, {
      title: '充值笔数',
      key: '',
      align: 'center'
    }, {
      title: '当前余额',
      key: '',
      align: 'center'
    }, {
      title: '已提现金额',
      key: '',
      align: 'center'
    }, {
      title: '提现笔数',
      key: '',
      align: 'center'
    }, {
      title: '退款金额',
      key: '',
      align: 'center'
    }, {
      title: '手续费',
      key: '',
      align: 'center'
    }, {
      title: '状态',
      key: '',
      align: 'center'
    }, {
      title: '操作',
      align: 'center',
      render: (h, params) => {
        return h('Button', {
          props: {
            type: 'info'
          },
          on: {
            click: () => {
              let a = params.uid;
              let url = '/#/check/anomaly-bonus?params='+a;
              window.open(url)
            }
          }
        }, '查看异常')
      }
    }],
    searchList: [{
      label: '时间',
      type: 'daterange',
      placeholder: '请选择时间',
      model: 'register_time',
      start_end: ['start_time', 'end_time']
    }, {
      label: '状态',
      type: 'select',
      placeholder: '请选择',
      options: [{
        label: '全部',
        value: '',
      }, {
        label: '对账正常',
        value: 1
      }, {
        label: '对账异常',
        value: 0
      }],
      model: 'type'
    }],
    tableLoading: false,
    pageprops: { //分页配置
      showSizer: true,
      total: 0,
    },
    fy: { //当前分页属性
      page: 1,
      size: 10
    },
    searchForm: {}, //搜索框属性
    my_search: {}
  }),
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
    exportData() {
      this.$refs.table.exportCsv({
        filename: '红包数据'
      });
    },
    getData(){
        // this.tableLoading = true;
        // this.axios.get('backend-order-recharge', {
        //   params: this.searchData
        // }).then(res => {
        //   // console.log(res);
        //   if (res) {
        //     this.tableLoading = false;
        //     this.myData = res.data.list;
        //     this.pageprops.total = res.data.total;
        //   }
        // })
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<style lang="scss">
.money-check {
    .money {
        margin-bottom: 20px;
        table {
            font-size: 20px;
            margin-bottom: 80px;
            th {
                width: 300px;
            }
        }
    }
}
</style>
