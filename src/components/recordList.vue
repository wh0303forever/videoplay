<template>
  <el-scrollbar class="recordList">
      <record-item  v-for="(item,index) in content" :key="index" :item="item" :index="index"/>
  </el-scrollbar>
</template>

<script>
import RecordItem from "@/components/recordItem";
import {ElMessage,ElScrollbar} from "element-plus";
import {ref} from "vue";
export default {
  name: "recordList",
  props:["user"],
  emits:[],
  setup(props,context){
    return{
      list:ref([]),
      props,
      context,
      ElMessage,
      content:ref([])
    }
  },
  components:{
    RecordItem,
    ElScrollbar
  },
  methods:{
    getRecord:function (){
      var id=this.props.user.id;
      var url='http://www.cugxp.top:8282/user/history';
      this.axios.get(url,
          {
            headers:{
              token:this.props.user.token
            },
            params:{
              id:id
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          var res=response.data.response.content;
          this.content=res;
          console.log(res)
        }
        else{
          var message=response.data.message;
          this.ElMessage(message);
        }
      })
    }
  },
  mounted() {
    this.getRecord();
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.recordList{
  width: 28vw;
  margin-left: 1vw;
  height: 70vh;
  margin-right: 1vw;
}
</style>
