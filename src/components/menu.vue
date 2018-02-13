<template>
<div id="my-menu">
  <Menu theme="dark" @on-select="goRoute" accordion :active-name="cur_path" :open-names="cur_open">
    <div class="layout-logo-left">
      <img class="logo" src="../assets/images/logo.png" alt=""> 小程序后台管理
    </div>
    <div class="user-panel">
      <div class="pull-left">
        <p class="text">Tinsson</p>
        <p class="state"><i class="icon-state"></i>online</p>
      </div>
    </div>
    <Submenu v-for="(group,pindex) in arr" :name="group.path" :key="pindex">
      <template slot="title">
          <Icon type="ios-paper"></Icon>
          {{group.name}}
      </template>
      <MenuItem v-for="(item,index) in group.children" :name="group.path+item.path" :key="index">{{item.name}}</MenuItem>
    </Submenu>
  </Menu>
</div>
</template>
<script>
export default {
  name: "my-menu",
  data: () => ({
    arr: [{
      id: '1',
      name: '用户管理',
      path: '/user',
      children: [{
        id: '2',
        name: '用户列表',
        path: '/users'
      }]
    },{
      id: '3',
      name: '红包管理',
      path: '/bonus',
      children: [{
        id: '4',
        name: '语音红包',
        path: '/bonus'
      },{
        id:'11',
        name:'讨红包管理',
        path:'/ask-bonus'
      },{
        id:'24',
        name:'广告红包管理',
        path:'/ad-bonus'
      }]
    },{
      id: '5',
      name: '资金管理',
      path: '/money',
      children: [{
        id: '6',
        name: '资金明细',
        path: '/income-detail'
      },{
        id:'12',
        name:'提现列表',
        path:'/cash-list'
      },{
        id:'16',
        name:'大额提现申请',
        path:'/greatCash'
      },{
        id:'13',
        name:'微信充值记录',
        path:'/wxRecharge'
      },{
        id:'14',
        name:'虚拟币充值记录',
        path:'/virtalCoinRecharge'
      },{
        id:'15',
        name:'虚拟币明细流水',
        path:'/virtalCoinDetail'
      }]
    },{
      id: '7',
      name: '分销管理',
      path: '/distribute',
      children: [{
        id: '8',
        name: '分销列表',
        path: '/distribute'
      }]
    },{
      id:'17',
      name:'对账',
      path:'/check',
      children:[
      //   {
      //   id:'18',
      //   name:'红包对账',
      //   path:'/money-check'
      // },
      {
        id:'19',
        name:'收支对账',
        path:'/income-check'
      }]
    },{
      id:'20',
      name:'管理配置',
      path:'/config',
      children:[{
        id:'21',
        name:'图片配置',
        path:'/pic-config'
      },{
        id:'22',
        name:'金币配置',
        path:'/coin-config'
      },{
        id:'23',
        name:'大转盘配置',
        path:'/dial-config'
      }]
    },{
      id: '9',
      name: '投诉管理',
      path: '/complain',
      children: [{
        id: '10',
        name: '投诉列表',
        path: '/complain'
      }]
    }]
  }),
  computed: {
    cur_path() {
      return this.$store.state.common.cur_path
    },
    cur_open() {
      return ['/'+this.$store.state.common.cur_path.split('/')[1]]
    }
  },
  methods: {
    goRoute(path) {
      this.$router.push(path);
    }
  }
}
</script>
<style lang="scss" scoped>
#my-menu {
    background-color: #373e4f;
    position:fixed;
    top:0;
    left:0;
    height: 100vh;
    overflow: auto;
}

.layout-logo-left {
    width: 90%;
    font-size: 18px;
    color: #FFF;
    text-align: center;
    border-radius: 3px;
    height:60px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
        width: 35px;
        height: 35px;
        margin-right: 5px;
    }
}
/*右边用户信息*/
.user-panel {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px;
    overflow: hidden;
    background-color: #283238;
    justify-content: center;
    .pull-left {
        padding-right: 10%;
        color: #FFF;
        &.hand {
            cursor: pointer;
        }
        .avator {
            width: 45px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 3px;
        }
        .text {
            font-size: 16px;
        }
        .state {
            font-size: 14px;
            .icon-state {
                width: 12px;
                height: 12px;
                margin-right: 5px;
                vertical-align: middle;
                border-radius: 50%;
                display: inline-block;
                background-color: #3c763d;
            }
        }
    }
}
</style>
