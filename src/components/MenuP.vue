<template>
<div id="menup">
  <button v-for="item in menuList" :key="item" :class="'btn'+(target===item?'-target':'')" @click="targetchange(item)">
    {{item}}
  </button>
</div>
</template>

<script>
//import {ref} from "vue";

import {ref} from "vue";

export default {
  name: "MenuP",
  props:["menulist"],
  emit:["saytofather"],
  setup(props,context){
    const saytofather = (e) => {
      console.log("saying");
      context.emit("saytofather", e);
      console.log("said");
    };
    return{
      saytofather,
      props,
      context,
      menuList:[
        "个人信息","视频","文章","浏览记录"
      ],
      target:ref('个人信息')
    }
  },
  methods:{
    targetchange:function (e){
      this.target=e;
      console.log(e);
      this.saytofather(e);
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#menup{
  width: 28vw;
  margin-left: 1vw;
  height: 5vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.btn{
  flex: 1;
  height: 100%;
  border: 0;
  font-size: small;
  background-color: white;
}

.btn:hover{
  background-color: gray;
  opacity: 0.5;
}

.btn-target{
  flex: 1;
  height: 100%;
  border: 0;
  font-size: small;
  background-color: #8EBCAF;
}
</style>