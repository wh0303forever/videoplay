<template>
  <div class="box">
  <div class="bar">
    <el-button type="success"
               :icon="ArrowLeftBold"
               class="btn_return"
               circle
               @click="returnToHome"
    >
    </el-button>
    <search-input @saytofather="search" :isMimicry="false" class="searchBar"/>
    </div>
    <ClassificationPage @saytofather="hearfromSon2" notsearch="false" index="0" :KeyWords="keywords"/>
  </div>
</template>

<script>
import ClassificationPage from "@/components/ClassificationPage";
import {ref} from "vue";
import SearchInput from "@/components/SearchInput";
import {ElButton} from "element-plus";
import {ArrowLeftBold} from "@element-plus/icons-vue";
export default {
  name: "search",
  setup(){
    return{
      target:ref(''),
      keywords:ref(''),
      results:ref([]),
      ArrowLeftBold
    }
  },
  mounted() {
    this.keywords=this.$route.params.keywords;
    console.log(this.keywords)
  },
  methods:{
    search:function (e){
      this.keywords=e;
    },
    returnToHome:function (){
      this.$router.push({name:'home'});
    },
    hearfromSon2:function (){
      this.target="firstPage";
    }
  },
  components:{
    SearchInput,
    ElButton,
    ClassificationPage

  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}

box{
  width: 100vw;
  height: 100vh;
}

.bar{
  width: 94vw;
  height: 7vh;
  padding-left:3vw ;
  padding-right:3vw ;
  border-bottom: 1px black;
  background-color: #8EBCAF;
  position: relative;
}

.searchBar{
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 移动元素本身50% */
  display: inline-block;
  margin-top: 1.5vh;
}
.btn_return{
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 10;
  left: 5vw;
  background: linear-gradient(145deg, #80a99e, #98c9bb);
  box-shadow:  10px 10px 20px #79a095,
  -10px -10px 20px #a3d8c9;
  border: 1px #a3d8c9;
}
</style>