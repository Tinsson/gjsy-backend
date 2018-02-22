const urlList = {

  //图片上传
  'upload-img': '/product/upload',

  //用户管理
  'user-list': '/backend/user/list', //用户列表
  'user-panel':'/backend/user/panel',//用户面板
  'forbid':'/backend/user/forbid',//冻结接口

  //红包管理
  'bonus-list': '/backend/bonus/list', //红包列表
  'bonus-details': '/backend/bonus/detail', //红包详情
  'askbonus': '/backend/abonus/search', //讨红包管理
  'asksearch':'/backend/abonus/search-detail', //讨红包明细
  'adv-search':'/backend/bonus/adv-search',//广告红包列表
  'adv-detail':'/backend/bonus/adv-detail',//广告红包详情
  'ad-del':'/backend/bonus/del-remark',//广告红包删除

  //资金管理
  'bill-list': '/backend/bill/list', //资金列表

  //分销管理
  'distribute-list': '/backend/distribute/list',
  'distribute-detail': '/backend/distribute/detail',

  //分销收益明细列表
  'distribute-detail': '/backend/distribute/detail',

  //对账
  'income-check':'/backend/bill/stats',//收支对账

  //动态
  'get-circles': '/circles/list', //获取动态列表

  // 礼物管理

  'get-gifts': '/product/all', //获取礼物列表
  'gift-edit-status': '/product/edit-status', //修改礼物上下架状态
  'add-gift': '/product/add', //添加礼物
  'del-gift': '/product/del', //删除礼物
  'edit-gift': '/product/edit', //编辑礼物

  //资金管理

  'wallet-withdrawing': '/wallet/withdrawing', //获取提现列表
  'wallet-editStatus': '/wallet/editStatus', //编辑提现状态
  'wallet-count': '/wallet/count', //获取各状态的订单数
  'product-drop': '/product/drop', //获取礼物名称下拉列表
  'product-search': '/product/search', //获取礼物明细
  'bill-user-log-list': '/bill/user-log-list', //消费/收入明细
  'backend-order-recharge': '/backend/order/recharge', //充值/提现
  'recharge-list':'/backend/game/recharge-list',//虚拟币充值
  'coin-search':'/backend/game/search',//虚拟币明细
  'edit-review':'/backend/withdraw/edit-review',//大额提现审核
  'search-review':'/backend/withdraw/search-review', //大额提现列表


  //配置管理

  'system-config-list': '/system/config-list', //获取全局配置列表
  'system-edit-config': '/system/edit-config', //修改全局配置
  'task-name-list': '/task/name-list', //获取任务配置选项
  'task-list': '/task/list', //获取任务列表
  'task-add': '/task/add', //添加任务
  'task-edit': '/task/edit', //修改任务
<<<<<<< HEAD

  //红包大厅
  'power-all': '/backend/power/all', //后台体力配置列表
  'power-add': '/backend/power/add', //添加体力配置
  'power-edit': '/backend/power/edit', //编辑体力配置
=======
  'del-virtual':'/backend/game/del-virtual', //金币配置删除
  'add-virtual':'/backend/game/add-virtual',//金币配置添加
  'edit-virtual':'/backend/game/edit-virtual',//金币配置编辑
  'virtual-list':'/backend/game/virtual-list',//金币配置列表
  'bwheel-list':'/backend/game/bwheel-list',//大转盘列表
  'add-bwheel':'/backend/game/add-bwheel',//添加大转盘配置
  'edit-bwheel':'/backend/game/edit-bwheel',//编辑大转盘配置
  'del-bwheel':'/backend/game/del-bwheel',//删除大转盘配置

  'pic-list':'/backend/abonus/template',//图片管理列表
  'pic-add':'/backend/abonus/add',//图片管理添加
  'pic-edit':'/backend/abonus/edit',//图片管理编辑
  'pic-del':'/backend/abonus/del',//图片管理删除

>>>>>>> baominghui
}

export default urlList;
