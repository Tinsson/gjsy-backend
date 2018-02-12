<template lang="html">
  <div class="greatCash">
    <title-bar title="提现列表" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
    <user-detail ref="userDetail"></user-detail>
  </div>
</template>

<script>
import userDetail from '@/page/user/components/user-detail-new'
import dbCheck from './components/dbCheck'
export default {
  name: 'greatCash',
  data() {
    return {
      columns: [{
        title: '序号',
        type: 'index',
        width: '80',
        align: 'center'
      }, {
        title: '昵称',
        key: 'name',
        align: 'center'
      }, {
        title: 'openid',
        key: 'uid',
        align: 'center'
      }, {
        title: '提现号',
        key: 'id',
        align: 'center'
      }, {
        title: '提现金额',
        key: 'money',
        align: 'center'
      }, {
        title: '操作',
        align: 'center',
        width: 260,
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'info',
              },
              style: {
                marginRight: "20px"
              },
              on: {
                click: () => {
                  this.$refs.userDetail.show(params.row.uid)
                }
              }
            }, '查看'),
            h(dbCheck, {
              props: {
                type: 0,
                ref: 'dbCheck',
                id:params.row.id
              },
              style: {
                marginRight: "20px"
              },
              on: {
                determine: this.determine
              }
            }),
            h(dbCheck, {
              props: {
                type: 1,
                ref: 'dbCheck',
                id:params.row.id
              },
              on: {
                determine: this.determine
              }
            })
          ])
        }
      }],
      searchList: [{
        label: 'openid',
        type: 'input',
        placeholder: '请输入openid',
        model: 'uid'
      }, {
        label: '申请时间',
        type: 'daterange',
        placeholder: '请选择注册时间',
        model: 'register_time',
        start_end: ['start_time', 'end_time']
      }],
      myData: [],
      tableLoading: false,
      pageprops: { //分页配置
        showSizer: true,
        total: 0,
      },
      fy: { //当前分页属性
        page: 1,
        size: 10
      },
      searchForm: {}, //搜索框属性
      my_search: {}
    }
  },
  components: {
    userDetail,
    dbCheck
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
      this.axios.get('search-review', {
        params: this.searchData
      }).then(res => {
        if (res) {
          this.tableLoading = false;
          this.myData = res.data.list;
          this.pageprops.total = res.data.total;
        }
      })
    },
    determine(type) {
      if (!type[1]) {
        console.log(type[0]);
        this.axios.get('edit-review',{
          params:{
            id:type[0],
            status:0
          }
        }).then(
          this.getData()
        )
      } else if (type[1] === 2) {
        this.axios.get('edit-review',{
          params:{
            id:type[0],
            status:0
          }
        }).then(
          this.getData()
        )
      }
    }
  },
  mounted() {
    this.getData();
  },
}
</script>

<style lang="scss">
</style>
