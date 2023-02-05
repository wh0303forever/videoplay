<template>
  <el-scrollbar class="listbox">
    <message-item  v-for="(item,index) in list" :key="index" :message="item" :index="index" @deleteOne="deleteOne"/>
  </el-scrollbar>
</template>

<script>
import {ElScrollbar,ElMessage} from "element-plus";
import MessageItem from "@/components/messageItem";
import {ref} from "vue";
export default {
  name: "messageList",
  props:["messagelist"],
  emits:[],
  setup(props,context){
    return{
      props,
      context,
      ElMessage,
      list:ref([]),
      isLogin:ref(false),
      user:ref({
        id:0
      })
    }
  },
  components:{
    MessageItem,
    ElScrollbar
  },
  mounted() {
    this.user=this.$store.state.UserData;
    this.isLogin=this.$store.state.isLogin;
    if(this.isLogin)
      this.getAllMessage();
  },
  methods:{
    getAllMessage:function () {
      var url = 'http://www.cugxp.top:8282/message/findRecvMessage';
      console.log(this.user.id)
      this.axios.get(url,
          {
            headers:{
              token:this.user.token
            },
            params:{
              recId:this.user.id
            }
          }
      ).then((response) => {
        var result = response.data.result;
        if (result === "true") {//返回成功
          this.list = response.data.response.content;
          console.log(this.list)
        } else {
          var message = response.data.message;
          this.ElMessage(message);
        }
      })
    },
    deleteOne:function (index){
      this.list.splice(index,1);
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.listbox{
  width: 100%;
  position: absolute;
  left: 0;
  top: 10%;
  height: 90%;
}
.btn{
  padding: 5px 10px;
  border: 0;
  color: white;
  background-color: #3b30ff;
  position: absolute;
  bottom: 25px;
  right: 25px;
  z-index: 10;
}
</style>
