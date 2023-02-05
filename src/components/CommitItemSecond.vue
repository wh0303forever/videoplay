<template>
  <div class="cboxS">
    <div class="userZoneOfcboxS">
      <img :src="props.SecondComment.user.image_path"/>
      {{props.SecondComment.user.user_name}}
    </div>
    <div class="contentOfcboxS">
      <p style="color: blue;display: inline">@{{props.SecondComment.userResopnseNiceName}}：</p>
      <p style="color: black;display: inline">{{props.SecondComment.content}}</p>
    </div>
    <div class="InfoOfcboxS">
      <p class="timeOfcboxS">{{props.SecondComment.releaseTime}}</p>
      <p class="replyOfcboxS" @click="reply" v-if="!replying">回复</p>
      <p class="replyOfcboxS" @click="cancelreply" v-if="replying">取消回复</p>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {ref} from "vue";
export default {
  name: "CommitItemSecond",
  props:["SecondComment","userid","isLogin","Freplying"],
  emits:["pushId","cancel"],
  setup(props,context) {
    const saytofather = (f,e,uid) => {
      console.log("saying");
      context.emit(f, e,uid);
      console.log("said");
    };
    return {
      saytofather,
      props,
      context,
      ElMessage,
      replying:ref(false)
    }
  },
  methods:{
    reply:function (){
      if(this.props.isLogin===false){
        this.ElMessage('请先登录');
      }
      else if(this, this.props.Freplying){
        return;
      }
      else{
        var id=this.props.SecondComment.id;
        var userid=this.props.SecondComment.user.id;
        this.saytofather("pushId",id,userid);
        this.replying=true;
      }
      console.log(this.props.SecondComment.id)
    },
    cancelreply:function (){
      this.saytofather("cancel","");
      this.replying=false;
    }
  },
  mounted() {
    console.log("second",this.props.SecondComment.user.id)
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.cboxS{
  width: 22vw;
  height: fit-content;
  margin-left: 2vw;
  border: 0;
}

.userZoneOfcboxS{
  width: 22vw;
  height: 4vh;
  line-height: 4vh;
  font-size: 13px;
}

.userZoneOfcboxS img {
  width: 4vh;
  height: 4vh;
  border-radius: 2vh;
  margin-right: 2px;
  vertical-align: top;
}

.contentOfcboxS{
  width: 19vw;
  margin-left: 2vw;
  height: fit-content;
  font-size: 13px;
}

.InfoOfcboxS {
  width: 19vw;
  margin-left: 2vw;
  height: 3vh;
  line-height: 3vh;
}

.InfoOfcboxS img {
  width: 1.6vh;
  height: 1.6vh;
  margin-top: 0.7vh;
  vertical-align: top;
  display: inline-block;
  margin-right: 5px;
}

.moreOfcboxS {
  color: blue;
  font-size: 12px;
  display: inline-block;
  margin-right: 1vw;
}

.timeOfcboxS {
  color: darkgray;
  font-size: 12px;
  display: inline-block;
  margin-right: 1vw;
}

.replyOfcboxS {
  color: gray;
  font-size: 12px;
  display: inline-block;
}

.replyOfcboxS:hover{
  cursor: pointer;
}
</style>