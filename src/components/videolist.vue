<template>
<el-scrollbar class="videolist">
  <videoItem v-for="(item,index) in videolist" :key="item" :video="item" :index="index" @delete="deleteitem"/>
</el-scrollbar>
</template>

<script>
import {ElScrollbar,ElMessage} from "element-plus";
import videoItem from "@/components/videoItem";
import {ref} from "vue";
export default {
  name: "videolist",
  emits:[""],
  props:["user"],
  setup(props,context){
    return{
      props,
      context,
      ElMessage,
      videolist:ref([])
    }
  },
  components:{
    videoItem,
    ElScrollbar
  },
  mounted() {
    this.getVideo();
  },
  methods:{
    getVideo:function (){
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
          this.videolist=response.data.response.content.video;
        }
        else{
          var message=response.data.message;
          this.ElMessage(message);
        }
      })
    },
    deleteitem:function (e){
      var index=e;
      this.videolist.splice(index,1);
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
