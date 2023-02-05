<template>
<div class="cboxAll">
  <div class="cboxF">
    <div class="userZoneOfcboxF">
      <img :src="props.FirstComment.user.image_path"/>
      {{props.FirstComment.user.user_name}}
    </div>
    <div class="contentOfcboxF">
      <p>{{props.FirstComment.content}}</p>
    </div>
    <div class="InfoOfcboxF">
      <div v-if="hasChild" class="more">
        <img src="../img/more.png" v-on:click="moreReply" v-if="hideCommits"/>
        <img src="../img/mored.png" v-on:click="moreReply" v-if="!hideCommits"/>
        <button class="moreOfcboxF" v-on:click="moreReply" v-if="hideCommits">查看回复</button>
        <button class="moreOfcboxF" v-on:click="moreReply" v-if="!hideCommits">收起回复</button>
      </div>
      <p class="timeOfcboxF">{{props.FirstComment.releaseTime}}</p>
      <button class="replyOfcboxF" @click="reply" v-if="!replying">回复</button>
      <button class="replyOfcboxF" @click="reply" v-if="replying">取消回复</button>
    </div>
  </div>
  <div style="width: 24vw;height: fit-content" v-if="!hideCommits">
    <CommitItemSecond
        v-for="item in props.FirstComment.childComment"
        :key="item.id"
        :SecondComment="item"
        @pushId="commitSecond"
        @cancel="cancelcommit"
        :is-login="props.isLogin"
        :userid="props.userid"
        :Freplying="replying"
    />
  </div>
  <div class="ReplyCommit" v-if="replying">
    <el-input autosize type="textarea" v-model="input" style="display: inline-block;width: 17vw;margin-right: 1vw;resize:none"/>
    <el-button style="display: inline-block;width: 3vw" @click="realeaseReply">发布</el-button>
  </div>
  <el-divider />
</div>
</template>

<script>
import CommitItemSecond from "@/components/CommitItemSecond";
import {ElDivider,ElInput,ElButton,ElMessage} from 'element-plus';
import {ref} from "vue";
export default {
  name: "CommitItemFirst",
  props:["FirstComment","userid","isLogin","contentId"],
  components: {
    CommitItemSecond,
    ElDivider,
    ElInput,
    ElButton
  },
  setup(props,context){
    return{
      ElMessage,
      props,
      context,
      hideCommits:ref(true),
      input:ref(''),
      replying:ref(false),
      hasChild:ref(false),
      s:[],
      taegetId:ref(''),
      targetUserId:ref(''),
      user:ref({
        id:0
      })
    }
  },
  methods:{
    moreReply:function (){
      this.hideCommits=!this.hideCommits;
    },
    reply:function (){
      this.replying=!this.replying;
      this.taegetId=this.props.FirstComment.id;
      this.targetUserId=this.props.FirstComment.user.id;
    },
    cancelcommit:function (){
      this.replying=false;
    },
    addZero:function (t){
      return t<10?'0'+t:t;
    },
    realeaseReply:function (){
      this.sendrequest();
      this.replying=false;
    },
    commitSecond:function (e,uid){
      this.taegetId=e;
      this.replying=true;
      this.targetUserId=uid;
    },
    getCTime:function (){
      var myDate = new Date();
      var date="";
      var yy=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
      var mm=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
      var dd=myDate.getDate();        //获取当前日(1-31)
      date=date+yy+"-"+this.addZero(mm)+"-"+this.addZero(dd)+" ";
      var hour=myDate.getHours();       //获取当前小时数(0-23)
      var minute=myDate.getMinutes();     //获取当前分钟数(0-59)
      var sec=myDate.getSeconds();     //获取当前秒数(0-59)
      date=date+this.addZero(hour)+":"+this.addZero(minute)+":"+this.addZero(sec);
      console.log(date);
      return date;
    },
    sendrequest:function (){
      var url='http://www.cugxp.top:8282/user/comment';
      var video_id=this.props.contentId;
      var comment=this.input;
      var Ctime=this.getCTime();
      var comment_response_id=this.taegetId;
      var comment_parent_id=this.props.FirstComment.id;
      var user_response_id=this.targetUserId;
      var comment_user_id=this.props.userid;
      this.axios.post(url,
          {
            video_id:video_id,
            comment_user_id:comment_user_id,
            type_belong:0,
            comment:comment,
            time:Ctime,
            comment_parent_id:comment_parent_id,
            user_response_id:user_response_id,
            level:2,
            comment_response_id:comment_response_id
          },
          {
            headers:{
              token:this.user.token
            }
          }
          ).
      then((response) => {
        var result=response.data.result;
        console.log(response.data)
        if(result==="true"){//返回成功
          this.ElMessage('回复成功');
          this.input='';
          this.$forceUpdate();
        }
        else{
          this.ElMessage('回复失败');
        }
      })
          .catch(error=> {
            console.log(error)
            this.ElMessage('请求失败');
          });
    }
  },
  mounted() {
    this.user=this.$store.state.UserData;
    if(this.props.FirstComment.childComment.length!=0){
      this.hasChild=true;
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.cboxAll{
  width: 24vw;
  height: fit-content;
  margin-bottom: 1vh;
}
.cboxF{
  width: 24vw;
  height: fit-content;
}
.userZoneOfcboxF{
  width: 24vw;
  height: 4vh;
  line-height: 4vh;
  font-size: 13px;
}
.userZoneOfcboxF img{
  width: 4vh;
  height: 4vh;
  border-radius: 2vh;
  margin-right: 2px;
  vertical-align: top;
}
.contentOfcboxF{
  width: 22vw;
  margin-left: 2vw;
  height: fit-content;
  font-size: 13px;
}
.InfoOfcboxF{
  width: 22vw;
  margin-left: 2vw;
  height: 3vh;
  line-height: 3vh;
}
.InfoOfcboxF img{
  width: 1.6vh;
  height: 1.6vh;
  margin-top: 0.7vh;
  vertical-align: top;
  display: inline-block;
  margin-right: 5px;
}
.moreOfcboxF{
  color: blue;
  font-size: 12px;
  display: inline-block;
  margin-right: 1vw;
  height: 3vh;
  line-height: 3vh;
  vertical-align: top;
  border: 0;
  outline: 0;
  background-color: white;
}
.moreOfcboxF:hover{
  cursor: pointer;
}
.InfoOfcboxF img:hover{
  cursor: pointer;
}
.timeOfcboxF{
  color: darkgray;
  font-size: 12px;
  display: inline-block;
  margin-right: 1vw;
  vertical-align: top;
}
.replyOfcboxF{
  color: gray;
  font-size: 12px;
  display: inline-block;
  border: 0;
  outline: 0;
  background-color: white;
  height: 3vh;
  vertical-align: top;
}

.replyOfcboxF:hover{
  cursor: pointer;
}
.ReplyCommit{
  width: 22vw;
  height: fit-content;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 2vw;
}

.more{
  width: fit-content;
  height: 3vh;
  line-height: 3vh;
  display: inline-block;
}
.more img{
  width: 1.6vh;
  height: 1.6vh;
  margin-top: 0.7vh;
  vertical-align: top;
  display: inline-block;
  margin-right: 5px;
}



</style>
