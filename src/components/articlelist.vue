<template>
  <el-scrollbar class="videolist">
    <articleItem v-for="(item,index) in articlelist" :key="item" :article="item" :index="index" @delete="deleteitem"/>
  </el-scrollbar>
</template>

<script>
import {ElScrollbar,ElMessage} from "element-plus";
import articleItem from "@/components/articleItem";
import {ref} from "vue";
export default {
  name: "articlelist",
  emits:[""],
  props:["user"],
  setup(props,context){
    return{
      props,
      context,
      ElMessage,
      articlelist:ref([])
    }
  },
  components:{
    articleItem,
    ElScrollbar
  },
  mounted() {
    this.getArticle();
  },
  methods:{
    getArticle:function (){
      var url='http://www.cugxp.top:8282/user/searchContent';
      this.axios.get(url,
          {
            headers:{
              token:this.props.user.token
            },
            params:{
              userId:this.props.user.id
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.articlelist=response.data.response.content.article;
          console.log(this.articlelist)
        }
        else{
          var message=response.data.message;
          this.ElMessage(message);
        }
      })
    },
    deleteitem:function (e){
      var index=e;
      this.articlelist.splice(index,1);
      console.log(index);
    }
  },
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.videolist{
  width: 28vw;
  margin-left: 1vw;
  height: 70vh;
  margin-right: 1vw;
}
</style>
