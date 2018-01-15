<template>
  <div id="income-detail">
    <title-bar title="分销列表" @refresh="refresh"></title-bar>
    <search-group :searchList="searchList" @search="search"></search-group>
    <table-container @on-change="pageChange" @on-page-size-change="pageSizeChange" page :pageprops="pageprops">
      <div slot="btn">
        总金额：0元
      </div>
      <Table :columns="columns" :data="myData" border :loading="tableLoading"></Table>
    </table-container>
  </div>
</template>
<script>
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
          title: '发包人',
          key: 'name',
          align: 'center'
        },{
          title: '微信ID',
          key: 'uid',
          align: 'center'
        },{
          title: '发红包金额',
          key: 'bonus_money',
          align: 'center'
        },{
          title: '被领取金额',
          key: 'payable_money',
          align: 'center'
        },{
          title: '提成金额',
          key: 'commission',
          align: 'center'
        },{
          title: '提成时间',
          key: 'created_at',
          align: 'center'
        }, {
          title: '受益者',
          key: 'to_name',
          align: 'center'
        }, {
          title: '微信ID',
          key: 'to_uid',
          align: 'center'
        }
      ],
      myData: [],
      tableLoading: false,
      searchList: [
        {
          label: '发包人',
          type: 'input',
          placeholder: '请输入昵称',
          model: 'uid'
        },{
          label: '收益者',
          type: 'input',
          placeholder: '请输入昵称',
          model: 'to_uid'
        },{
          label: '提成时间',
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
      my_search: {}
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
      this.tableLoading = true;
      this.axios.get('distribute-list',{
        params:this.searchData
      }).then(res=>{
        console.log(res);
        if(res){
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
<style lang="scss" scoped>
</style>
