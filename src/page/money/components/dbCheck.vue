<template>
  <div class="dbCheck">

    <Poptip title="请确认是否不通过？" v-if="type" confirm @on-ok="noConfirm" width="180">
      <Button type='warning'>不通过</Button>
    </Poptip>

    <Poptip title="请确认是否通过？" v-else confirm @on-ok="yesConfirm">
      <Button type='success'>通过</Button>
    </Poptip>

  </div>
</template>

<script>
export default {
  name: 'dbcheck',
  props: ['type','id'],
  methods: {
    yesConfirm() {
      this.$Modal.confirm({
        content: '请再次确认是否通过？',
        onOk: () => {
          this.$emit('determine',[this.id,2])
        },
      })
    },
    noConfirm(){
      this.$Modal.confirm({
        content: '请再次确认是否不通过？',
        onOk: () => {
          this.$emit('determine',[this.id,0])
        },
      })
    }
  }
}
</script>

<style lang="scss">
.dbCheck{
  display: inline-block;
}
</style>
