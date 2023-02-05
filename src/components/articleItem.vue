<template>
<div class="article-item">
  <div class="titleZ">
    <div>标题：{{props.article.title}}</div>
  </div>
  <div class="timeZ">
    <div class="timeZp">{{props.article.releaseTime}}</div>
    <div class="timeZp">{{props.article.viewTimes}}次观看</div>
    <div class="timeZp">{{props.article.likeNums}}点赞</div>
    <div class="timeZp">{{props.article.commentNums}}评论</div>
  </div>
  <div class="contentZ">
    <p>{{props.article.introduction}}</p>
  </div>
  <div class="controlZ">
    <button class="btn" @click="deleteitem">删除</button>
    <button class="btn" @click="changeitem">修改</button>
  </div>
</div>

</template>

<script>
import {ElMessage,ElMessageBox} from "element-plus";
export default {
  name: "articleItem",
  props:["article","index","isRecord"],
  emits:["change","delete"],
  setup(props,context){
    const saytofather = (e,f) => {
      console.log("saying");
      context.emit(e, f);
      console.log("said");
    };
    return{
      props,
      context,
      saytofather,
      ElMessage,
      ElMessageBox
    }
  },
  methods:{
    changeitem:function (){
      this.saytofather("change",this.props.article.id);
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
      var url='www.cugxp.top:8282/user/delete';
      var id=this.props.article.id;
      this.axios.get(url,
          {
            params:{
              id:id, // 视频或者文章id
              type:'article' //视频或者文章
            }
          }).
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
*{
  padding: 0;
  margin: 0;
}
.article-item{
  width: 26vw;
  height: 15vh;
  background-color: #f5f6f5;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 1.5vh 1vw;
  margin-bottom: 1vh;
}
.titleZ{
  width: 26vw;
  flex: 1;
  font-size: 15px;
  font-weight: bold;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;-webkit-box-orient: vertical;
}
.timeZ{
  width: 26vw;
  flex: 1;
}
.timeZp{
  display: inline-block;
  font-size: smaller;
  margin-right: 1vw;
}
.contentZ{
  width: 26vw;
  flex: 2;
}

.contentZ p{
  font-size: small;
  overflow:hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space:normal;
  word-break: break-all;
}

.btn{
  float: right;
  border: 0;
  vertical-align: top;
  padding: 0;
  font-size: small;
  margin-right: 5px;
}
.controlZ{
  flex: 0.5;
}
</style>
