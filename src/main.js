import { createApp } from "vue";
import store from "./store";
import "element-plus/dist/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
//引入 hls,视频直播(m3u8)必须引入的
import "videojs-contrib-hls";
//播放rtmp视频
import "videojs-flash";
//如果你需要自定义播放器的样式，自己新建一个css
import App from "./App.vue";
import router from "./router";
//import userdata from './common/content.js';

const app = createApp(App);
//全局配置
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
app.config.globalProperties.$user = {};
app.use(store).use(router).mount("#app");
