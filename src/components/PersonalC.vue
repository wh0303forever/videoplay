<template>
<div id="personalC">
  <div class="topZ">
    <img :src="user.imagePath"/>
    {{user.username}}
  </div>
  <div class="contentZ">
    <menu-p @saytofather="hearfromson1"/>
    <pinfo-c v-if="current==='个人信息'"/>
    <videolist v-if="current==='视频'" :user="user"/>
    <articlelist v-if="current==='文章'" :user="user"/>
    <record-list v-if="current==='浏览记录'" :user="user"/>
  </div>

</div>
</template>

<script>
//import {ElMenu,ElMenuItem} from "element-plus"
import MenuP from "@/components/MenuP";
import PinfoC from "@/components/PinfoC";
import {ref} from "vue";
//import VideoItem from "@/components/videoItem";
import Videolist from "@/components/videolist";
import Articlelist from "@/components/articlelist";
import RecordList from "@/components/recordList";
//import VideoItem from "@/components/videoItem";
export default {
  name: "PersonalC",
  emits:["saytofather"],
  props:[],
  setup(props,context){
    const saytofather = (e) => {
      console.log("saying");
      context.emit("saytofather", e);
      console.log("said");
    };
    return{
      user:ref([]),
      saytofather,
      props,
      context,
      current:ref('个人信息')
    }
  },
  components:{
    RecordList,
    Articlelist,
    Videolist,
    //VideoItem,
    //VideoItem,
    PinfoC,
    MenuP

  },
  methods:{
    hearfromson1:function (e){
      this.current=e;
      console.log(this.current)
    }
  },
  mounted() {
    this.user=this.$store.state.UserData;
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#personalC{
  width: 100%;
  position: absolute;
  left: 0;
  top: 10%;
  height: 90%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.topZ{
  position: relative;
  width: 100%;
  flex: 1;
  line-height: 10vh;
}

.topZ img{
  width: 7vh;
  height: 7vh;
  margin: 1.5vh 1vw 1.5vw 2vw;
  border-radius: 4vh;
  vertical-align: top;
}

.contentZ{
  position: relative;
  width: 100%;
  flex: 8;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.pmenu{
  width: 100%;
  height: fit-content;
}

.videos{
  width: 28vw;
  margin-left: 1vw;
  flex: 1;
  margin-right: 1vw;
}
</style>