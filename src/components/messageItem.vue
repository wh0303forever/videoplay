<template>
<div class="messageItem">
  <div class="title">
    {{props.message.title}}
  </div>
  <div class="textZ">
    <P>{{props.message.content}}</P>
  </div>
  <div class="contentZ" @click="toContent">
    {{props.message.type}}:{{props.message.contentTitle}}
  </div>
  <div class="timeZ">
    <p>{{props.message.createTime}}</p>
    <p @click="deleteitem">删除</p>
  </div>
</div>
</template>

<script>
import {ElMessageBox,ElMessage} from "element-plus";

export default {
  name: "messageItem",
  props:["message","index"],
  emits:["deleteOne"],
  setup(props,context){
    const saytofather = (e,f) => {
      console.log("saying");
      context.emit(e, f);
      console.log("said");
    };
    return{
      ElMessage,
      saytofather,
      props,
      context,
      ElMessageBox
    }
  },
  mounted() {
    this.user=this.$store.state.UserData;
  },
  components:{
  },
  methods:{
    toContent:function (){

    },
    deleteitem:function (){
      this.ElMessageBox.confirm(
          '确认删除？',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        this.sendrequest();
      });
    },
    sendrequest:function (){
      var url='http://www.cugxp.top:8282/message/delete';
      var id=this.props.message.id;
      this.axios.get(url,
          {
            headers:{
              token:this.user.token
            },
            params:{
              id:id
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.ElMessage('删除成功');
          this.saytofather("deleteOne",this.props.index);
        }
        else{
          this.ElMessage('删除失败');
        }
      })
          .catch(error=> {
            console.log(error)
            this.ElMessage('请求失败');
          });
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.messageItem{
  width: 26vw;
  height: 13vh;
  padding: 1.5vh 2vw;
  background-color: #f5f6f5;
  margin-bottom: 1vh;
}
.title{
  width: 100%;
  height: 3vh;
  font-weight: bold;
}
.textZ{
  width: 100%;
  height: 5vh;
}
.textZ p{
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;-webkit-box-orient: vertical;
  font-size: small;
}
.contentZ{
  width: fit-content;
  height: 3vh;
  background-color: #c9c9c9;
  font-size: small;
  padding-left: 1vw;
  padding-right: 1vw;
  line-height: 3vh;
}
.timeZ{
  width: 100%;
  height: 2vh;
}

.timeZ p{
  width: fit-content;
  cursor: pointer;
  font-size: small;
  color: gray;
  display: inline-block;
  margin-right: 1vw;

}
</style>
