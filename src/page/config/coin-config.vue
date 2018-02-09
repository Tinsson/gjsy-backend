<template lang="html">
<div class="coin-config">
  <div id="titleBar">
    <div class="title">
      金币配置
    </div>
    <Button type="info" size="large" @click="addData">添加</Button>
  </div>

  <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>

  <Modal v-model="if_show" cancel-text width="300" title="添加充值" @on-ok="upload">
    <Row type="flex" justify="center">
      <Col span="20">
        <Input v-model="newData.money" number placeholder="请输入充值金额"></Input> <br> <br>
        <Input v-model="newData.coin" number placeholder="请输入充值金币"></Input>
      </Col>
    </Row>
  </Modal>
</div>
</template>

<script>
export default {
  name: 'coin-config',
  data() {
    return {
      columns: [{
        title: '序号',
        type: 'index',
        align: 'center'
      }, {
        title: '金币',
        key: '',
        align: 'center',
      }, {
        title: '金额',
        key: '',
        align: 'center'
      }, {
        title: '操作',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: "info"
              },
              style: {
                marginRight: '20px'
              },
              on: {
                click: () => {
                  this.rewrite(params.row)
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error'
              },
              on: {
                click: () => {

                }
              }
            }, '删除')
          ])
        }
      }],
      myData: [{}],
      if_show: false,
      key: '',
      newData: {
        coin: '',
        money: ''
      },
      type: 0, //0位充值 1位编辑
      tableLoading: false
    }
  },
methods: {
    clear(){
      this.newData={
        coin:'',
        money:''
      }
    },
    addData() {
      this.clear();
      this.if_show = true;
      this.type = 0;
    },
    rewrite(a) {
      this.clear();
      this.if_show = true;
      this.type = 1;
      this.key = a.row;
    },
    upload() {
      if (this.type = 0) {

      } else {

      }
    },
    getData() {

    },
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.coin-config {
    #titleBar {
        .title {
            font-size: 25px;
        }
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.input {
    width: 200px;
    font-size: 18px;
}
</style>
