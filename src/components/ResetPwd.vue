<template>
<div id="resetpwd">
  <div class="titleR">
    重置您的密码
  </div>
  <div class="contentR">
    <div style="flex: 1;">
      新密码
    </div>
    <el-input style="flex: 3;" type="password" v-model="pwd1"/>
  </div>
  <div class="contentR">
    <div style="flex: 1">
      重新输入
    </div>
    <el-input style="flex: 3" type="password" v-model="pwd2"/>
  </div>
  <div class="titleR">
    <button class="btn" style="background-color: lightgray;margin-left: 30%" @click="cancel">取消</button>
    <button class="btn" @click="confirm">确认</button>
  </div>
</div>
</template>

<script>
import {ElInput,ElMessage} from "element-plus";
import {ref} from "vue";

export default {
  name: "ResetPwd",
  emits:["saytofather"],
  props:[],
  setup(props,context){
    const saytofather = (e,f) => {
      console.log("saying");
      context.emit("saytofather", e,f);
      console.log("said");
    };
    return{
      ElMessage,
      saytofather,
      props,
      context,
      pwd1:ref(''),
      pwd2:ref('')
    }
  },
  components:{
    ElInput
  },
  methods:{
    cancel:function (){
      this.saytofather('cancel');
    },
    sendrequest:function (){
      var url='http://www.cugxp.top:8282/user/modifyPassword';
      this.axios.post(url,
          {
            email:this.UserAccount,
            password:this.UserPassword
          }).
      then((response) => {
        var result=response.data.result;
        console.log(response.data)
        if(result==="true"){//返回成功
          this.ElMessage('登录成功');
          console.log(response.data.response.content)
        }
        else{
          this.ElMessage('用户名或密码错误');
        }
      })
          .catch(error=> {
            console.log(error)
            this.ElMessage('请求失败');
          });
    },
    confirm:function (){
      var pwd1=this.pwd1;
      var pwd2=this.pwd2;
      if(pwd1.length==0){
        this.ElMessage("请输入新密码");
      }
      else if(pwd2.length==0){
        this.ElMessage("请再次输入密码");
      }
      else if(pwd1!=pwd2){
        this.ElMessage("两次密码不一致");
      }
      else{
        this.saytofather('confirm',pwd1);
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

#resetpwd{
  width: 20vw;
  height: 35vh;
  background-color: white;
  background: rgba(255,255,255,0.5);
  border-radius: 1vw;

  position: absolute;
  top:50%;
  left:50%;
  -webkit-transform:translate(-50%,-50%);
  backdrop-filter: blur(4px);
  z-index: 10;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  padding-left: 2.5vw;
  padding-right: 2.5vw;
}

.titleR{
  line-height: 10vh;
  font-size: large;
  font-weight: bold;
  flex: 1;
}

.contentR{
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.btn{
  width: 30%;
  padding: 5px 10px;
  margin-right: 5%;
  border: 0;
  color: white;
  background-color: #235dda;
  border-radius: 5px;
}
</style>
