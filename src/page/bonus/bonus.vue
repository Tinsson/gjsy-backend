<template>
  <div id="income-detail">
    <title-bar title="收入明细" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>

    <bonus-detail ref="bonusDetail"></bonus-detail>
  </div>
</template>
<script>
  import bonusDetail from './components/bonus-detail.vue'

  export default {
    name: "income-detail",
    data() {
      return {
        all_price: '',
        columns: [
          {
            title: '序号',
            key: 'id',
            align: 'center'
          },{
            title: '头像',
            align: 'center',
            width: '80',
            render: (h,params)=>{
              return h('img',{
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
          },{
            title: '昵称',
            key: 'nickname',
            align: 'center'
          },{
            title: '生成时间',
            key: 'created_at',
            align: 'center',
            width: '100'
          }, {
            title: '语音口令',
            key: 'bonus_password',
            align: 'center'
          }, {
            title: '红包金额',
            key: 'bonus_money',
            align: 'center'
          }, {
            title: '已领/总数',
            key: 'bonus_num',
            align: 'center',
            render: (h, params)=>{
              return h('span', `${params.row.receive_num}/${params.row.bonus_num}`);
            }
          },{
            title: '领取金额',
            align: 'center',
            key: 'receive_money'
          },{
            title: '口令内容',
            align: 'center',
            key: 'bonus_password'
          }, {
            title: '红包状态',
            key: 'status',
            align: 'center'
          },{
            title: '服务费',
            key: 'service_money',
            align: 'center'
          },{
            title: '退款金额',
            align: 'center',
            key: 'refund_money'
          }, {
            title: '退款服务费',
            key: 'refund_service_money',
            align: 'center'
          }, {
            title: '操作',
            key: 'operation',
            width: '90',
            align: 'center',
            render: (h, params)=>{
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info'
                  },
                  on: {
                    click: () => {
                      this.checkDetails(params.row)
                    }
                  }
                }, '查看')
              ])
            }
          }
        ],
        myData: [],
        tableLoading: false,
        searchList: [
          {
            label: '检索',
            type: 'input',
            placeholder: '输入关键词',
            model: 'keyword'
          },{
            label: '生成时间',
            type: 'daterange',
            placeholder: '请选择时间',
            model: 'created_time',
            start_end: ['start_time','end_time']
          }
        ],
        pageprops: { //分页配置
          showSizer:true,
          total:0,
        },
        fy: { //当前分页属性
          page: 1,
          size: 10
        },
        searchForm: {}, //搜索框属性
        my_search: {} //额外参数
      }
    },
    computed: {
      searchData () {
        return Object.assign(this.fy,this.searchForm,this.my_search);
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
        this.tableLoading = true
        this.axios.get('bonus-list',{
          params:this.searchData
        }).then(res=>{
          if(res){
            this.pageprops.total = res.data.total;
            this.myData = res.data.list
            this.tableLoading = false;
          }
        })
      },
      checkDetails(row){
        this.$refs.bonusDetail.show(row);
      }
    },
    mounted() {
      this.getData();
    },
    components: {
      bonusDetail
    }
  }
</script>
<style lang="scss" scoped>
</style>
