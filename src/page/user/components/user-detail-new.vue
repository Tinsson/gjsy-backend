<template lang="html">
  <div class="user-detail">
    <Modal v-model="if_show" title="用户详情" width="1000" cancel-text>
      <Row :gutter='5'>
        <Col span="18">
          <div class="user_tag">
              <img class="user_img">
              <div class="money_msg">
                <span>昵称</span>
                <span>ip:</span>
                <br><br>
                <span>账户余额:</span>
                <span>金币余额:</span>
              </div>
          </div>
          <Row>
                <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
                  <div slot="btn">
                    <Button @click="changeType(0)" type="info">发口令</Button>
                    <Button @click="changeType(1)" type="info">发语音</Button>
                    <Button @click="changeType(2)" type="info">抢口令</Button>
                    <Button @click="changeType(3)" type="info">抢语音</Button>
                    <Button @click="changeType(4)" type="info">资金变动</Button>
                    <Button @click="changeType(5)" type="info">金币记录</Button><br><br>
                    <DatePicker type="daterange" v-model="register_time" confirm :clearable="false" :editable="false" @on-ok="search" @on-clear="clear"></DatePicker>
                  </div>
                  <Table :columns="$data['columns'+type]" :data="$data['myData'+type]" border :loading="tableLoading"></Table>
                  </table-container>
          </Row>
        </Col>
        <Col span="6">
          <Card>
            <div class="msg">
              <p slot="title" >基本资料</p>
              <p>首次进入时间 <span></span> </p>
              <p>是否进入分销状态</p>
              <p>加入时间 <br> <span></span> </p>
              <p>是否黑名单</p>
              <div class="btn">
                <Button v-if="freeze">解冻</Button>
                <Button v-else>冻结</Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

    </Modal>
  </div>
</template>

<script>
export default {
  name: 'user-detail',
  data: () => ({
    columns0: [{
      title: '发送时间',
      key: '',
      align: 'center'
    }, {
      title: '红包金额',
      key: '',
      align: 'center'
    }, {
      title: '内容',
      key: '',
      align: 'center'
    }, {
      title: '红包状态',
      key: '',
      align: 'center'
    }, {
      title: '手续费',
      key: '',
      align: 'center'
    }, {
      title: '领取金额',
      key: '',
      align: 'center'
    }, {
      title: '退款金额',
      key: '',
      align: 'center'
    }],
    columns1: [{
      title: '发送时间',
      key: '',
      align: 'center'
    }, {
      title: '红包金额',
      key: '',
      align: 'center'
    }, {
      title: '语音',
      align: 'center',
      render: (h, params) => {
        let content = params.row.remark_voice;
        const audio = document.createElement('audio')
        return h('Button', {
          props: {
            type: 'success'
          },
          on: {
            click: () => {
              audio.src = params.row.remark_voice;
              audio.play();
            }
          }
        }, '播放录音')
      }
    }, {
      title: '红包状态',
      key: '',
      align: 'center'
    }, {
      title: '手续费',
      key: '',
      align: 'center'
    }, {
      title: '领取金额',
      key: '',
      align: 'center'
    }, {
      title: '退款金额',
      key: '',
      align: 'center'
    }],
    columns2: [{
      title: '领取时间',
      key: '',
      align: 'center'
    }, {
      title: '红包金额',
      key: '',
      align: 'center'
    }, {
      title: '内容',
      key: '',
      align: 'center'
    }, {
      title: '发包人',
      key: '',
      align: 'center'
    }, {
      title: '余额',
      key: '',
      align: 'center'
    }],
    columns3: [{
      title: '领取时间',
      key: '',
      align: 'center'
    }, {
      title: '红包金额',
      key: '',
      align: 'center'
    }, {
      title: '内容',
      key: '',
      align: 'center'
    }, {
      title: '发包人',
      key: '',
      align: 'center'
    }, {
      title: '余额',
      key: '',
      align: 'center'
    }],
    columns4: [{
      title: '变动时间',
      key: '',
      align: 'center'
    }, {
      title: '交易类型',
      key: '',
      align: 'center'
    }, {
      title: '变动金额',
      key: '',
      align: 'center'
    }],
    columns5: [{
      title: '变动时间',
      key: '',
      align: 'center'
    }, {
      title: '变动类型',
      key: '',
      align: 'center'
    }, {
      title: '变动额度',
      align: 'center',
      key: ''
    }, {
      title: '金币余额',
      key: '',
      align: 'center'
    }],
    if_show: false,
    tableLoading: true,

    myData0: [],
    myData1: [],
    myData2: [],
    myData3: [],
    myData4: [],
    myData5: [],

    type: 0,
    pageprops: { //分页配置
      showSizer: true,
      total: 0,
    },
    fy: { //当前分页属性
      page: 1,
      size: 10
    },
    searchForm: {}, //搜索框属性
    my_search: {
      key: ''
    },
    register_time: [],
    start_time: '',
    end_time: '',
    freeze:false
  }),

  computed: {
    searchData() {
      return {
        start_time: this.start_time,
        end_time: this.end_time,
        ...this.fy,
        ...this.my_search
      }
    }
  },
  methods: {
    getTime(date, type) {
      // type:0 起始时间
      // type:1 终止时间
      if (!date) {
        return '';
      }
      let time = '';
      let Y = date.getFullYear();
      let M = date.getMonth() + 1;
      let D = date.getDate();
      time = type == 0 ? time + Y + '-' + M + '-' + D + ' ' + '00:00:00' : time + Y + '-' + M + '-' + D + ' ' + '23:59:59'
      return time;
    },
    search() {
      console.log('search');
      this.start_time = this.getTime(this.register_time[0], 0);
      this.end_time = this.getTime(this.register_time[1], 1);
    },
    clear(type) {
      this.type = type;
      this.fy.page = 1;
      this.fy.size = 10;
      this.start_time = '';
      this.end_time = ''
    },
    refresh() {
      this.show();
    },
    // search(data) {
    //   this.searchForm = data;
    //   this.show();
    // },
    pageChange(page) {
      this.fy.page = page;
      this.show();
    },
    pageSizeChange(size) {
      this.fy.size = size;
      this.show();
    },
    changeType(type) {
      this.fy = {
        page: 1,
        size: 10
      }
      this.type = type
    },
    show(row) {
      this.my_search.key = row;
      // this.axios.get('distribute-detail', {
      //   params: row
      // }).then(res => {
      //   if (res) {
      //     this.myData = res.data.list;
      //     this.if_show = true;
      //     // console.log(this.myData);
      //   }
      // })
      this.if_show = true;
    },
  }

}
</script>

<style lang="scss">
.user_tag {
    display: flex;
    justify-content: left;
    margin-bottom: 5px;
    .user_img {
        width: 80px;
        height: 80px;
        margin-right: 40px;
    }
    .money_msg {
        display: inline-block;
        span {
            font-size: 17px;
        }
        span:first-child {
            font-size: 20px;
            display: inline-block;
            margin-right: 50px;
        }
    }
}

.msg {
    text-align: center;

    p {
        text-align: left;
        margin-bottom: 40px;
        text-indent: 2px;
    }

    p:first-child {
        font-size: 20px;
        font-weight: bold;
        border-bottom: 2px solid #eee;
    }
}
</style>
