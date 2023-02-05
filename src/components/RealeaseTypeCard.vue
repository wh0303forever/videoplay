<template>
  <div id="cardBox">
    <button class="card" style="margin-right: 2vh" v-on:click="toVideo">
      <VideoCamera class="section" color="#FF8A33"/>
      视频
    </button>
    <button class="card"  v-on:click="toArticle">
      <Document class="section" color="#33AEFF"/>
      文章
    </button>

  </div>
</template>

<script>
//import 'element-plus/dist/index.css'
import {VideoCamera,Document} from "@element-plus/icons-vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {ref} from "vue";

export default {
  props:[],
  setup(props) {
    return{
      props,
      ElMessage,
      isLogin:ref(false)
    }
  },
 components:{
   VideoCamera,
   Document
 },
  methods:{
    toVideo:function (){
      if(this.isLogin)
      router.push("/realeaseVideo");
      else
        this.ElMessage('请先登录！');
    },
    toArticle:function (){
      //router.push("/realeaseArticle");
    }
  },
  mounted() {
    this.isLogin=this.$store.state.isLogin;
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#cardBox{
  width: 22vh;
  height: 10vh;
}
.card{
  width: 10vh;
  height: 10vh;
  display: inline-block;
  border-radius: 2vh;
  text-align: center;
  font-color: darkslategrey;
  font-size: 12px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow:  20px 20px 60px #c9c9c9,
  -20px -20px 60px #ffffff;
  border: 1px solid #e6e6e6;
}

.section{
  width: 5vh;
  height: 5vh;
  margin-left: 2.5vh;
  margin-top: 1vh;
  display: block;
}
</style>
