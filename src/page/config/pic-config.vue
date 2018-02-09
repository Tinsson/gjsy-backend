<template lang="html">
  <div class="pic-config">
    <div id="titleBar">
      <div class="title">
        图片配置
      </div>
      <Button type="info" size="large" @click="addData">添加</Button>
    </div>
    <Table :columns="columns" border :data="myData"></Table>

      <Modal v-model="add_show" :closable="false" title="添加图片" ok-text="上传" @on-ok="upload" @on-cancel='handleRemove'>
        <Row type="flex" justify="center">
          <Col span="14" v-if="have_pic">
            <h1></h1>
            <img :src="uploadData" class="preview" width="260px"> <br>
            <span>文案</span>
            <Input type="textarea" v-model="doc" :row="2"></Input>
          </Col>
          <Col span="3">
            <Upload ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            :before-upload="handleBeforeUpload"
            :on-format-error="handleFormatError"
            action=""
            style="display: inline-block;width:58px;">
              <Button type="success" long >选择图片</Button>
            </Upload>
          </Col>
        </Row>
      </Modal>

  </div>
</template>

<script>
export default {
  name: 'pic-config',
  data() {
    return {
      columns: [{
        title: '序号',
        type: 'index',
        align: 'center',
        width: 80
      }, {
        title: '图片名称',
        key: '',
        align: 'center'
      }, {
        title: '配对文案',
        key: '',
        align: 'center'
      }, {
        title: '上线时间',
        key: '',
        align: 'center'
      }, {
        title: '状态',
        key: '',
        align: 'center'
      }, {
        title: '操作',
        align: 'center',
        render: (h, params) => {
          let a = params.row ? '上架' : '下架';
          return h('div', [
            h('Button', {
              props: {
                type: 'info'
              },
              style: {
                marginRight: '20px'
              },
              on: {
                click: () => {
                }
              }
            }, a),
            h('Button', {
              props: {
                type: 'error'
              },
              on: {
                click: () => {
                  this.remove(params.index)
                }
              }
            }, '删除')
          ])
        }
      }],
      myData: [{}],
      add_show: false,
      uploadData: '',
      doc: ''
    }
  },
  computed: {
    have_pic() {
      if (!this.uploadData) {
        return false
      } else return true
    }
  },
  methods: {
    addData() {
      this.add_show = true;
    },
    handleBeforeUpload(file) {

      let reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = (e) => {
        file.url = reader.result
        this.uploadData = file.url
      }
      return false;
    },
    handleRemove() {
      this.uploadData = ''
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    upload() {
      this.uploadData = ''
      this.doc = ''
    },
  }
}
</script>

<style lang="scss">
.pic-config {
    #titleBar {
        .title {
            font-size: 25px;
        }
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
