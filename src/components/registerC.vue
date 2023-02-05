<template>
  <div id="loginC">
    <div class="headerOfloginC">
      <img src="../img/hualahuala.png"/>
      <p>{{props.typeC}}</p>
    </div>

    <div class="contentOfloginC">
      <div style="margin-top: 5vh">
        <el-input  :prefix-icon="User" placeholder="邮箱" v-model="UserAccount" :disabled="sended"/>
      </div>
      <div style="margin-top: 5vh;display: flex;flex-direction: row;flex-wrap: nowrap;">
        <div style="flex:2;padding-right: 1vw">
          <el-input  :prefix-icon="Key" placeholder="验证码" v-model="UserPassword"/>
        </div>
        <button style="flex:1" class="btn2" @click="send" id="btn2">
          发送<p v-show="!sendOk" style="display: inline">({{lastTime}}s)</p>
        </button>
      </div>
    </div>

    <div class="footerOfloginC">
      <button class="btn1" style="background-color: lightgray;margin-left: 15%" @click="cancel">取消</button>
      <button class="btn1" @click="confirm">验证</button>
    </div>
  </div>
</template>

<script>
import {ElInput,ElMessage} from "element-plus";
import {User,Key} from "@element-plus/icons-vue"
import {ref} from "vue";
//import $ from 'jquery'
export default {
  name: "loginC",
  emits: ["saytofather","getemail"],
  props:["typeC","isRegister","useremail"],
  components: {
    ElInput
  },
  setup(props,context){
    const saytofather = (f,e) => {
      console.log("saying");
      context.emit(f, e);
      console.log("said");
    };
    return{
      sended:ref(false),
      email:ref(''),
      code:ref(''),
      ElMessage,
      props,
      context,
      User,
      Key,
      UserAccount:ref(''),
      UserPassword:ref(''),
      sendOk:ref(true),
      lastTime:ref(0),
      saytofather
    }
  },
  methods:{
    confirm:function (){
      var code=this.UserPassword;
      var email=this.UserAccount;
      if(email.length==0){
        this.ElMessage('请先输入验证码')
      }
      else if(this.code.length==0){
        this.ElMessage('验证码未获取')
      }
      else if(this.code!=code){
        this.ElMessage('验证码错误')
      }
      else{
        this.ElMessage('验证成功')
        this.saytofather('saytofather','confirm');
        this.saytofather('getemail',this.email);
      }
    },
    send:function (){
      var email=this.UserAccount;
      console.log(this.props.useremail,this.props.isRegister);
      if(email.length==0){
        this.ElMessage('请输入邮箱')
      }
      else if(this.props.isRegister===false&&this.props.useremail===email){
        this.ElMessage('邮箱重复')
      }
      else{
        this.requestCode();
      }
    },
    cancel:function (){
      this.saytofather('saytofather','cancel');
    },
    requestCode:function (){
      this.sended=true;
      document.getElementById('btn2').disabled = true;
      this.code='';
      this.email=this.UserAccount;
      var url='http://www.cugxp.top:8282/user/verifyEmailAddress';
      this.axios.get(url,
          {
            params:{
              email:this.UserAccount,
              isEnroll:this.props.isRegister
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.ElMessage('验证码已发送到您的邮箱')
          this.stopbtn();
          this.code=response.data.response.content;

        }
        else{
          this.ElMessage(response.data.message);
          document.getElementById('btn2').disabled = false;
          this.sended=false;
        }
      })
          .catch(error=> {
            console.log(error)
            this.ElMessage('请求错误！');
            document.getElementById('btn2').disabled = false;
            this.sended=false;
          });
    },
    stopbtn:function (){
      document.getElementById('btn2').disabled = true;
      this.sendOk=false;
      this.lastTime=60;
      var that=this;
      var p=setInterval(function(){
        that.lastTime--;
      },1000);
      setTimeout(function (){
        p=window.clearInterval(p);
      },60000)
    },

  },
  updated() {
    if(this.lastTime<=1){
      this.sendOk=true;
      document.getElementById('btn2').disabled = false;
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
}

.btn1{
  width: 30%;
  padding: 5px 10px;
  margin-right: 5%;
  border: 0;
  color: white;
  background-color: #235dda;
  border-radius: 5px;
}
.btn2{
  border: 0;
  height: 40px;
  background: rgba(35, 93, 218,0.5);
  border-radius: 20px;
}
</style>
