import { createRouter, createWebHashHistory } from 'vue-router'
import video from "@/views/video";
import article from "@/views/article";
import home from "@/views/home";
import personal from "@/views/personal";
import search from "@/views/search";
import realeaseArticle from "@/views/realeaseArticle";
import realeaseVideo from "@/views/realeaseVideo";
import Login from "@/views/Login";
import register from "@/views/register"
import FindPwd from "@/views/FindPwd";

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/article',
    name: 'article',
    component: article
  },
  {
    path: '/realeaseArticle',
    name: 'realeaseArticle',
    component: realeaseArticle
  },
  {
    path: '/realeaseVideo',
    name: 'realeaseVideo',
    component: realeaseVideo
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/video',
    name: 'video',
    component: video
  },
  {
    path: '/personal',
    name: 'personal',
    component: personal
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/FindPwd',
    name: 'findpwd',
    component: FindPwd
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes,
  base:'hualahuala'
})

export default router
