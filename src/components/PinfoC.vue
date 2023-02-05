<template>
  <!--个人信息组件-->
<el-scrollbar id="pinfoC">
  <div class="oneItem" style="margin-top: 5vh">
    <div class="name">
      昵称
    </div>
    <div class="content">
      <p style="display: inline-block" v-if="!(targetchange==='昵称')">{{user.username}}</p>
      <el-input type="text" class="input" v-model="tempuser.username" maxlength="8" v-if="(targetchange==='昵称')"/>
      <button class="control" v-if="(targetchange==='昵称')" @click="changeconfirm('user_name')">确认</button>
      <button class="control" @click="change('')" v-if="(targetchange==='昵称')">取消</button>
      <button class="control" v-if="!(targetchange==='昵称')" @click="change('昵称')">修改</button>
    </div>
</div>

  <div class="oneItem">
    <div class="name">
      性别
    </div>
    <div class="content">
      <p style="display: inline-block" v-if="!(targetchange==='性别')">{{user.sex}}</p>
      <el-radio-group v-model="tempuser.sex" v-if="(targetchange==='性别')">
        <el-radio label="男" border style="margin-right: 2px">男</el-radio>
        <el-radio label="女" border>女</el-radio>
      </el-radio-group>
      <button class="control" v-if="(targetchange==='性别')" @click="changeconfirm('sex')">确认</button>
      <button class="control" @click="change('')" v-if="(targetchange==='性别')">取消</button>
      <button class="control" v-if="!(targetchange==='性别')" @click="change('性别')">修改</button>
    </div>
  </div>

  <div class="oneItem">
    <div class="name">
      生日
    </div>
    <div class="content">
      <p style="display: inline-block" v-if="!(targetchange==='生日')">{{user.birthday}}</p>
      <el-date-picker
          v-model="tempuser.birthday"
          type="date"
          class="input"
          value-format="YYYY/MM/DD"
          format="YYYY/MM/DD hh:mm:ss"
          v-if="(targetchange==='生日')"
      />
      <button class="control" v-if="(targetchange==='生日')" @click="changeconfirm('birthday')">确认</button>
      <button class="control" @click="change('')" v-if="(targetchange==='生日')">取消</button>
      <button class="control" v-if="!(targetchange==='生日')" @click="change('生日')">修改</button>
    </div>
  </div>

  <div class="oneItem">
    <div class="name">
      邮箱
    </div>
    <div class="content">
      <p style="display: inline-block" v-if="!(targetchange==='邮箱')">{{user.email}}</p>
      <button class="control" v-if="!(targetchange==='邮箱')" @click="changemail">修改</button>
    </div>
  </div>


  <div class="content">
    <button class="pwd" @click="changepwd">修改密码</button>
  </div>

</el-scrollbar>
  <div class="abox" v-if="changingpwd||changingMail">
    <reset-pwd v-if="changingpwd" style="background-color: #f5f6f5;border-radius: 0" @saytofather="hearfromson1"/>
    <registerC
        @saytofather="hearfromson2"
        style="background-color: #f5f6f5;border-radius: 0"
        typeC="邮箱验证" v-if="changingMail"
        @getemail="getemail"
        :is-register="true"
        :useremail="user.email"
    />
  </div>
</template>

<script>
import {ElRadio,ElRadioGroup,ElDatePicker,ElMessage} from "element-plus";
import {ref} from "vue";
import {ElInput} from "element-plus";
import ResetPwd from "@/components/ResetPwd";
import registerC from "@/components/registerC";

export default {
  name: "PinfoC",
  props:[],
  setup(props,context){
    const saytofather = (e) => {
      console.log("saying");
      context.emit("saytofather", e);
      console.log("said");
    };
    return{
      ElMessage,
      changingpwd:ref(false),
      changingMail:ref(false),
      saytofather,
      targetchange:ref(''),
      tempuser:ref({

      }),
      user:ref({

      })
    }
  },
  methods:{
    changeconfirm:function (e){
      console.log(e);
      if(e==='user_name'){
        console.log(this.user.username);
        this.sendrequest(e,this.tempuser.username);
        this.user.username=this.tempuser.username;
      }
      else if(e==='sex'){
        console.log(this.user.sex);
        var sex=this.tempuser.sex==='男'?0:1;
        this.sendrequest(e,sex);
        this.user.sex=this.tempuser.sex;
      }
      else if(e==='birthday'){
        this.sendrequest(e,this.tempuser.birthday);
        this.user.birthday=this.tempuser.birthday.split(" ")[0];
      }
      this.targetchange='unknown';
    },
    getemail:function (e){
      this.sendrequest('email',e);
      this.user.email=e;
      console.log(e);
    },
    change:function (e){
      this.copyboth();
      this.targetchange=e;
    },
    changepwd:function (){
      this.changingpwd=true;
    },
    hearfromson1:function (e,f){
      if(e==='cancel'){
        this.changingpwd=false;
      }
      else{
        this.changingpwd=false;
        this.sendrequest('password',f);
      }
    },
    sendrequest:function (e,m){
      this.sended=true;
      var id=this.user.id;
      console.log(id,e,m);
      var url='http://www.cugxp.top:8282/user/modifyUserInfo';
      this.axios.get(url,
          {
            headers:{
              token:this.user.token
            },
              params:{
                id: id,
                attribute: e,
                target: m
              }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.ElMessage('修改成功');
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
    copyboth:function (){
      this.tempuser.sex=this.user.sex;
      this.tempuser.birthday=this.user.birthday;
      this.tempuser.username=this.user.username;
      this.tempuser.email=this.user.email;
    },
    hearfromson2:function (e){
      console.log(e)
      if(e==='cancel'){
        this.changingMail=false;
      }
      else{
        this.changingMail=false;
      }
    },
    changemail:function (){
      this.changingMail=true;
    }

  },
  components:{
    ResetPwd,
    ElInput,
    ElRadio,
    ElRadioGroup,
    ElDatePicker,
    registerC
  },
  mounted() {
    this.user=this.$store.state.UserData;
    var t=this.user.birthday.split(" ")[0];
    this.user.birthday=t;
    this.user.sex=this.user.sex==='0'?'男':'女';
    this.copyboth();
    console.log(this.user);
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#pinfoC{
  width: 28vw;
  margin-left: 1vw;
  flex: 1;
}
.oneItem{
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 2vh;
}

.name{
  height: 100%;
  flex: 1;
  font-weight: bold;
  text-align: left;
}

.content{
  height: 100%;
  flex: 4;

  text-align: left;
  font-size: 14px;
}

.control{
  font-size: 10px;
  border: 0;
  background-color: white;
  padding: 1px 3px;
  text-decoration:underline;
  color: #235dda;
}

.input{
  width: 60%;
  display: inline-block;
}

.changeZ{
  flex: 4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.confirmbtn{
  flex: 1;
  width: 80%;
}

.mail{
  width: 100%;
  height: fit-content;
  display: block;
}

.mailInput{
  width: 80%;
  display: block;
  margin-right: 20%;

}

.codeInput{
  width: 50%;
  display: inline-block;
  margin-right: 5%;
  margin-top: 2vh;
}

.codebtn{
  width: 20%;
  display: inline-block;
  margin-top: 2vh;
  border: 0;
  background-color: white;
}

.pwd{
  color: #235dda;
  text-decoration:underline;
  margin-top: 2vh;
  display: block;
  background-color: white;
  border: 0;
}

.abox{
  position: absolute;
  width: 100%;height: 100%;
  left: 0;right: 0;
  background: rgba(255,255,255,0);
}
</style>
