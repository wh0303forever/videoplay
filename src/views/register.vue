<template>
  <div id="register">
    <register-c
      @saytofather="hearFromSon"
      v-show="targetPage === 'register'"
      typeC="注册"
      @getemail="getemail"
      is-register="true"
      useremail=""
    />
    <fill-info
      @saytofather="hearFromSon"
      v-show="targetPage === 'FillInfo'"
      :email="email"
    />
  </div>
</template>

<script>
//import loginC from "@/components/loginC";
import registerC from "@/components/registerC";
import { ref } from "vue";
import FillInfo from "@/components/FillInfo";
export default {
  name: "Login",
  setup() {
    return {
      targetPage: ref("register"),
      email: ref(""),
    };
  },
  components: {
    FillInfo,
    registerC,
  },
  methods: {
    hearFromSon: function (e) {
      if (e === "confirm") console.log(e);
      else {
        this.$router.push({ name: "login" });
      }
    },
    getemail: function (e) {
      console.log(e);
      this.email = e;
      console.log("1", this.email);
      this.targetPage = "FillInfo";
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
#register {
  width: 100vw;
  height: 100vh;

  position: relative;
  background-image: url("../img/bk1.png");
  background-size: cover;
}
</style>
