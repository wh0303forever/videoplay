<template>
<div id="loginC">
  <div class="headerOfloginC">
    <img src="../img/hualahuala.png"/>
    <p>登录</p>
  </div>

  <div class="contentOfloginC">
    <div style="margin-top: 5vh">
      <el-input
        :prefix-icon="User" placeholder="账号/邮箱"
        v-model="UserAccount"
        :disabled="sended"
    />
    </div>
    <div style="margin-top: 5vh">
      <el-input
          :prefix-icon="Key"
          placeholder="密码"
          v-model="UserPassword"
          :disabled="sended"
          type="password"
      />
    </div>
    <div class="tip" style="margin-top: 2vh" @click="toRegister">注册</div>
    <div class="tip" @click="toLostPwd">忘记密码</div>
  </div>

  <div class="footerOfloginC">
    <button class="btn" @click="confirmlogin" id="btn1">登录</button>
  </div>
</div>
</template>

<script>
import {ElInput,ElMessage} from "element-plus";
import {User,Key} from "@element-plus/icons-vue"

import {ref} from "vue";
export default {
  name: "loginC",
  components: {
    ElInput
  },
  emits:['saytofather'],
  setup(props,context){
    const saytofather = (e) => {
      console.log("saying");
      context.emit("saytofather", e);
      console.log("said");
    };
    return{
      ElMessage,
      props,
      context,
      User,
      Key,
      UserAccount:ref(''),
      UserPassword:ref(''),
      saytofather,
      sended:ref(false)
    }
  },
  methods:{
    toRegister:function (){
      console.log("tiaozhuan")
      this.$router.push({name:'register'})
    },
    toLostPwd:function (){
      this.$router.push({name:'findpwd'})
    },
    sendrequest:function (){
      document.getElementById('btn1').disabled = true;
      this.sended=true;
      var url='http://www.cugxp.top:8282/user/login';
      this.axios.post(url,
          {
            email: this.UserAccount,
            password: this.UserPassword
          }).
      then((response) => {
        var result=response.data.result;
        console.log(response.data)
        if(result==="true"){//返回成功
          this.ElMessage('登录成功');
          this.$store.commit("changeUserData",response.data.response.content);
          this.$store.commit("changeLoginCon",true);
          this.$router.push({name:'home'});
          console.log(response.data.response.content.token)
        }
        else{
          this.ElMessage('用户名或密码错误');
          document.getElementById('btn1').disabled = false;
          this.sended=false;
        }
      })
          .catch(error=> {
            console.log(error)
            this.ElMessage('请求失败');
            document.getElementById('btn1').disabled = false;
            this.sended=false;
          });
    },
    confirmlogin:function (){
      var UserAccount=this.UserAccount;
      var UserPassword=this.UserPassword;
      console.log(UserAccount,UserPassword)
      if(UserAccount.length==0){
        this.ElMessage('请输入用户名');
      }
      else if(UserPassword.length==0){
        this.ElMessage('请输入密码');
      }
      else{
        this.sendrequest();
      }

    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#loginC{
  width: 25vw;
  height: 60vh;
  background-color: white;
  background: rgba(255,255,255,0.5);
  border-radius: 1vw;

  position: absolute;
  top:50%;
  left:50%;
  -webkit-transform:translate(-50%,-50%);
  backdrop-filter: blur(4px);
  z-index: 10;

}

.headerOfloginC{
  height: 25%;

  display:flex;
  flex-direction:column;
}

.headerOfloginC img{
  height: 60%;
  align-self:center;
  margin-top: 5%;
}

.headerOfloginC p{
  align-self:center;
  font-weight: bold;
  font-size: 14px;
}

.contentOfloginC{
  height: 50%;
  padding-left: 10%;
  padding-right: 10%;
}


.footerOfloginC{
  height: 25%;
}

::v-deep .el-input__inner {
  border-radius: 23px;
  height: 40px;
}

.tip{
  width: 95%;
  display: block;
  text-align: right;
  font-size: 12px;
  color: blue;
  margin-right: 5%;
  margin-top: 1vh;
  text-decoration:underline;
}

.tip:hover{
  cursor: pointer;
}

.btn{
  width: 50%;
  margin-left: 25%;
  height: 5vh;
  border: 0;
  border-radius: 1vh;
  color: white;
  background-color: #235dda;
}
</style>
