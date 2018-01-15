<template>
  <div id="bonusDetail">
    <Modal v-model="if_show" title="红包详情" width="800px" class-name="no-auto">
      <div class="user-detail-container">
        <div class="head-info">
          <div class="info-line">
            <div class="user-info">
              <img class="avatar-img" :src="avatar" alt="">
              <p class="nick-name">{{nickname}}</p>
            </div>
            <p class="info-text">总奖金：{{receive_money}}/{{bonus_money}}元</p>
            <p class="info-text">当前状态：未领取完</p>
            <p class="info-text">服务费：{{service_money}}元</p>
          </div>
          <p class="pass-word">口令：<span class="text">{{bonus_password}}</span></p>
          <p class="create-time">{{created_at}} 生成</p>
        </div>
        <Table height="300" :columns="columns" :data="myData" :loading="tableLoading"></Table>
        <Spin size="large" fix v-if="left_loading"></Spin>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
import {copyObj} from '@/utils/common.js'

const audio = document.createElement('audio');
export default {
  name: "userDetail",
  data: () => ({
    id: '',
    table_type: '',

    avatar: '',
    nickname: '',
    bonus_money: '',
    receive_money: '',
    service_money: '',
    bonus_password: '',
    bonus_status: '',
    created_at: '',
    audio_src: '',

    columns: [{
      title: '头像',
      align: 'center',
      key: 'avatar',
      width: '80',
      render: (h, params)=>{
        return h('img',{
          attrs: {
            src: params.row.avatarulr
          },
          style: {
            width: '45px',
            height: '45px',
            marginTop: '5px',
            borderRadius: '5px'
          }
        })
      }
    },{
      title: '昵称',
      align: 'center',
      key: 'nickname'
    },{
      title: '红包金额',
      align: 'center',
      key: 'receive_money'
    },{
      title: '生成时间',
      align: 'center',
      width: '100',
      key: 'created_at'
    },{
      title: '录音时间',
      align: 'center',
      key: 'time_length'
    },{
      title: '操作',
      align: 'center',
      render: (h,params)=>{
        return h('Button', {
          props: {
            type: 'success'
          },
          on: {
            click: () => {
              console.log(this);
              this.a.methods.playVoice(params.row);
            }
          }
        }, '播放录音')
      }
    }],

    myData: [],
    imgShow: false,

    if_show: false,
    left_loading: false,
    tableLoading: false,

    user_detail: {},

    edit_user_info: false,
    user_info_form_copy:{},

    edit_user_data: false,
    user_data_form: {
      introduce: '',
      user_photos: []
    },
    user_data_form_copy: {

    },

    edit_user_trends: false,
    user_trends_form:{},
    user_trends_form_copy:{}
  }),
  computed: {
    user_data_sign_html() {
      return this.user_data_form.introduce.replace(/\n/g,'<br>')
    },
    user_sex() {
      if(this.user_info_form.sex == 1) {
        return '男'
      } else if (this.user_info_form.sex == 2){
        return '女'
      } else {
        return '未知'
      }
    }
  },
  methods: {
    show(row) {
      this.avatar = row.avatarulr;
      this.nickname = row.nickname;
      this.bonus_money = row.bonus_money;
      this.receive_money = row.receive_money;
      this.service_money = row.service_money;
      this.bonus_password = row.bonus_password;
      this.created_at = row.created_at;
      switch (row.status){
        case 1:
          this.bonus_status = '未领取完';
          break;
        case 2:
          this.bonus_status = '已被领完';
          break;
        case 3:
          this.bonus_status = '已过期';
          break;
      }

      this.uuid = row.id;
      this.if_show = true;
      this.axios.get(`bonus-details?bonus_id=${row.id}`).then(res=>{
        if(res.status === 1){
          this.myData = res.data.list;
        }
      });
    },
    playVoice: (row)=>{
      audio.src = row.receive_voice;
      audio.play();
    }
  }
}
</script>
<style lang="scss" scoped>

.user-detail-container{
  .head-info{
    padding: 0 0 10px;
    .info-line{
      display: flex;
      flex-direction: row;
      .user-info{
        width: 150px;
        .avatar-img{
          display: block;
          margin: 0 auto;
          width: 60px;
          height: 60px;
        }
        .nick-name{
          text-align: center;
          line-height: 35px;
          font-size: 14px;
          width: 150px;
        }
      }
      .info-text{
        width: 220px;
        font-size: 18px;
        line-height: 60px;
        text-align: center;
        &.first{
          margin-left: 100px;
        }
      }
    }
    .pass-word{
      text-align: center;
      padding-bottom: 20px;
      font-size: 16px;
      .text{
        font-size: 24px;
        color: #F00;
      }
    }
    .create-time{
      text-align: right;
    }
  }
}
</style>
