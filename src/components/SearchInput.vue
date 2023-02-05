<template>
<div class="box whiteInput">
  <input type="text" maxlength="20" placeholder="搜索" v-model="keywords">
  <img src="../img/search.png" class="searchbutton" @click="search"/>
</div>
</template>

<script>

import {ref} from "vue";

export default {
  name: "SearchInput",
  emits:["saytofather"],
  props:["icon"],
  setup(props,context){
    const saytofather = (e) => {
      console.log("saying");
      context.emit("saytofather", e);
      console.log("said");
    };
    return{
      keywords:ref(''),
      props,
      context,
      saytofather
    }
  },
  components:{

  },
  methods:{
    search:function (){
      console.log(1);
      this.saytofather(this.keywords);
    }
  }
}
</script>

<style scoped>
.box{
  width: 30vw;
  height: 4vh;
  border-radius: 0.5vh;
  border: 0;
  outline: 0;
  background-color: white;
  padding-left: 1vw;
  padding-right: 1vw;
  display: inline-block;
}

.whiteInput{
  background-color: white;
}


.whiteInput input{
  display: inline-block;
  width: 27vw;
  height: 3vh;
  border: 0;
  outline: 0;
  margin: 0;
  padding: 0;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
  color: black;
  font-size: 12px;
  background-color: transparent;
}

.searchbutton{
  display: inline-block;
  height: 2vh;
  width: 2vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  vertical-align: top;
  margin-left: 2.9vh;
}


</style>