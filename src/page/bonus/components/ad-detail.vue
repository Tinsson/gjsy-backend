<template lang="html">
  <div class="ad-detail">
    <Modal v-model="if_show" cancel-text title="广告红包详细">
      <Table :columns="columns" :data="myData"></Table>
    </Modal>
    <scalePic ref="scalePic"></scalePic>
  </div>
</template>

<script>
import scalePic from './scalePic.vue'
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
              },
              on:{
                click:()=>{
                  this.$refs.scalePic.show(params.row.url)
                }
              }
            })
          }else return

        }
      }],
      if_show:false,
      myData:[],
      id:''
    }
  },
  components:{
    scalePic
  },
  methods:{
    show(row) {
      this.id = row.id
      this.axios.get('adv-detail', {
        params: row
      }).then(res => {
        if (res.data.list.text) {
          this.myData = JSON.parse(res.data.list.text)
          this.if_show = true
        }else {
          this.myData = []
          this.if_show = true
        }
      })
    },
  }

}
</script>

<style lang="css">
</style>
