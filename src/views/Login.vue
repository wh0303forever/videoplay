<template>
<div id="login">
  <login-c />
</div>
</template>

<script>
import loginC from "@/components/loginC";
//import registerC from "@/components/registerC";
import {ref} from "vue";
export default {
  name: "Login",
  setup(){
    return{
      currentPage:ref('login')
    }
  },
  components: {
    loginC

  },
  methods:{

  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin:0;
}
#login{
  width: 100vw;
  height: 100vh;

  position: relative;
  background-image: url('../img/bk2.png');
  background-size: cover;
}
</style>