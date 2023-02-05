<template>
<div class="videoCard" v-on:click="toVideo" :id="props.content.id">
  <img :src="props.content.cover"/>
  <div class="userZone">
    <img :src="props.content.user.image_path"/>
    <div class="username">{{props.content.user.user_name}}</div>
  </div>
  <div class="videoMessageZone">
    <p class="videoTitle">
      {{props.content.title}}
    </p>
      <p class="time">
        {{props.content.releaseTime}}
      </p>
    <el-tag>{{props.content.secondType}}</el-tag>
  </div>
  <div class="videoInfo">
    <p style="float: right;margin-right: 1vw">{{props.content.duration}}秒</p>
    <p style="float: left;margin-left: 1vw;margin-bottom: 0">{{props.content.playTimes}}次播放</p>
  </div>
</div>
</template>

<script>
import {ElTag} from "element-plus";
export default{
  name: "videoCard",
  props:{
    content:{
      id:Number,
      cover:String,//封面
      title:String,
      releaseTime:String,//发布时间
      user:{
        avatar:String,//头像地址
        nickname:String,//昵称
      },
      duration:String,//时长
      playTimes:String,//播放次数
      secondType:String//二级分类
    }
  },
  methods:{
    toVideo:function (){
      var id=this.props.content.id;
      this.$router.push({name:'video',params: {id:id}})
    }
  },
  setup(props){
    return{
      props
    }
  },
  components:{
    ElTag
  },
  mounted() {

  }
}
</script>

<style scoped>
.videoCard{
  width: 20vw;
  height: 20vw;
  display: inline-block;
  margin: 0 1.25vw;
  background: #ffffff;
  box-shadow: 0 0 1vw rgba(33,33,33,.2);
  position: relative;
}

.videoCard:hover,
.videoCard:focus {
  opacity: 0.8;
  background-color: #f5f6f5;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 }
}

img{
  width: 100%;
  height: 60%;
}
.userZone{
  display: inline-block;
  height: 15%;
  width: 90%;
  padding: 0 5%;
  position: relative;
}
.userZone img{
  width: 11%;
  height: 66%;
  border-radius: 3vw;
  margin-top: 0.5vw;
  display: inline-block;
}
.username{
  font-size: 80%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 18%;
  vertical-align: top;
}
.videoMessageZone{
  display: inline-block;
  height: 22.5%;
  width: 90%;
  margin-left: 5%;
  position: relative;
}
.videoTitle{
  font-size: 100%;
  margin-bottom: 2.5%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.time{
  font-size: 70%;
  display: inline-block;
  vertical-align: center;
  margin-right: 5px;
}
.videoInfo{
  width: 100%;
  height: 10%;
  position: absolute;
  left: 0;
  top: 50%;
  font-size: 50%;
  color: white;
}
</style>