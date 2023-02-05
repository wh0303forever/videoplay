<template>
<div id="bar">
  <img src="../img/hualahuala.png" id="hualahuala" v-on:click="ToHome" />
  <search-input id="searchBar" @saytofather="search"/>

  <div id="RightZone">

    <el-row :gutter="0">
      <el-col :span="12">
        <el-popover
          placement="bottom"
          title=""
          width="100"
          trigger="click"
          content="hello"

      >
          <template #reference>
          <el-button :icon="Plus" circle class="CButton" v-on:click="realeasePush" type="success"/>
          </template>
          <template #default>
            <div class="realeaseBox">
              <RealeaseTypeCard />
            </div>
          </template>
      </el-popover>
      </el-col>
      <el-col :span="3"><el-button :icon="Bell" circle class="CButton" v-on:click="messagePush" type="success"/></el-col>


          <el-col :span="9">
            <div class="avatarBox" @click="toPersonal">
              <img :src="user.imagePath" id="avatar"/>
            </div>
          </el-col>
    </el-row>
  </div>

  <!--通知框-->
  <el-drawer
      v-model="messageDrawer"
      title="消息"
      direction="rtl"
  >
    <message-list />
  </el-drawer>

  <el-drawer
      v-model="personalDrawer"
      title="个人中心"
      direction="rtl"
      size="30%"
      class="drawer"
  >
    <personal-c @saytofather="hearfromson1"/>
  </el-drawer>

<reset-pwd v-if="changepwd"/>
</div>
</template>

<script>
//import 'element-plus/dist/index.css'
import {ElButton ,ElRow ,ElCol ,ElDrawer ,ElPopover,ElMessage} from 'element-plus'
import { ref } from 'vue'
import {Search , Plus ,   Bell} from "@element-plus/icons-vue";
import RealeaseTypeCard from "@/components/RealeaseTypeCard";
import router from "@/router";
import SearchInput from "@/components/SearchInput";
import PersonalC from "@/components/PersonalC";
import messageList from "@/components/messageList";


export default({
  name:"TopBar",
  setup() {
    return {
      ElMessage,
      changepwd:ref(false),
      messageDrawer:ref(false),
      personalDrawer:ref(false),
      realease:ref(false),
      input: ref(''),
      Search,
      Plus,
      Bell,
      isLogin:false,
      user:ref({
        id: 0,
        imagePath: '',
        token: '',
        username: ''
      })
    }
  },
  components:{
    messageList,
    ElButton,
    ElRow,
    ElCol,
    ElDrawer,
    ElPopover,
    RealeaseTypeCard,
    SearchInput,
    PersonalC
  },
  methods:{
    searchByInput:function (){//开始搜索
      var keyWords=this.input;
      console.log(keyWords);
      router.push("/search");
    },
    ToHome:function (){//回首页
      router.push("/");
    },
    realeasePush:function (){
      this.realease=true;
    },
    messagePush:function (){
      if(this.isLogin)
      this.messageDrawer=true;
      else
        this.ElMessage('请先登录！');
    },
    toPersonal:function (){
      if(this.isLogin) {
        this.personalDrawer=true;
        this.messageDrawer=false;
      }
      else{
        this.$router.push({name:'login',params:{}});
      }
    },
    search:function (e){
      this.$router.push({name:'search',params: {keywords:e}})
    },
    hearfromson1:function (){
      this.changepwd=true;
    }
  },
  mounted() {
    this.user=this.$store.state.UserData;
    this.isLogin=this.$store.state.isLogin;
  }
})
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}

#bar{
  width: 94vw;
  height: 7vh;
  background-color: white;
  padding-left:3vw ;
  padding-right:3vw ;
  background-color: #17adaa;
  border: 0;
}

#searchBar{
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 移动元素本身50% */
  display: inline-block;
  margin-top: 1.5vh;
}
#hualahuala{
  height: 7vh;
  display: inline-block;
  margin-top: 0vh;
}

#RightZone{
  width: 30vw;
  display: inline-block;

  height: 5vh;
  vertical-align: top;
  margin-top: 1vh;
  float: right;
}

.CButton{
  float: right;
  background: linear-gradient(145deg, #159c99, #19b9b6);
  box-shadow:  10px 10px 20px #149a97,
  -10px -10px 20px #1ac0bd;
  border: 1px #1ac0bd;
}

.CButton:hover{
  background: linear-gradient(145deg, #159c99, #19b9b6);
  box-shadow:  20px 20px 60px #0b5352,
  -20px -20px 60px #23ffff;
}

#avatar{
  width: 4vh;
  height: 4vh;
  border-radius: 3vh;
}

.realeaseBox{
  width: 22vh;
  height: 10vh;
  padding: 0;
  z-index: 10;
}

.avatarBox{
  float: right;
  background: linear-gradient(145deg, #159c99, #19b9b6);
  box-shadow:  10px 10px 20px #149a97,
  -10px -10px 20px #1ac0bd;
  border: 1px #1ac0bd;
  width: 4vh;
  height: 4vh;
  border-radius: 4vh;
  padding: 0.5vh;
}

#input{
  background: #17adaa;
  box-shadow: inset 11px 11px 21px #118280,
              inset -11px -11px 21px #1dd8d5;
}

.drawer{
  position: relative;
  background-color:gray;
}

</style>
