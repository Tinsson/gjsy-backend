<template>
  <div id="defaultPage">
    <h1 @click="show">欢迎使用微信小程序（赶紧说呀）后台管理系统</h1>
  </div>
</template>
<script>
export default {
  name: "defaultPage",
  data: () => ({

  }),
  methods: {
    show() {
      console.log(location.hash);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
