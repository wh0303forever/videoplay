<template>
<div class="rvbox">
  <div class="rvtopbox">
    <el-button type="success"
               :icon="ArrowLeftBold"
               class="btn_return"
               circle size="large"
               @click="returnBack"
    >
    </el-button>
    <p class="title1">发布视频</p>

    <button
        style="padding: 10px 20px;
        border:0;
        background-color: white;
        font-weight: bold;
        color: blue;position: absolute;
        right: 20vw;font-size: medium;
        top: 50%;
        transform: translate(0, -50%);"
        @click="confirm">
      确认发布
    </button>
  </div>

  <div class="rvcontent">
    <div class="contentLeft">
      <p class="title2">上传视频</p>
      <el-upload
          class="upload"
          :limit="1"
           accept="video/mp4"
          :show-file-list="true"
           drag
          :auto-upload="false"
          :on-error="Videouploaderror"
          :on-success="Videouploadsuccess"
          :on-progress="Videouploading"
          :on-change="Videofilechange"
          action="http://upload-z2.qiniup.com"
          :on-remove="deleteVideo"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          点击上传视频
        </div>

        <template #tip>
          <div class="el-upload__tip text-red">
            仅支持mp4格式，大小小于100MB
          </div>
        </template>
      </el-upload>


      <div style="width: 100%;margin-top: 5vh;height: fit-content">
        <p class="title2" style="display: inline-block;margin-right: 1vw">
          选择分类
        </p>
        <el-select class="rvselect" v-model="type">
          <el-option
              v-for="item in typelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>

      <div style="width: 100%;margin-top: 5vh;">
        <p class="title2" style="display: inline-block;margin-right: 1vw">
          开启评论区？
        </p>
        <el-switch
            v-model="openComment"
            size="large"
            active-text="是"
            inactive-text="否"
            inline-prompt
        />
      </div >

      <div style="
        width: 100%;
        height: fit-content;
        margin-top: 5vh;
        "
      >
        <p class="title2" style="width: fit-content;display: inline-block">
          二级分类
        </p>
        <el-input
            maxlength="6"
            v-model="sectype"
            style="display: inline-block;width: 12vw;margin-left: 1vw"
        />
          <button
              style="width: 4vw;height: 90%;
              margin-left: 0.5vw;border: 0;
               color: white;background-color: #235dda"
              @click="addSecondType"
          >
            确认
          </button>
      </div>
      <div style="display: block;margin-top: 1vh">
        <el-tag v-for="(item,index) in sectypeList"
                :key="index"
                style="margin-right: 6px;padding-left: 5px;padding-right: 5px"
                closable
                @close="sectypeClose(index)"
        >
          {{item}}
        </el-tag>
      </div>


    </div>
    <div class="contentRight">
      <div style="width: 100%;height: fit-content">
        <p class="title2" style="display: block">视频标题</p>
        <el-input v-model="title" minlength="5" maxlength="20" style="margin-top: 1vh"/>
        <p style="font-size: small;color: gray">*标题字数应在5~20个字符之间</p>


        <p class="title2" style="display: block;margin-top: 5vh">视频简介</p>
        <el-input v-model="introduction" minlength="20" maxlength="100" style="margin-top: 1vh" type="textarea" rows="5"/>
        <p style="font-size: small;color: gray">*视频简介应在20~100个字符之间</p>

        <p class="title2" style="display: block;margin-top: 5vh">视频封面</p>
        <el-upload
            class="upload"
            limit="1"
            style="margin-top: 1vh"
            :on-error="Coveruploaderror"
            :on-success="Coveruploadsuccess"
            :on-progress="Coveruploading"
            :on-change="Coverfilechange"
            :auto-upload="false"
            list-type="picture"
            accept="image/png,image/jpg,image/jpeg,image/webp"
            :file-list="fileList"
            :on-remove="deleteCover"
        >

          <button class="coverbtn">点击上传</button>

          </el-upload>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {ElUpload,ElIcon,ElSelect,ElOption,ElSwitch,ElInput,ElTag,ElMessage,ElLoading} from 'element-plus'
import {ArrowLeftBold,UploadFilled} from "@element-plus/icons-vue";
import {ElButton} from "element-plus";
import {ref} from "vue";


