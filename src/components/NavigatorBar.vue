<template>
<div id="navigatorBar">
  <el-button type="success"
             :icon="ArrowLeftBold"
             class="btn_return"
             circle size="large"
             @click="returnBack"
             v-if="props.hideReturnButton==='true'"
  >
  </el-button>
  <div class="middle">
    <button :class="'listItem'+(props.targetItem==item.name?'-target':'')"
        v-for="item in props.navlist" v-bind:key="item.name"
        v-on:click="targetChange(item.name,item.index)"
        v-bind:id="item.index">
      <span>
        {{item.text}}
      </span>
    </button>
  </div>
</div>
</template>

<script>
import {ElButton} from "element-plus";
import {ArrowLeftBold} from "@element-plus/icons-vue";

export default {
  emits: ["saytofather","returnBack"],
  name: "NavigatorBar",
  props:['targetItem',"navlist","hideReturnButton"],
  setup(props, context){
    const saytofather = (e) => {
      console.log("saying");
      context.emit("saytofather", e);
      console.log("said");
    };
    return{
      props,
      context,
      saytofather,
      ArrowLeftBold
    }
  },
  components:{
    ElButton
  },
  methods:{
      targetChange:function (e,i){
        this.saytofather(i);
    },
    returnBack:function (){
        this.context.emit("returnBack");
    }
  },
  updated() {

  },
  mounted() {

  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#navigatorBar{
  width: 100vw;
  height: 6vh;
  position: fixed;
  left: 0;
  top:7vh;
  z-index: 10;
  padding-top: 1vh;
  padding-bottom: 1vh;
  background-color: white;
}

.listItem{
  display: inline-block;
  width: 7vw;
  height: 5vh;
  border-radius: 3vh;
  text-align: center;
  margin: 1vh 0.5vw;
  line-height: 5vh;
  border: 1px #d9d9d9;
  border-radius: 50px;
  background:linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 1vw 0.5vh 1.5vw #d9d9d9, -1vw -0.5vh 1.5vw #ffffff;

  font-family: 'ZCOOL QingKe HuangYou', cursive;
  font-size: 14px;
}
.listItem:hover{
  border-radius: 50px;
  background:linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 1vw 0.5vh 1vw #c7c7c7, -1vw -0.5vh 1vw #ffffff;

}


.listItem-target{
  display: inline-block;
  width: 7vw;
  height: 5vh;
  border-radius: 3vh;
  text-align: center;
  margin: 1vh 0.5vw;
  line-height: 5vh;
  border: 1px #d9d9d9;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: inset 1vw 0.5vh 1.5vw #e3e3e3,inset -1vw -0.5vh 1.5vw #ffffff;

  font-family: 'ZCOOL QingKe HuangYou', cursive;
}
.listItem-target span::after{
  content: "";
  width: 1.2vh;
  height: 1.2vh;
  border-radius: 1.2vh;
  background-color: #235dda;
  vertical-align: top;
  display: inline-block;
  margin-top: 1.9vh;
  margin-left: 0.6vw;
  border: 0;
}
.middle{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  height: 5vh;
  width: fit-content;
}
.btn_return{
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 10;
  left: 5vw;
  background:linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 1vw 0.5vh 1vw #d9d9d9, -1vw -0.5vh 1vw #ffffff;
  border: 0;
  color: #17adaa;
}

</style>