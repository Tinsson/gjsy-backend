<template lang="html">
  <div class="distributeDetail" v-if="if_show">
    <Modal
      v-model="if_show"
      class="detail-model"
      width="1200px"
      >
      <Card class="detail-msg">
      <Row>
        <Col span="2">
          <div class="user">
              <img :src='msg.avatarulr' class="avatar-img">
              <span>{{msg.nickname}}</span>
          </div>
        </Col>
        <Col span="11">
          <div class="msg">
            <span>下线总人数：{{msg.count}} 人</span>
            <span>贡献金额：{{msg.money}} 元</span>
            <span>加入时间：{{msg.binding_time}}</span>
            <br>
            <span>一级人数: {{msg.count_one}}</span>
            <span>二级人数: {{msg.count_second}}</span>
          </div>
        </Col>
        <Col span="10">
          <div class="puser">
            <span>上线：</span>
            <img :src="msg.pid_avatarulr">
            <div class="puser_msg">
              <span>{{msg.pid_nickname}}</span><br>
              <span class="openid" @click="copyToClipboard(msg.pid)">openid: {{msg.pid}}</span>
            </div>
          </div>
      </Col>
    </Row>
      </Card>

      <search-group :searchList="searchList" @search="search"></search-group>

      <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
        <Table :columns="columns" :data="myData"></Table>
      </table-container>
    </Modal>
  </div>
</template>

<script>
export default {
  name:'distributeDetail',
  data: () => ({
    searchList: [{
        label: 'openid',
        type: 'input',
        placeholder: '请输入openid',
        model: 'uid'
      },
      {
        label: '生成时间',
        type: 'daterange',
        placeholder: '时间筛选',
        model: 'created_time',
        start_end: ['start_time', 'end_time']
      },
      {
        label: '下线层级',
        type: 'select',
        model: 'depth',
        options: [{
          label: '全部',
          value: ''
        }, {
          label: '1',
          value: 1
        }, {
          label: '2',
          value: 2
        }]
      }
    ],
    myData: [],
    msg: {},

    columns: [{
      title: '序号',
      key: 'id',
      align: 'center'
    }, {
      title: '头像',
      key: 'avatarulr',
      align: 'center',
      width: '80',
      render: (h, params) => {
        return h('img', {
          attrs: {
            src: params.row.avatarulr
          },
          style: {
            width: "45px",
            height: "45px",
            marginTop: "5px"
          }
        })
      }
    }, {
      title: '昵称',
      key: 'nickname',
      align: 'center'
    }, {
      title: 'openid',
      key: 'uid',
      align: 'center'
    }, {
      title: '下线层级',
      key: 'depth',
      align: 'center'
    }, {
      title: '加入时间',
      key: 'time',
      align: 'center'
    }, {
      title: '贡献次数',
      key: 'num',
      align: 'center'
    }, {
      title: '贡献金额',
      key: 'money',
      align: 'center'
    }],
    searchForm: {}, //搜索框属性
    my_search: {},
    if_show: false,

    pageprops: { //分页配置
      showSizer: true,
      total: 0,
    },
    fy: { //当前分页属性
      page: 1,
      size: 10
    },

  }),
  props: {
    my_search_id: {
      type: Object
    }
  },
  computed: {
    searchData() {
      return Object.assign(this.my_search_id, this.searchForm, this.fy)
    }
  },
  watch:{
    searchData:function () {
      // console.log(this.searchData);
      this.show(this.searchData)
    }
  },
  methods: {
    show(row) {
      this.axios.get('distribute-detail', {
        params: row
      }).then(res => {
        if (res) {
          this.msg = res.data.info;
          this.myData = res.data.list;
          this.if_show = true;
          // console.log(this.myData);
        }
      })
    },
    copyToClipboard(text) {
      if (text.indexOf('-') !== -1) {
        let arr = text.split('-');
        text = arr[0] + arr[1];
      }
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'openid已复制到剪切板' : '该浏览器不支持点击复制到剪贴板';
        this.$Message.info(msg);
      } catch (err) {
        this.$Message.warning('该浏览器不支持点击复制到剪贴板');
      }

      document.body.removeChild(textArea);
    },
    search(data) {
      this.searchForm = data;
      this.show(this.searchData);
    },
    pageChange(page) {
      this.fy.page = page;
      this.show(this.searchData);
    },
    pageSizeChange(size) {
      this.fy.page = 1;
      this.fy.size = size;
      this.show(this.searchData);
    },

  }

}
</script>

<style lang="scss" scoped>
.detail-msg {
    margin-bottom: 10px;
    .user {
        display: inline-block;
        img {
            margin-right: 10px;
            width: 60px;
            height: 60px;
        }
        span {
            display: block;
            width: 80px;
            line-height: 18px;
            font-size: 16px;
            font-weight: bold;
        }
    }
    .msg {
        display: inline-block;
        line-height: 30px;
        span {
            margin-right: 20px;
            font-size: 16px;
        }
    }
    .puser {
        display: inline-block;
        font-size: 16px;
        font-weight: normal;
        .puser_msg {
            display: inline-block;
            .openid {
                cursor: pointer;
            }
        }
        img {
            width: 60px;
            height: 60px;
        }
    }
}
</style>
