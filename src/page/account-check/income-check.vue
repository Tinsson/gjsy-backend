<template lang="html">
<div class="income-check">
  <title-bar title="红包数据" @refresh="refresh"></title-bar>
  <search-group :searchList="searchList" @search="search"></search-group>
  <div class="msg">
    <Row type='flex' justify="center" :gutter="80">
      <Col span="7">
        <Card class="card" >
          <p>
            当日总收入<br>
          </p>
          <p>红包充值</p>
          <p>金币充值</p>
        </Card>
      </Col>
      <Col  span="7" >
        <Card class="card" >
          <p>
            当日提现金额 <br>
          </p>
        </Card>
      </Col>
      <Col  span="7" >
        <Card class="card" >
          <p>
            当日余额变化 <br>
          </p>
        </Card>
      </Col>
      <Col span="7">
        <Card class="card">
          <p>当日总余额 <br>
          </p>
        </Card>
      </Col>

      <Col span="7">
        <Card  class="card" >
          <p>
            当日红包毛利（手续费） <br>
          </p>
        </Card>
      </Col>
      <Col span="7" >
        <Card  class="card" >
          <p>
            当日退款金额 <br>
          </p>
        </Card>
      </Col>
      <Col span="7" >
        <Card  class="card" >
          <p>
            当日净利润 <br>
          </p>
          <p>微信手续费 <br></p>
        </Card>
      </Col>
    </Row>
  </div>
</div>
</template>

<script>
export default {
  name: 'incomeCheck',
  data: () => ({
    myData: [],
    searchList: [{
      label: '时间',
      type: 'daterange',
      placeholder: '请选择时间',
      model: 'register_time',
      start_end: ['start_time', 'end_time']
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
    getData() {
      // this.axios.get('backend-order-recharge', {
      //   params: this.searchData
      // }).then(res => {
      //   // console.log(res);
      //   if (res) {
      //     this.myData = res.data.list;
      //     this.pageprops.total = res.data.total;
      //   }
      // })
    },
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="scss">
.card {
    height: 200px;
    width: 330px;
    margin-bottom: 20px;
    p {
        font-size: 15px;
        font-weight: 800;
        line-height: 120%;
    }
    p:first-child {
        font-size: 25px;
        font-weight: bold;
    }
}
</style>
