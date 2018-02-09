<template lang="html">
  <div class="ad-detail">
    <Modal v-model="if_show" cancel-text title="广告红包详细">
      <Table :columns="columns" :data="myData"></Table>
    </Modal>
  </div>
</template>

<script>
export default {
  name:'ad-detail',
  data:function () {
    return {
      columns:[{
        title:'红包id',
        align:'center',
        render:(h,params)=>{
          return h('span',this.id)
        }
      },{
        title:'文字',
        align:'center',
        render:(h,params)=>{
          if (params.row.text) {
            return h('span',params.row.text)
          }
        }
      },{
        title:'图片',
        key:'',
        align:'center',
        render:(h,params)=>{
          if (params.row.type === 'img') {
            return h('img',{
              attrs:{
                src:params.row.url
              },
              style:{
                width:'45px',
                height:'45px'
              }
            })
          }else return

        }
      }],
      if_show:false,
      myData:[],
      originalData:{},
      id:''
    }
  },
  methods:{
    show(row) {
      this.axios.get('adv-detail', {
        params: row
      }).then(res => {
        if (res) {
          this.if_show = true
          this.myData = JSON.parse(res.data.list.text)
          this.id = row.id
        }
      })
    },
  }

}
</script>

<style lang="css">
</style>
