<template>
<div class="box">
  <TopBar />
  <el-scrollbar class="left">
    <div class="left_top">
      <el-button type="success"
                 :icon="ArrowLeftBold"
                 class="btn_return"
                 circle size="large"
                 @click="returnBack"
      >
      </el-button>
      <p>{{contents.title}}</p>
    </div>
    <div class="videobox">
    <video
        id="myVideo"
        style="height: 100%;width: 100%;outline: 0"
        controls="controls"
        :src="path"
    >
    </video>
    </div>
    <div class="messages">
      <div class="messageText">
        {{contents.releaseTime}}
      </div>
      <div class="messageText">
        {{contents.playTimes}}次观看
      </div>
      <div class="messageText">
        <img
            src="../img/like.png"
            class="like"
            @click="likebtn"
            v-if="!isLiked"
        />
        <img
            src="../img/liked.png"
            class="like"
            @click="likebtn"
            v-if="isLiked"
        />
        {{contents.likeNum}}点赞
      </div>
    </div>

    <p class="introduction">{{contents.videoIntroduction}}</p>
    <div style="margin: 1vh 2.5vw">
      <p style="font-size: small;font-weight: bold;display: inline-block">类别：</p>
      <p
          class="sectype"
          v-for="item in contents.secondType"
          :key="item">
        {{item}}</p>
    </div>
  </el-scrollbar>
  <div class="right">
    <div class="userInfo">
      <img src="../img/avatar.png"/>
      芒果气泡水
    </div>
    <Commit
        :Comments="contents.comment"
        :content-id="$route.params.id"
    />
  </div>
</div>
</template>

<script>

import {ElScrollbar,ElButton,ElMessage} from 'element-plus'
import {ArrowLeftBold} from "@element-plus/icons-vue";
import TopBar from "@/components/TopBar";
import Commit from "@/components/Commit";
import {ref} from "vue";
export default {
  name: "video",
  setup(){
    return{
      ElMessage,
      ArrowLeftBold,
      videoid:ref(0),
      contents:ref({}),
      path:ref(''),
      user:ref({
        id:0
      }),
      isLogin:ref(false),
      isLiked:ref(false),
      videoHeight:ref(100)
    }
  },
  components:{
    Commit,
    TopBar,
    ElButton,
    ElScrollbar
  },
  methods:{
    likebtn:function (){
      if(!this.isLogin){
        this.ElMessage("请先登录")
      }
      else {
        this.isLiked = !this.isLiked;
        this.sendlike(this.isLiked);
      }
    },
    returnBack:function (){
      this.$router.push({name:'home'});
    },
    sendlike:function (e){
      var resmessage='';
      if(e){
        resmessage='点赞成功';
      }
      else{
        resmessage='取消点赞成功'
      }
      var url='http://www.cugxp.top:8282/user/likeOne';
      var userId=this.user.id;
      var contentId=this.videoid;
      this.axios.get(url,
          {
            headers:{
              token:this.user.token
            },
            params:{
              userId:userId,//用户id
              contentId:contentId,//视频或者文章id
              type:'video'//内容类别
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.ElMessage(resmessage);
          this.$forceUpdate();
        }
        else{
          var message=response.data.message;
          this.ElMessage(message)
        }
      })
    },
    getVideo:function (e){
      var isLogin=this.isLogin;
      var userid=this.user.id;
      console.log(e,isLogin,userid)
      var url='http://www.cugxp.top:8282/videodetail/search';
      this.axios.get(url,
          {
            params:{
              id:e,
              isLogin:isLogin,
              userId:userid,
              isRefresh:false
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.contents=response.data.response.content;
          this.path=response.data.response.content.videoPath;
          this.isLiked=response.data.response.content.liked;
          console.log(this.isLiked)
          console.log(this.contents)
        }
        else{
          var message=response.data.message;
          alert(message);
        }
      })
    },
    getVideoInfo:function (e){
      var isLogin=this.isLogin;
      var userid=this.user.id;
      console.log(e,isLogin,userid)
      var url='http://www.cugxp.top:8282/videodetail/search';
      this.axios.get(url,
          {
            params:{
              id:e,
              isLogin:isLogin,
              userId:userid,
              isRefresh:true
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.contents=response.data.response.content;
          this.isLiked=response.data.response.content.liked;
        }
        else{
          var message=response.data.message;
          alert(message);
        }
      })
    }
  },
  mounted() {
    this.user=this.$store.state.UserData;
    this.isLogin=this.$store.state.isLogin;
    this.videoid=this.$route.params.id;
    this.getVideo(this.videoid);
    this.videoHeight=(document.body.clientHeight)*0.4;
  },
  updated() {
    this.getVideoInfo(this.videoid);
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.box{
  width: 100vw;
  height: 100vh;
}

.left{
  width: 45vw;
  height: 92vh;
  display: inline-block;
  vertical-align: top;
  margin-left: 15vw;
}
.right{
  width: 25vw;
  height: 92vh;
  display: inline-block;
  border: 0;
  vertical-align: top;
}
.videobox{
  width: 40vw;
  height: 50vh;
  margin-left: 2.5vw;
  object-fit: scale-down;
}
/*宽：40vw 高：37vh*/
.btn_return{
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 0;
  background:linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 1vw 0.5vh 1vw #d9d9d9, -1vw -0.5vh 1vw #ffffff;
  border: 0;
  color: #17adaa;
}
.left_top{
  width: 40vw;
  height: 10vh;
  position: relative;
  line-height: 10vh;
  margin-left: 2.5vw;
}
.left_top p{
  position: absolute;
  left: 5vw;
  width: 35vw;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.messages{
  width: 24vw;
  height: 5vh;
  margin-left: 18.5vw;
}
.messageText{
  width: 8vw;
  height: 100%;
  line-height: 5vh;
  font-size: 12px;
  display: inline-block;
  text-align: right;
}
.like{
  display: inline-block;
  vertical-align: top;
  width:3vh;
  height: 3vh;
  margin-top: 0.5vh;
  margin-left: 5px;
  float: right;
}
.userInfo{
  width: 25vw;
  height: 10vh;
  line-height: 10vh;
  display: block;
}
.userInfo img{
  width: 6vh;
  height: 6vh;
  border-radius: 3vh;
  margin-top: 2vh;
  margin-right: 1vw;
  vertical-align: top;
}

.introduction{
  width: 40vw;
  height: fit-content;
  margin-left: 2.5vw;
  margin-right: 2.5vw;
  margin-top: 2vh;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp: 5;
  display: -webkit-box;-webkit-box-orient: vertical;
  font-size: 13px;
}

.sectype{
  display: inline-block;
  border: #235dda 1px solid;
  padding: 1px 3px;font-size: small;
  color: #3b30ff;margin: 0 5px
}
</style>
