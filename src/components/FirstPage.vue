<template>
<div id="FirstPage">
  <NavigatorBar :targetItem="target" :navlist="list"  @saytofather="hearfromSon" hideReturnButton='false'/>
  <el-scrollbar style="width: 100vw;height: 93vh;display: block" >
    <div id="content">
      <!--内容-->
      <div class="oneType" :id="'Type'+index" v-for="(item,index) in list" v-bind:key="item.name">
        <div class="typeTop">
          <img :src="item.img_path" class="typeImg"/>
          <div class="typeTitle">{{item.text}}</div>
          <el-button type="success"
                     :icon="ArrowRightBold"
                     class="btn_right"
                     circle size="large"
          v-on:click="pagechange(item.index)"></el-button>
        </div>
        <video-card v-for="item1 in contents[item.name]" :content="item1" :key="item1.id"/>
      </div>
    </div>
    <div style="width: 90vw;height: 20vh"></div>
  </el-scrollbar>
</div>
</template>

<script>
import NavigatorBar from "@/components/NavigatorBar";
import {ElScrollbar,ElButton} from 'element-plus'
import VideoCard from "@/components/videoCard";
import {ArrowRightBold} from "@element-plus/icons-vue";
import $ from 'jquery'
import {getCurrentInstance, ref} from "vue";

export default {
  name: "FirstPage",
  height:0,
  props:["targetPage"],
  setup(props,context){
    const saytofather = (e) => {
      console.log("saying");
      context.emit("saytofather", e);
      console.log("said");
    };
    var target=ref('sculpture');
        const list=[
      {
        name:'sculpture',
        text:'雕塑',
        img_path:require('../img/sculpture.png'),
        index:0
      },
      {
        name:'weave',
        text:'编织',
        img_path:require('../img/weave.png'),
        index:1
      },
      {
        name:'painted',
        text:'彩绘',
        img_path:require('../img/painted.png'),
        index:2
      },
      {
        name:'lacquerArt',
        text:'漆艺',
        img_path:require('../img/lacquerArt.png'),
        index:3
      },
      {
        name:'ironArt',
        text:'铁艺',
        img_path:require('../img/ironArt.png'),
        index:4
      },
      {
        name:'embroidery',
        text:'绣艺',
        img_path:require('../img/embroidery.png'),
        index:5
      },
      {
        name:'paperArt',
        text:'纸艺',
        img_path:require('../img/paperArt.png'),
        index:6
      },
      {
        name:'jewelry',
        text:'珠串',
        img_path:require('../img/jewelry.png'),
        index:7
      }
    ];
    const ctx = getCurrentInstance()
    //这里别加分号！
    return{
      ctx,
      props,
      target,
      $,
      list,
      contents:ref({}),
      ArrowRightBold,
      saytofather
    }
  },
  components:{
    VideoCard,
    NavigatorBar,
    ElScrollbar,
    ElButton
  },
  methods:{
    handleScrolly() {
      for(var i=0;i<=7;i++){
        var height=$('#Type'+i.toString()).offset()['top'];
        if(height-this.height<=50&&height-this.height>=-50){
          this.target=this.list[i].name;
          break;
        }
      }
    },
    hearfromSon:function (i){
      this.target=this.list[i].name;
      document.getElementById("Type"+i).scrollIntoView();
    },
    pagechange:function (e){
      this.saytofather(e);
    },
    getFirstPageInfo:function (){
      var url='http://www.cugxp.top:8282/homepage/index';
      console.log(url);
      this.axios.get(url).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          console.log(response)
          this.contents=response.data.response.content;
          console.log(response)
        }
        else{
          var message=response.data.message;
          alert(message);
          console.log(1)
        }
      })
    },
    test:function (){
      var url='http://www.cugxp.top:8282/homepage/index';
      this.axios.get(url).
      then((response) => {
        console.log(response.data)
      })
    }

  },
  updated() {

  },
  mounted(){
    this.getFirstPageInfo();
    this.test();
    //获取第一项的初始高度值
    window.addEventListener('scroll',this.handleScrolly,true);
    var height=$('#Type0').offset()['top'];
    this.height=height;
  },
  created() {

  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#FirstPage{
  width: 100vw;
  height: 91vh;
}
#content{
  width: 90vw;
  padding-left:5vw;
  padding-right: 5vw;
  padding-top: 10vh;
}

.typeImg{
  width: 8vh;
  height: 8vh;
  display: inline-block;
}
.typeTop{
  width: 86vw;
  height: 8vh;
  margin-bottom: 2vh;
  line-height: 8vh;
  margin-left: 2vw;
  z-index: 5;
  position: relative;
}
.typeTitle{
  height: 8vh;
  line-height: 8vh;
  display: inline-block;
  vertical-align: top;
  font-size: 20px;
  margin-left: 1vw;
}

.oneType{
  width: 90vw;
  height: fit-content;
  display: block;
  margin-bottom: 5vh;
}
.btn_right{
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 0;
  background:linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 1vw 0.5vh 1vw #d9d9d9, -1vw -0.5vh 1vw #ffffff;
  border: 0;
  color: #17adaa;
}

</style>
