<template>
<div class="box" v-on:click="toArticle">
  <!--
  <div class="userInfo">
    <img :src="props.content.user.image_path"/>
    {{props.content.user.user_name}}
  </div>
  -->
  <div class="titleZone">
    <p class="title">
    {{props.content.title}}
    </p>
    <p class="time">
    {{props.content.releaseTime}}
    </p>
    <p class="viewtimes">
      {{props.content.viewTimes}}
    </p>
  </div>
  <div class="introduction">
    <p>{{props.content.introduction}}</p>
  </div>
</div>
</template>

<script>
import router from "@/router";

export default {
  name: "articleCard",
  props:{
    content:{
      id:String,//文章id
      title:String,//标题
      introduction:String,
      releaseTime:String,//发布时间
      viewTimes:Number,//浏览次数
      secondType:[],//二级分类，all
      /*
      user:{
        avatar:String,//头像地址
        nickname:String,//昵称
      }
       */
    }
  },
  setup(props,context){
    return{
      props,
      context
    }
  },
  methods:{
    toArticle:function (){
      router.push("/article");
    }
  }
}
</script>

<style scoped>
.box{
  width: 18vw;
  height: 18vw;
  display: inline-block;
  margin: 0 1.25vw;
  background: #ffffff;
  box-shadow: 0 0 1vw rgba(33,33,33,.2);
  position: relative;
  z-index: 10;
  padding: 0.5vw;
}

.box:hover{
  opacity: 80%;
}
.userInfo{
  width: 18vw;
  height: 4vw;
  padding: 0;
  margin: 0;
  border: 0;
  display: block;
  line-height: 4vw;
  font-size: 14px;
}
.userInfo img{
  width: 3vw;
  height: 3vw;
  border-radius: 1.5vw;
  margin: 0.5vw;
  vertical-align: top;
}
.titleZone{
  width: 18vw;
  height: 4vw;
  padding: 0;
  margin: 0;
  border: 0;
  display: block;
}
.title{
  font-size: 16px;
  overflow:hidden;
  text-overflow:ellipsis;
  font-weight: bold;
  -webkit-line-clamp: 2;
  display: -webkit-box;-webkit-box-orient: vertical;

}
.time{
  font-size: 12px;
  float: left;
}

.introduction{
  width: 18vw;
  height: 6vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
}
.introduction p{
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp: 6;
  font-size: 15%;
  display: -webkit-box;-webkit-box-orient: vertical;
}
.viewtimes{
  float: right;
  font-size: 12px;
}

</style>
