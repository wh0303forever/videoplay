<template>
  <div class="itembox" v-if="props.item.type=='0'">
    <!--video-->
    <div v-if="props.item.type=='0'" class="video">
      <div class="Vleft">
        <img :src="props.item.cover" @click="todetail"/>
      </div>
      <div class="Vright">
        <div class="Vtitle">
          {{props.item.title}}
        </div>
        <div class="Vtime">
          浏览时间：{{props.item.browseTime}}
        </div>
        <div class="VInfo">
          <p>{{props.item.commentNum}}评论</p>
          <p>{{props.item.favourNum}}点赞</p>
          <p>删除记录</p>
        </div>
      </div>
    </div>
    <button class="btn">
      清空消息
    </button>
  </div>
</template>

<script>
export default {
  props:["item","index"],
  emits:[],
  setup(props,context){
    const saytofather = (f,e) => {
      console.log("saying");
      context.emit(f, e);
      console.log("said");
    };
    return{
      saytofather,
      context,
      props
    }
  },
  methods:{
    todetail:function (){
      var id=this.props.item.id;
      this.$router.push({name:'video',params: {id:id}})
    }
  },
  components:{

  },
  name: "recordItem"
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.itembox{
  width: 28vw;
  height: 15vh;
  background-color: #f5f6f5;
  margin-bottom: 1vh;
}
.video{
  width: 100%;
  height: 100%;
}
.Vleft{
  width: 10vw;
  height: 15vh;
  display: inline-block;
  vertical-align: top;
}
.article{
  width: 100%;
  height: 100%;
}
.Vleft img{
  width: 8vw;
  height: 12vh;
  margin: 1.5vh 1vw;
}

.Vright{
  width: 17vw;
  height: 12vh;
  padding-top:1.5vh;
  padding-bottom: 1.5vh;
  display: inline-block;
  vertical-align: top;
}

.Vtitle{
  height: 4vh;
  width: 17vw;
  line-height: 4vh;
  font-weight: bold;
}
.VInfo{
  height: 4vh;
  width: 17vw;
  line-height: 4vh;
}

.VInfo p{
  font-size: small;
  display: inline-block;
  margin-right: 1vw;
}

.VInfo p:hover{
  cursor: pointer;
}

.Vtime{
  height: 4vh;
  width: 17vw;
  font-size: small;
  color: gray;
  line-height: 4vh;
}

.btn{
  padding: 5px 10px;
  position: absolute;
  bottom: 2vh;
  right: 5vh;
  z-index: 10;
  border: 0;
  background-color: #235dda;
  border-radius: 5px;
  color: white;
}
</style>
