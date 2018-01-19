<template>
<div id="power-conf">
  <title-bar title="体力值配置" @refresh="refresh"></title-bar>
  <table-container>
    <div slot="btn">
      <Button type="primary" @click="type='1';show=true;">添加</Button>
    </div>
    <Table :columns="columns" :data="myData" border></Table>
  </table-container>

  <Modal v-model="show" :title="type=='1'?'新增':'编辑'" @on-visible-change="modal_change">
    <Form ref="form" :model="form" :rules="rules" :label-width="80">
      <FormItem label="项目标识:" prop="title" v-if="type=='1'">
        <Input v-model="form.title"></Input>
      </FormItem>
      <FormItem label="项目标识:" v-if="type!='1'">
        {{form.title}}
      </FormItem>
      <FormItem label="项目名称:" prop="name">
        <Input v-model="form.name"></Input>
      </FormItem>
      <FormItem label="体力值:" prop="num">
        <InputNumber :step="1" v-model="form.num"></InputNumber>
      </FormItem>
    </Form>
    <div class="gift-footer" slot="footer">
      <Button type="primary" @click="submit()">提交</Button>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  name: "power-conf",
  data() {
    return {
      form: {
        title:'',
        name:'',
        num:0,
        id:''
      },
      rules:{
        title:[
          {required: true,message: '请填写title'},
        ],
        name:[
          {required: true,message: '请填写项目名称'},
        ]
      },

      columns: [{
        title: '标识',
        key: 'title',
        align: 'center'
      }, {
        title: '项目',
        key: 'name',
        align: 'center'
      }, {
        title: '体力',
        key: 'num',
        align: 'center'
      }, {
        title: '操作',
        key: 'type',
        align: 'center',
        render: (h, params) => {
          return h('Button', {
            props: {
              type: 'text'
            },
            on: {
              click: ()=>{
                for(let key in params.row) {
                  this.form[key] = params.row[key]
                }
                this.type='2';
                this.show=true;
              }
            }
          }, '编辑')
        }
      }],
      myData: [],
      tableLoading: false,
      show: false,
      type: '1', //1新增  2编辑

    }
  },
  methods: {
    refresh() {
      this.getData();
    },
    getData() {
      this.tableLoading = true;
      this.axios.get('power-all').then(res => {
        if (res) {
          this.tableLoading = false;
          this.myData = res.data.list;
        }
      })
    },
    modal_change(show) {
      if(!show){
        this.form.type = '1';
        this.form.title = '';
        this.form.name = '';
        this.form.num = 0;
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.type=='1') {
            this.axios.post('power-add',this.form).then(res=>{
              if(res){
                this.show = false;
                this.getData()
              }
            })
          }
          if(this.type=='2') {
            this.axios.post('power-edit',{
              id:this.form.id,
              name:this.form.name,
              num:this.form.num
            }).then(res=>{
              if(res) {
                this.show = false;
                this.getData()
              }
            })
          }
        }
      })
    }
  },
  mounted() {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
</style>
