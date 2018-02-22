<template lang="html">
  <div class="ad-bonus">
    <title-bar title="广告红包管理" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" border :data="myData" :loading="tableLoading"></Table>
    </table-container>
    <ad-bonus-detail ref="adBonusDetail"></ad-bonus-detail>
    <ad-detail ref="adDetail"></ad-detail>
  </div>
</template>

<script>
import adDetail from './components/ad-detail.vue'
import adBonusDetail from './components/bonus-detail.vue'
export default {
  name: 'adBonus',
  data() {
    return {
      columns: [{
        title: '头像',
        align: 'center',
        render: (h, params) => {
          return h('img', {
            attrs: {
              src: params.row.avatarulr
            },
            style: {
              height: '45px',
              width: '45px'
            }
          })
        }
      }, {
        title: '昵称',
        key: 'name',
        align: 'center'
      }, {
        title: 'openid',
        key: 'uid',
        align: 'center'
      }, {
        title: '广告口号',
        key: 'bonus_password',
        align: 'center'
      }, {
        title: '生成时间',
        key: 'created_at',
        align: 'center'
      }, {
        title: '红包金额',
        key: 'bonus_money',
        align: 'center'
      }, {
        title: '已领/总数',
        key: 'receive_bonus_num',
        align: 'center'
      }, {
        title: '领取金额',
        key: 'receive_money',
        align: 'center'
      }, {
        title: '广告链接',
        align: 'center',
        render: (h, params) => {
          return h('Button', {
            props: {
              type: 'info',
              size: 'small'
            },
            on: {
              click: () => {
                let a = {
                  id: params.row.id
                }
                this.$refs.adDetail.show(a)
              }
            }
          }, '详情')
        }
      }, {
        title: '红包状态',
        key: 'status',
        align: 'center'
      }, {
        title: '服务费',
        key: 'service_money',
        align: 'center'
      }, {
        title: '退款金额',
        key: 'refund_money',
        align: 'center'
      }, {
        title: '操作',
        align: 'center',
        width: '150',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: "5px"
              },
              on: {
                click: () => {
                  this.axios.get('ad-del', {
                    params: {
                      bonus_id: params.row.id
                    }
                  }).then((res)=>{
                    if (res.status == 1) {
                      this.$Message.info('删除成功')
                      this.getData()
                    }
                  }
                  )
                }
              }
            }, '删除详情'),
            h('Button', {
              props: {
                type: 'info',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$refs.adBonusDetail.show(params.row)
                }
              }
            }, '查看')
          ])
        }
      }],
      searchList: [{
        label: '昵称',
        type: 'input',
        placeholder: '请输入昵称',
        model: 'name'
      }, {
        label: 'openid',
        type: 'input',
        placeholder: '请输入openid',
        model: 'openid'
      }, {
        label: '时间',
        type: 'daterange',
        placeholder: '请选择时间',
        model: 'created_time',
        start_end: ['start_time', 'end_time']
      }],
      tableLoading: false,
      myData: [],
      fy: { //当前分页属性
        page: 1,
        size: 10
      },
      pageprops: { //分页配置
        showSizer: true,
        total: 0,
      },
      searchForm: {}, //搜索框属性
      my_search: {}, //固定搜索属性
    }
  },
  computed: {
    searchData() {
      return Object.assign(this.fy, this.searchForm, this.my_search);
    }
  },
  watch: {
    searchData: function() {
      this.getData()
    }
  },
  components: {
    adDetail,
    adBonusDetail
  },
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
      this.tableLoading = true;
      this.axios.get('adv-search', {
        params: this.searchData
      }).then(res => {
        if (res) {
          this.tableLoading = false;
          this.myData = res.data.list;
          this.pageprops.total = res.data.total;
        }
      })
    },
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="css">
</style>
