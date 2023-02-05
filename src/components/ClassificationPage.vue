<template>
<div class="lbox">
  <NavigatorBar
    :targetItem="target"
    :navlist="list"
    @saytofather="HearFromSon"
    @returnBack="returnBack"
    :hideReturnButton="props.notsearch"/>
  <el-scrollbar style="width: 100vw;height: 93vh;display: block" >
    <div id="video" class="content" :style="'display:'+(target==='video'?'block':'none')">
      <div class="typeTop" v-if="props.notsearch==='true'">
        <img :src="typelist[this.props.index].img_path" class="typeImg"/>
        <div class="typeTitle">{{typelist[this.props.index].text}}</div>
      </div>
      <div v-if="hasVideo">
      <video-card v-for="item in contents['video']" :key="item.id" :content="item" style="margin-bottom: 5vh"/>
      </div>
    </div>
    <div id="article" class="content" :style="'display:'+(target==='article'?'block':'none')">
      <div class="typeTop" v-if="props.notsearch==='true'">
        <img :src="typelist[this.props.index].img_path" class="typeImg"/>
        <div class="typeTitle">{{typelist[this.props.index].text}}</div>
      </div>
      <div v-if="hasArticle">
        <article-card v-for="item in contents.article" :content="item" :key="item.id"/>
      </div>
    </div>
  </el-scrollbar>
</div>
</template>

<script>
import NavigatorBar from "@/components/NavigatorBar";
import {ref} from "vue";
import {ArrowLeftBold} from "@element-plus/icons-vue";
import $ from "jquery";
import {ElScrollbar} from 'element-plus'
import VideoCard from "@/components/videoCard";
import ArticleCard from "@/components/articleCard";
export default {
  name: "ClassificationPage",
  props:["index","notsearch","KeyWords"],
  setup(props,context){
    const saytofather = () => {
      console.log("saying");
      context.emit("saytofather");
      console.log("said");
    };
    const typelist=[
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
      }];
    return{
      contents:ref({}),
      target:ref('video'),
      list:[
        {
          name:'video',
          text:'视频',
          index:0
        },
        {
          name:'article',
          text:'文章',
          index:1
        }
      ],
      ArrowLeftBold,
      saytofather,
      typelist,
      props,
      hasArticle:ref(false),
      hasVideo:ref(false),
      keyWords:ref('')
    }
  },
  components: {
    ArticleCard,
    VideoCard,
    NavigatorBar,
    ElScrollbar
  },
  methods:{
    HearFromSon:function (i){
      this.target=this.list[i].name;
      if(this.article=='video'){
        $('#video').visible=true;
        $('#article').visible=false;
      }
      else{
        $('#video').visible=false;
        $('#article').visible=true;
      }
      //document.getElementById("Type"+i).scrollIntoView();
    },
    returnBack:function (){
      this.saytofather();
    },
    getClassificationPageInfo:function (e){
      var url='http://www.cugxp.top:8282/homepage/searchByFristType';
      this.axios.get(url,
          {
            params:{
              type:e
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.contents=response.data.response.content;
          console.log(response.data.response.content)
          if(this.contents.video.length!=0){
            this.hasVideo=true;
          }
          if(this.contents.article.length!=0){
            this.hasVideo=true;
          }
        }
        else{
          var message=response.data.message;
          alert(message);
        }
      })
    },
    search:function (e){
      console.log("key"+e)
      var url='http://www.cugxp.top:8282/homepage/searchByKeywords';
      this.axios.get(url,
          {
            params:{
              keyWords:e
            }
          }).
      then((response) => {
        var result=response.data.result;
        if(result==="true"){//返回成功
          this.contents=response.data.response.content;
          console.log(response.data.response.content);
          if(this.contents.video.length!=0){
            this.hasVideo=true;
          }
          if(this.contents.article.length!=0){
            this.hasVideo=true;
          }
        }
        else{
          var message=response.data.message;
          alert(message);
        }
      })
    }
  },
  created() {

  },
  updated() {
    if(this.keyWords!=this.props.KeyWords){
      if (this.props.notsearch==="true"){
        console.log("分类")
        var type = this.typelist[this.props.index].text;
        this.getClassificationPageInfo(type);
      }
      else{
        this.contents={};
        console.log("update搜索");
        console.log(this.props.KeyWords)
        var keywords=this.props.KeyWords;
        this.search(keywords);
      }
    }
    this.keyWords=this.props.KeyWords;
  }
}
</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
}
.lbox{
  width: 100vw;
  height: 91vh;
}

.content{
  width: 90vw;
  padding-left:5vw;
  padding-right: 5vw;
  padding-top: 15vh;
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

</style>