<template lang="html">
<div class="ad-bonus-detail" v-if="if_show">
  <Modal width="1000" v-model="if_show" title="红包详情">
    <Card>
      <Card>
        <Row>
          <Col span="3">
            <img class="avatarulr" :src="userData.avatarulr">
          </Col>
          <Col span="12">
            <span>昵称: {{userData.nickname}}</span><br>
            <span>openid: {{userData.uid}}</span>
          </Col>
          <Col span="8">
            <span>累计收到: {{userData.receive_money}}</span><br>
            <span>发送时间: {{userData.created_at}}</span>
          </Col>
        </Row>
        <Row>
          <div class="userContent">
            <span v-if="userData.remark_type==0">{{userData.remark_word}}</span>
            <Button v-else type="success" @click="voiceOn(userData.remark_voice)">播放录音</Button>
          </div>
        </Row>
      </Card>
    </Card>

    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" :data="myData"></Table>
    </table-container>
  </Modal>
</div>
</template>

<script>
export default {
  name: "adBonusDetail",
  data: () => ({
    columns: [{
      title: '序号',
      align: 'center',
      type: 'index',
      align: 'center',
      width: '60'
    }, {
      title: '头像',
      align: 'center',
      key: 'avatarulr',
      width: 80,
      render: (h, params) => {
        return h('img', {
          attrs: {
            src: params.row.avatarulr
          },
          style: {
            width: '45px',
            height: '45px',
            borderRadius: '5px',
          }
        })
      }
    }, {
      title: '昵称',
      align: 'center',
      key: 'nickname'
    }, {
      title: 'openid',
      align: 'center',
      key: 'uid'
    }, {
      title: '金额',
      align: 'center',
      key: 'money'
    }, {
      title: '时间',
      align: 'center',
      key: 'created_at'
    }, {
      width: '60',
      align: 'center',
      type: 'expand',
      title: '内容',
      render: (h, params) => {
        let content = params.row.remark_type === 1 ? params.row.remark_word : params.row.remark_voice;
        const audio = document.createElement('audio')
        if (params.row.remark_type === 1) {
          return h('span', content)
        } else if(params.row.remark_type === 2){
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
        } else {
          return h('span',"什么也没说")
        }
      }
    }],
    myData: [],
    userData: [],
    if_show: false,
    pageprops: { //分页配置
      showSizer: true,
      total: 0,
    },
    fy: { //当前分页属性
      page: 1,
      size: 20
    },
  }),
  methods: {
    show(row) {
      this.axios.get('asksearch', {
        params: row
      }).then(res => {
        if (res) {
          this.msg = res.data.info;
          this.myData = res.data.list.list;
          this.myData.forEach((item)=>{
            item._expanded = true
          })
          this.userData = res.data.list;
          this.if_show = true;
        }
      })
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
    voiceOn(src) {
      const audio = document.createElement('audio')
      audio.src = src;
      audio.play();
    }
  },
}
</script>

<style lang="scss" scoped>
.avatarulr {
    margin-left: 10px;
    width: 50px;
    height: 50px;
}

.userContent {
    width: 100%;
    padding-top: 5px;
    text-align: center;
}

span {
    line-height: 200%;
}
</style>
