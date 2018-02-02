<template lang="html">
  <div class="ask-bonus">
    <title-bar title="讨红包管理" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" border :data="myData"></Table>
    </table-container>
    <ask-bonus-detail ref="askBonusDetail"></ask-bonus-detail>
  </div>
</template>

<script>
import askBonusDetail from "./components/ask-bonus-detail"
export default {
  name: "ask-bonus",
  data() {
    return {
      columns: [{
        title: '序号',
        type: 'index',
        align: 'center',
        width: 80
      }, {
        title: '头像',
        align: 'center',
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
        key: 'name',
        align: 'center',
        width: '100'
      }, {
        title: '生成时间',
        key: 'created_at',
        align: 'center',
        width: '100'
      }, {
        title: '讨红包内容',
        align: 'center',
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
          }else {
            return h('span','无内容')
          }
        }
      }, {
        title: '已收集金额',
        key: 'receive_money',
        align: 'center'
      }, {
        title: '打赏人数',
        key: 'num',
        align: 'center'
      }, {
        title: '服务费',
        key: 'service_money',
        align: 'center'
      }, {
        title: '操作',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'info'
              },
              on: {
                click: () => {
                  this.my_search.id = params.row.id
                  this.$refs.askBonusDetail.show(this.my_search)
                }
              }
            }, '查看明细')
          ])
        }
      }],
      searchList: [{
        label: '检索',
        type: 'input',
        placeholder: '输入openid',
        model: 'openid'
      }, {
        label: '生成时间',
        type: 'daterange',
        placeholder: '请选择时间',
        model: 'created_time',
        start_end: ['start_time', 'end_time']
      }],
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
      my_search: {
        id:''
      }, //固定搜索属性
    }
  },
  components:{
    askBonusDetail
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
      this.axios.get('askbonus', {
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
  computed: {
    searchData() {
      return Object.assign(this.fy, this.searchForm, this.my_search);
    }
  },
  watch: {
    searchData: function() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

<style lang="scss">
</style>
