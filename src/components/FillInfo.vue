<template>
<div id="FillInfo">
  <div class="titleZ">
    请填写您的个人信息
  </div>
  <div class="content">
    <p style="flex: 1;">昵称</p>
    <el-input style="flex: 3;" v-model="username" max-length="8"/>
  </div>
  <div class="content">
    <p style="flex: 1">密码</p>
    <el-input style="flex: 3" v-model="pwd1" max-length="14"/>
  </div>
  <div class="content">
    <p style="flex: 1">确认密码</p>
    <el-input style="flex: 3" v-model="pwd2" max-length="14"/>
  </div>
  <div class="content">
    <p style="flex: 1">性别</p>
    <div style="flex: 3">
      <el-radio-group v-model="sex">
        <el-radio label="男" border style="margin-right: 1vw">男</el-radio>
        <el-radio label="女" border>女</el-radio>
      </el-radio-group>
    </div>
  </div>
  <div class="content">
    <p style="flex: 1">头像</p>
    <div style="flex: 3">
      <el-upload
          limit="1"
          :auto-upload="false"
          list-type="picture"
          accept="image/png,image/jpg,image/jpeg,image/webp"
          :on-change="avaterfilechange"
          :on-remove="deleteavatar"
      >
        <button class="btn1">点击上传</button>
      </el-upload>
    </div>
  </div>
  <div class="content" style="flex: 0.5">
    <p style="flex: 1">生日</p>
    <el-date-picker
        :prefix-icon="Calendar"
        style="flex: 3"
        v-model="birth"
        type="date"
        value-format="YYYY/MM/DD"
        format="YYYY/MM/DD hh:mm:ss"
    />
  </div>
  <div class="titleZ">
    <button class="btn2" @click="confirm">确认注册</button>
  </div>
</div>
</template>

<script>
//import {ElScrollbar} from "element-plus";
import {ElInput,ElUpload,ElMessage} from "element-plus";
import {ref} from "vue";
import {ElRadio,ElRadioGroup,ElDatePicker} from "element-plus";
import {Calendar} from "@element-plus/icons-vue";

