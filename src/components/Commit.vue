<template>
  <div style="width: 24vw;height: 82vh;display: flex;flex-flow: column nowrap;">
    <div class="TitleZone">
      评论
    </div>
    <div class="RealeaseCommit">
      <el-input autosize type="textarea" v-model="input" style="display: inline-block;width: 19vw;margin-right: 1vw;resize:none"/>
      <el-button type="primary" style="display: inline-block;width: 4vw" @click="realeaseCommit">发布</el-button>
    </div>

    <div v-show="!hasComment" style="text-align: center;margin-top: 10vh">
      还没有评论哦~
    </div>
    <el-scrollbar class="cbox">
      <div  class="contentOfcbox">
        <CommitItemFirst
            v-for="item in props.Comments"
            :key="item.id"
            :FirstComment="item"
            :userid="user.id"
            :is-login="isLogin"
            :content-id="props.contentId"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {ElScrollbar ,ElInput,ElButton,ElMessage} from 'element-plus'
import CommitItemFirst from "@/components/CommitItemFirst";
import {ref} from "vue";
export default {
  name: "Commit",
  props:["Comments","contentId"],
  components: {
    CommitItemFirst,
    ElScrollbar,
    ElInput,
    ElButton
  },
  setup(props,context){
    return{
      ElMessage,
      input:ref(''),
      props,
      context,
      comments:ref([]),
      hasComment:ref(true),
      isLogin:ref(false),
      user:ref({}),
      replyingId:ref('')
    }
  },
  methods:{
    realeaseCommit:function (){
      if(this.isLogin===false){
        this.ElMessage('请先登录！')
      }
      else if(this.input.length==0){
        this.ElMessage('评论不能为空！')
      }
      else{
        this.sendrequest();
      }
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
    addZero:function (t){
      return t<10?'0'+t:t;
    },
    sendrequest:function (){
      var url='http://www.cugxp.top:8282/user/comment';
      var video_id=this.props.contentId;
      var comment=this.input;
      var Ctime=this.getCTime();
      console.log(Ctime);
      this.axios.post(url,
          {
            video_id:video_id,
            comment_user_id:this.user.id,
            type_belong:0,
            comment:comment,
            time:Ctime,
            comment_parent_id:0,
            user_response_id:0,
            level:0,
            comment_response_id:0
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
    this.isLogin=this.$store.state.isLogin;
    console.log(this.props.contentId)
  },
  updated() {
    this.hasComment=this.props.Comments.length!=0;
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.cbox{
  width: 25vw;
  margin-left: 0.5vw;
  display: block;
  padding: 0;
  flex-grow: 1;
}
.contentOfcbox{
  width: fit-content;
  height: fit-content;
  margin-left: 0;
}

.TitleZone{
  width: 24vw;
  height: 4vh;
  font-weight: bold;
  font-size: 18px;
  background-color: white;
  display: block;
}
.RealeaseCommit{
  width: 24vw;
  height: fit-content;
  padding-top: 1vh;
  padding-bottom: 1vh;
}
</style>
