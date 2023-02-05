import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      UserData: {
        id: 0,
        imagePath: require("../img/unlogin.png"),
        token: "",
        username: "",
      },
      isLogin: false,
    };
  },
  mutations: {
    changeUserData(state, userdata) {
      state.UserData = userdata;
    },
    changeLoginCon(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {},
  modules: {},
});