export default {
  name: "FillInfo",
  props:["email"],
  emits:[""],
  setup(props,context){
    const qiniu = require('qiniu-js');
    return{
      qiniu,
      ElMessage,
      props,
      context,
      sex:ref("男"),
      birth:ref('2022-04-03'),
      Calendar,
      username:ref(''),
      pwd1:ref(''),
      pwd2:ref(''),
      avaterFile:ref({}),
      token:ref(''),
      uploadedNum:ref(0),
      avaterFilename:ref('')
    }
  },
  components:{
    ElInput,
    ElRadio,
    ElRadioGroup,
    ElUpload,
    ElDatePicker
  },
  methods:{
    deleteavatar:function (){
      this.avaterFile={};
      console.log(JSON.stringify(this.avaterFile))
    },
    avaterfilechange:function (file){
      this.avaterFile=file.raw;
      console.log(file.raw);
    },
    confirm:function (){
      var pwd1=this.pwd1;
      var pwd2=this.pwd2;
      var user_name=this.username;
      var password=this.pwd1;
      var sex=this.sex==='男'?'0':'1';
      var birthday=this.birth.split(' ')[0];
      if(pwd1!=pwd2){
        this.ElMessage('两次密码不相同');
      }
      else if(pwd1.length<6){
        this.ElMessage('密码长度为6~14位');
      }
      else if(user_name.length==0||sex.length==0||birthday.length==0||password.length==0){
        this.ElMessage('请完善信息！');
      }
      else if(JSON.stringify(this.avaterFile)==='{}'){
        this.ElMessage('请选择头像！');
      }
      else{
        this.postAvater(this.avaterFile);
      }
    },
    getCTime:function (){
      var myDate = new Date();
      var date="";
      var yy=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
      var mm=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
      var dd=myDate.getDate();        //获取当前日(1-31)
      date=date+yy+"-"+this.addZero(mm)+"-"+this.addZero(dd)+" ";
      var hour=myDate.getHours();       //获取当前小时数(0-23)
      var minute=myDate.getMinutes();     //获取当前分钟数(0-59)
      var sec=myDate.getSeconds();     //获取当前秒数(0-59)
      date=date+this.addZero(hour)+":"+this.addZero(minute)+":"+this.addZero(sec);
      console.log(date);
      return date;
    },
    addZero:function (t){
      return t<10?'0'+t:t;
    },
    sendpost:function (url,avaterFilename,email,user_name,password,sex,birthday,create_time){
      this.axios.post(url,
          {
            email:email, // 注册用户的邮箱
            user_name:user_name, // 用户昵称
            password:password, // 用户密码
            sex:sex, // 性别, 0为男， 1为女
            image_path:avaterFilename, // 用户头像
            birthday:birthday, // 生日
            create_time:create_time, // 用户点击“注册”按钮时的时间
          }).
      then((response) => {
        var result=response.data.result;
        console.log(response.data)
        if(result==="true"){//返回成功
          this.ElMessage('注册成功');
          this.input='';
          this.$router.push({name:'login'})
        }
        else{
          this.ElMessage('注册失败');
        }
      })
          .catch(error=> {
            console.log(error)
            this.ElMessage('请求失败');
          });
    },
    getToken:function (){
      var url='http://www.cugxp.top:8282/user/getToken';
      this.axios.get(url,
          {
            params:{
              id:1
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          var token=response.data.response.content.content;
          this.token=token;
          console.log(token)
        }
        else{
          var message=response.data.message;
          this.ElMessage(message);
        }
      })
    },
    postAvater:function (avaterfile){
      var filename='/user_head_pic/'+new Date().getTime()+avaterfile.name;
      this.avaterFilename='http://qn.cugxp.top/'+filename;
      console.log(this.avaterFilename);
      this.upload(this.token,this.avaterFile,filename);
    },
    //
    upload:function (token,file,filename){
      var that=this;
      var putExtra = {
        fname: filename,
        params: {}
      };
      var config = {
        useCdnDomain: true,
        region: this.qiniu.region.z2,
        forceDirect: true
      };
      var observer = {
        next (res) {
          console.log('已上传大小，单位为字节：' + res.total.loaded)
          console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
          console.log('当前上传进度，范围：0～100：' + res.total.percent);
        },
        error (err) {
          console.log(err.code)
          console.log(err.message)
          console.log(err.isRequestError)
          console.log(err.reqId);
          this.ElMessage('上传失败！');
        },
        complete (res) {
          //完成后的操作
          //上传成功以后会返回key 和 hash  key就是文件名了！
          that.uploadedNum=that.uploadedNum+1;
          console.log(res);
          console.log(1);
          that.$forceUpdate();
        }
      };
      var key=filename;
      var observable = this.qiniu.upload(file, key, token, putExtra,config);
      var subscription = observable.subscribe(observer);
      console.log(subscription);
    },
  },
  mounted() {
    this.getToken();
  },
  updated() {
    if(this.uploadedNum>=1){
      var user_name=this.username;
      var password=this.pwd1;
      var email=this.email;
      var sex=this.sex==='男'?'0':'1';
      var birthday=this.birth.split(' ')[0];
      var url='http://www.cugxp.top:8282/user/enrollUserInfo';
      var create_time=this.getCTime();
      var avaterFilename=this.avaterFilename;
      this.sendpost(url,avaterFilename,email,user_name,password,sex,birthday,create_time);
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#FillInfo{
  width: 20vw;
  height: 90vh;
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

.titleZ{
  flex: 2;
  line-height: 20vh;
  font-size: large;
  font-weight: bold;
}

.content{
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.btn1{
  border: 0;
  background-color: white;
  padding: 5px;
  font-size: small;
}

.btn2{
  width: 10vw;
  height: 5vh;
  margin-left: 5vw;
  border: 0;
  border-radius: 5px;
  color: white;
  background-color: #235dda;
}
</style>
