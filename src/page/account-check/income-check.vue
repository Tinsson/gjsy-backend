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
            <span>{{myData.all_recharge}}</span>
          </p> <br> <br>
          <p>红包充值 <span>{{myData.wx_recharge}}</span> </p>
          <p>金币充值 <span>{{myData.wx_recharge}}</span> </p>
        </Card>
      </Col>

      <Col  span="7" >
        <Card class="card" >
          <p>
            当日提现金额 <br>
            <span>{{myData.withdraw}}</span>
          </p>
        </Card>
      </Col>

      <Col  span="7" >
        <Card class="card" >
          <p>
            当日余额变化 <br>
            <span>{{myData.change_balance}}</span>
          </p>
        </Card>
      </Col>

      <Col span="7">
        <Card class="card">
          <p>当日总余额 <br>
            <span>{{myData.all_balance}}</span>
          </p>
        </Card>
      </Col>

      <Col span="7">
        <Card  class="card" >
          <p>
            当日红包毛利（手续费） <br>
            <span>{{myData.bonus_fees}}</span>
          </p>
        </Card>
      </Col>

      <Col span="7" >
        <Card  class="card" >
          <p>
            当日退款金额 <br>
            <span>{{myData.refund}}</span>
          </p>
        </Card>
      </Col>

      <Col span="7" >
        <Card  class="card" >
          <p>
            当日净利润 <br>
            <span>{{myData.profit}}</span>
          </p> <br> <br>
          <p>微信手续费
            <span>{{myData.wx_fees}}</span>
          </p>
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
    searchForm: {}, //搜索框属性
  }),
  computed: {
    searchData() {
      return {
        start_time: this.searchForm.start_time,
        end_time: this.searchForm.end_time
      }
    }
  },
  watch:{
    searchData:function () {
      this.getData()
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
    getData() {
      this.axios.get('income-check', {
        params:this.searchData
      }).then(res => {
        if (res) {
          this.myData = res.data.list;
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
.card {
    height: 200px;
    width: 330px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
        font-size: 15px;
        font-weight: 800;
        line-height: 150%;
    }
    p span {
        float: right;
    }
    p:first-child {
        font-size: 25px;
        font-weight: bold;
    }
}
</style>