export default {
  name: "realeaseVideo",
  setup(){
    const qiniu = require('qiniu-js');
    return{
      LoadingService:ref({}),
      ElLoading,
      qiniu,
      user:ref([]),
      isLogin:ref(false),
      ElMessage,
      ArrowLeftBold,
      type:ref('雕塑'),
      typelist:[
        {value: '雕塑', label: '雕塑',},
        {value: '编织', label: '编织',},
        {value: '彩绘', label: '彩绘',},
        {value: '漆艺', label: '漆艺',},
        {value: '铁艺', label: '铁艺',},
        {value: '绣艺', label: '绣艺',},
        {value: '纸艺', label: '纸艺',},
        {value: '珠串', label: '珠串',}
      ],
      openComment:ref(true),
      title:ref(''),
      introduction:ref(''),
      cover:ref(''),
      coverupload:ref(false),
      domain:ref('"http://qn.cugxp.top'),
      fileList:ref([]),
      sectype:ref(''),
      sectypeList:ref([]),
      videoFile:ref({}),
      coverFile:ref({}),
      uploadedNum:ref(0),
      videoFilename:ref(''),
      coverFilename:ref(''),
      token:ref('')
    }
  },
  components:{
    ElButton,
    ElUpload,
    ElIcon,
    ElSelect,
    ElOption,
    ElSwitch,
    ElInput,
    UploadFilled,
    ElTag
  },
  methods:{
    returnBack:function (){
      this.$router.push({name:'home'})
    },
    sendrequest:function (){
      //发布请求，与服务器交互
      var ctime=this.getCTime();
      var type=this.type+';'+this.sectype[0];
      var url='http://www.cugxp.top:8282/videodetail/publishVideo';
      this.axios.post(url,
          {
            userId:this.user.id, // 发布者用户id
            videoPath:this.videoFilename, // 发布的视频地址
            coverPath:this.coverFilename,// 视频封面地址
            videoTitle:this.title,// 视频标题
            videoIntroduction:this.introduction,// 视频简介
            type:type,//视频分类，“级分类;二级分类（若干）”
            isCloseComment:'false',//是否关闭评论区
            time:100,//视频时长，秒数
            publishTime:ctime,//视频发布时间，yyyy-MM-dd HH:mm:ss 的时间戳类型
          },
          {
            headers:{
              token:this.user.token
            }
          }
          ).
      then((response) => {
        var result=response.data.result;
        console.log(response.data)
        if(result==="true"){//返回成功
          this.ElMessage('发布成功');
          this.$router.push({name:'home'})
        }
        else{
          this.ElMessage('发布失败');
        }
      })
          .catch(error=> {
            console.log(error)
            this.ElMessage('请求失败');
          });
    },
    deleteVideo:function (){
      this.videoFile={};
    },
    deleteCover:function (){
      this.coverFile={};
    },
    getToken:function (id){
      var url='http://www.cugxp.top:8282/user/getToken';
      this.axios.get(url,
          {

            params:{
              id:id
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.token=response.data.response.content.content;
        }
        else{
          var message=response.data.message;
          this.ElMessage(message);
        }
      })
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
    postVideo:function (videofile){
      //上传视频到七牛云
      var filename='/video/'+new Date().getTime()+videofile.name;
      this.videoFilename='http://qn.cugxp.top/'+filename;
      console.log(this.videoFilename);
      this.upload(this.token,this.videoFile,filename);
    },
    postCover:function (coverfile){
      var filename='/video_cover/'+new Date().getTime()+coverfile.name;
      this.coverFilename='http://qn.cugxp.top/'+filename;
      this.upload(this.token,this.coverFile,filename);
    },
    //
    upload:function (token,file,filename){
      console.log("上传"+filename);
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
        next () {
          //console.log('已上传大小，单位为字节：' + res.total.loaded)
          //console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
          //console.log('当前上传进度，范围：0～100：' + res.total.percent);
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
          that.$forceUpdate();
        }
      };
      var key=filename;
      var observable = this.qiniu.upload(file, key, token, putExtra,config);
      var subscription = observable.subscribe(observer);
      console.log(subscription);
    },
    Coveruploaderror:function (file,fileList){
      console.log("失败",file,fileList)
    },
    Coveruploading:function (file,fileList){
      console.log("上传中",file,fileList)
    },
    Coveruploadsuccess:function (file,fileList){
      console.log("成功",file,fileList)
    },
    Coverfilechange:function (file){
      var size=file.raw.size;
      console.log(file.raw.size)
      if(size/1024/1024>5){
        this.fileList=[];
        alert("文件大小不符合规范")
      }
      else{
        this.coverFile=file.raw;
      }
    },
    Videouploaderror:function (file,fileList){
      console.log("失败",file,fileList)
    },
    Videouploading:function (file,fileList){
      console.log("上传中",file,fileList)
    },
    Videouploadsuccess:function (file,fileList){
      console.log("成功",file,fileList)
    },
    Videofilechange:function (file){
      var size=file.raw.size;
      if(size/1024/1024>100){
        this.fileList=[];
        alert("文件大小不符合规范")
      }
      else{
        this.videoFile=file.raw;
      }
      console.log(file)
    },
    addSecondType:function (){
      if(this.sectype==''){
        alert('请输入')
      }
      else if(this.sectypeList.length>=5){
        alert("做多5个二级分类！")
      }
      else{
        if(this.sectypeList.indexOf(this.sectype)==-1){
          this.sectypeList.push(this.sectype)
        }
        else{
          alert("二级分类已存在")
        }
      }
      this.sectype='';
      console.log(this.sectypeList)
    },
    sectypeClose:function (index){
      this.sectypeList.splice(index,1);
    },
    confirm:function (){
      var title=this.title;
      var introduction=this.introduction;
      var id=this.user.id;
      var type=this.type;
      var isCloseComment=false;
      var time=100;
      var sectype=this.sectypeList;
      if(title.length==0||introduction.length==0){
        this.ElMessage('请完善视频信息！');
      }
      else if(title.length<5){
        this.ElMessage('标题长度应不小于5');
      }
      else if(introduction.length<20){
        this.ElMessage('简介长度应不小于20');
      }
      else if(JSON.stringify(this.coverFile)==='{}'){
        this.ElMessage('请选择封面！');
      }
      else if(JSON.stringify(this.videoFile)==='{}'){
        this.ElMessage('请选择视频！');
      }
      else if(sectype.length==0){
        this.ElMessage('至少选择一个二级分类');
      }
      else{
        this.LoadingService=this.ElLoading.service({
          lock: true,
          text: '视频上传中',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        this.postVideo(this.videoFile);
        this.postCover(this.coverFile);
      }
      console.log(id,type,isCloseComment,time);
    }
  },
  mounted() {
    this.user=this.$store.state.UserData;
    this.isLogin=this.$store.state.isLogin;
    this.getToken(this.user.id);
  },
  updated() {
    if(this.uploadedNum==2){
      this.sendrequest();
      this.LoadingService.close();
    }
  }

}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.rvbox{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.rvtopbox{
  width: 100vw;
  height: 10vh;
  position: relative;
  display: block;
  line-height: 10vh;
}

.rvtopbox p{
  position: absolute;
  left: 25vw;
  font-size: large;
}

.btn_return{
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 20vw;
  background:linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 1vw 0.5vh 1vw #d9d9d9, -1vw -0.5vh 1vw #ffffff;
  border: 0;
  color: #17adaa;
}

.rvcontent{
  width: 60vw;
  flex-grow: 1;
  padding-left: 20vw;
  padding-right: 20vw;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

}
.contentLeft{
  flex: 3;
  height: 85vh;
  /*background-color: #235dda;*/
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.contentRight{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 2;
  height: 85vh;
  padding-top: 5vh;
}
.title1{
  font-size:larger;
  font-weight: bold;
}

.title2{
  font-size:medium;
  font-weight: bold;
  display: block;
}

.upload{
  display: block;
  margin-top: 1vh;
  width: 70%;
  height: fit-content;
}

.rvselect{
  width: fit-content;
  display: inline-block;
}

.coverbtn{
  background-color: #235dda;
  color: white;
  padding: 1vh 1vw;
  border: 1px dashed blue;
}

</style>
