import Vue from '@/assets/js/vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

// 主页
import home from '@/page/home'  //主页
import login from '@/page/login' //登录页面
import defaultPage from '@/page/default-page' //默认模块

// 用户
import user from '@/page/user/user' //用户管理

//红包管理
import bonus from '@/page/bonus/bonus'//红包管理
import askBonus from '@/page/bonus/ask-bonus'//讨红包管理
import adBonus from '@/page/bonus/ad-bonus' //广告红包管理

//分销管理
import distribute from '@/page/distribute/distribute'

//投诉管理
import complain from '@/page/complain/complain'

//红包大厅
import powerConf from '@/page/hall/power-conf'

//资金管理
import cashApply from '@/page/money/cash-apply' //提现申请
import cashList from '@/page/money/cash-list'  //提现列表
import giftDetail from '@/page/money/gift-detail' //礼物明细
import consumerDetail from '@/page/money/consumer-detail' //消费明细
import incomeDetail from '@/page/money/income-detail' //收入明细
import wxRecharge from '@/page/money/wx-recharge'//微信充值列表
import virtalCoinRecharge from '@/page/money/virtual_coin_recharge' //虚拟币充值记录
import virtalCoinDetail from '@/page/money/virtual_coin_detail' //虚拟币明细流水列表
import greatCash from '@/page/money/greatNumber' //大额提现申请

//配置管理
import globalConfig from '@/page/config/global-config' //全局配置
import taskNewcomer from '@/page/config/task-newcomer' //新手任务配置
import taskDaily from '@/page/config/task-daily' //每日任务配置
import picCofin from '@/page/config/pic-config' //图片配置
import coinConfig from '@/page/config/coin-config' //金币配置
import dialConfig from '@/page/config/dial-config' //大转盘配置

// 内容管理
import articleClass from '@/page/content/articleClass' //文章分类管理

//对账
import moneyCheck from '@/page/account-check/money-check' //红包资金对账
import incomeCheck from '@/page/account-check/income-check' //收支对账
import anomalyBonus from '@/page/account-check/anomaly-bonus' //异常红包明细

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: function(path) {
        console.log(path);
        return sessionStorage.getItem('user_id')
          ? '/home'
          : '/login'
      }
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/',
          name: 'defaultPage',
          component: defaultPage
        }, {
          path: '/user/users',
          name: 'user',
          component: user
        }, {
          path: '/content/article-class',
          name: 'articleClass',
          component: articleClass
        }, {
          path: '/bonus/bonus',
          name: 'bonus',
          component: bonus
        }, {
          path:'/bonus/ask-bonus',
          name:'askBonus',
          component:askBonus
        },{
          path:'/bonus/ad-bonus',
          name:'adBonus',
          component:adBonus
        },{
          path: '/distribute/distribute',
          name: 'distribute',
          component: distribute
        },{
          path: '/complain/complain',
          name: 'complain',
          component: complain
        },{
          path: '/hall/power-conf',
          name: 'power-conf',
          component: powerConf
        },{
          path: '/money/cash-apply',
          name: 'cashApply',
          component: cashApply
        }, {
          path: '/money/cash-list',
          name: 'cashList',
          component: cashList
        },{
          path: '/money/gift-detail',
          name: 'giftDetail',
          component: giftDetail
        },{
          path: '/money/consumer-detail',
          name: 'consumerDetail',
          component: consumerDetail
        },{
          path: '/money/income-detail',
          name: 'incomeDetail',
          component: incomeDetail
        },{
          path:'/money/wxRecharge',
          name:'wxRecharge',
          component:wxRecharge
        },{
          path:'/money/virtalCoinRecharge',
          name:'virtalCionRecharge',
          component:virtalCoinRecharge
        },{
          path:'/money/virtalCoinDetail',
          name:'virtalCionDetail',
          component:virtalCoinDetail
        },{
          path:'/money/greatCash',
          name:'greatCash',
          component:greatCash
        },{
          path: '/config/task-newcomer',
          name: 'taskNewcomer',
          component: taskNewcomer
        },{
          path: '/config/task-daily',
          name: 'taskDaily',
          component:taskDaily
        },{
          path: '/config/global-config',
          name: 'globalConfig',
          component: globalConfig
        },{
          path:'/config/pic-config',
          name:'picCofin',
          component:picCofin
        },{
          path:'/config/coin-config',
          name:'coinConfig',
          component:coinConfig
        },{
          path:'/config/dial-config',
          name:'dialConfig',
          component:dialConfig
        },{
          path:'/check/money-check',
          name:'moneyCheck',
          component:moneyCheck
        },{
          path:'/check/income-check',
          name:'incomeCheck',
          component:incomeCheck
        },
      ]
    },{
      path:'/check/anomaly-bonus',
      name:'anomalyBonus',
      component:anomalyBonus
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.hash)
  if (!sessionStorage.getItem('user_id') && to.path != '/login') {
    router.push('/login')
  }
  sessionStorage.setItem('cur_path', to.path)
  store.commit('SET_CUR_PATH', to.path)
  next(() => {
    console.log(123123123);
  });
})

export default router;
