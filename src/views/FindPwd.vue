<template>
<div id="findpwd">
  <register-c @saytofather="hearFromSon"
              v-show="targetPage==='register'"
              typeC="找回密码"
              @getemail="getemail"
              isRegister="false"/>
  <reset-pwd
      v-show="targetPage==='FillInfo'"
      :email="email"
      @saytofather="handlePwd"
  />
</div>
</template>

<script>
import registerC from "@/components/registerC";
import {ref} from "vue";
import ResetPwd from "@/components/ResetPwd";
import {ElMessage} from "element-plus";

export default {
  name: "FindPwd",
  setup(){
    return{
      ElMessage,
      targetPage:ref('register'),
      email:ref('')
    }
  },
  components:{
    ResetPwd,
    registerC
  },
  methods:{
    handlePwd:function (e,pwd){
      if(e==='cancel'){
        this.$router.push({name:'login'});
      }
      else{
        this.sendrequest(pwd);
      }
    },
    sendrequest:function (pwd){
      var url='/api/user/modifyPassword';
      this.axios.post(url,
          {
            email:this.email,
            password:pwd
          }).
      then((response) => {
        var result=response.data.result;
        console.log(response.data)
        if(result==="true"){//返回成功
          this.ElMessage('修改成功');
          this.$router.push({name:'login'})
        }
        else{
          this.ElMessage('修改失败');
        }
      })
          .catch(error=> {
            console.log(error)
            this.ElMessage('请求失败');
          });
    },
    hearFromSon:function (e,f){
      console.log(f);
      if(e==='confirm')
        this.targetPage='FillInfo';
      else{
        this.$router.push({name:'login'})
      }
    },
    getemail:function (e){
      this.email=e;
    }
  }

}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#findpwd{
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url('../img/bk3.png');
  background-size: cover;
}
</style>
