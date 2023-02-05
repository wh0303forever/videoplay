<template>
<div id="video-item">
  <div class="coverZ">
    <img :src="props.video.cover" @click="tovideo"/>
  </div>
  <div class="rightZ">
    <div class="infoZ">
      <div class="title">
        {{props.video.title}}
      </div>
      <div class="info">
        <p>{{props.video.likeNums}}点赞</p>
        <p>{{props.video.commentNums}}评论</p>
      </div>
      <div class="control">
        <p>{{props.video.releaseTime}}</p>
        <p @click="changeitem">修改</p>
        <p @click="deleteitem">删除</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {ElMessage,ElMessageBox} from "element-plus";
import {ref} from "vue";
export default {
  name: "videoItem",
  props:["video","index"],
  emits:["change","delete"],
  setup(props,context){
    const saytofather = (e,f) => {
      console.log("saying");
      context.emit(e, f);
      console.log("said");
    };
    return{
      ElMessageBox,
      ElMessage,
      props,
      context,
      saytofather,
      user:ref({
        id:0
      })
    }
  },
  mounted() {
    this.user=this.$store.state.UserData;
  },
  methods:{
    tovideo:function (){
      var id=this.props.video.id;
      this.$router.push({name:'video',params: {id:id}})
    },
    changeitem:function (){
      this.saytofather("change",this.props.video.id);
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
      var url='http://www.cugxp.top:8282/user/delete';
      var id=this.props.video.id;
      this.axios.get(url,
          {
            headers:{
              token:this.user.token
            },
              params:{
                id:id, // 视频或者文章id
                type:'video' //视频或者文章
              }
            }
          ).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.ElMessage('删除成功');
          this.saytofather("delete",this.props.index);
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
#video-item{
  width: 100%;
  height: 15vh;
  background-color: #f5f6f5;
  margin-bottom: 1vh;
}

.coverZ{
  width: 10vw;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}

.coverZ img{
  width: 8vw;
  height: 12vh;
  margin: 1.5vh 1vw;
}

.rightZ{
  width: 18vw;
  height: 15vh;
  display: inline-block;
  vertical-align: top;
}

.infoZ {
  width: 16vw;
  height: 12vh;
  margin: 1.5vh 1vw;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.title{
  flex: 3;
  font-weight: bold;
}
.info{
  flex: 2;
  font-size: small;
}
.info p{
  display: inline-block;
  vertical-align: bottom;
  margin-right: 1vw;
}
.control{
  flex: 2;
  font-size: small;
  position: relative;
}
.control p{
  display: inline-block;
  vertical-align: bottom;
  margin-right: 1vw;
}

.control p:hover{
  cursor:pointer
}

</style>
