<template>
<div id="home">
  <TopBar />
  <FirstPage :style="'display:'+(target=='firstPage'?'block':'none')" @saytofather="hearfromSon1"/>
  <ClassificationPage :style="'display:'+(target=='classificationPage'?'block':'none')"
                      @saytofather="hearfromSon2"
                      :index="index"
                      notsearch="true" />
</div>
</template>

<script>
import TopBar from "@/components/TopBar";
import FirstPage from "@/components/FirstPage";
import {ref} from "vue";
import ClassificationPage from "@/components/ClassificationPage";
export default {
  name: "home",
  setup(){
    return{
      target:ref('firstPage'),
      index:ref(0),
      user:ref({})
    }
  },
  components:{
    ClassificationPage,
    TopBar,
    FirstPage
  },
  methods:{
    hearfromSon1:function (e){
      this.target="classificationPage";
      this.index=e;

    },
    hearfromSon2:function (){
      this.target="firstPage";
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin:0;
}
#home{
  width: 100vw;
  height: 100vh;
}
</style>