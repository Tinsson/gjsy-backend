<template lang="html">
  <div class="pic" v-if="if_show" @click="if_show=false">
    <img :src="url" class="scale">
  </div>
</template>

<script>
export default {
  name:'scalePic',
  data(){
    return {
      if_show:false,
      url:''
    }
  },
  methods:{
    show(url){
      if (url) {
        this.if_show = true;
        this.url = url
      }
    }
  }
}
</script>

<style lang="css" scoped>
.pic {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(100, 100, 100, 0.5);
  z-index: 9999;
}

.scale {
  height: auto;
  width: auto;
  max-width: 60%;
  max-height: 80%;
}
</style>
