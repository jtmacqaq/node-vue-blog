import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import resuger from  '@/components/resuger'
import userinfo from '@/components/userinfo/userinfo'
import articlelist from '@/components/articlelist'
import addarticles from '@/components/addarticles'
import articlelb from '@/components/articlelb'
import upload from '@/components/upload'
import updatepw from '@/components/userinfo/updatepw'
import index from '@/components/qd/index'
import article from '@/components/qd/article'
import category from '@/components/qd/category'
import user from '@/components/qd/user'
//ceshi的路由
import ceshi from '@/components/ceshi'

Vue.use(VueRouter)

const routes = [
  //重定向
  {
    path:'/',
    redirect: '/index'

  },
  {
    path: '/login',
    component:login
  },
  {
    path: '/home',
    component:home,
    children:[
      {path:'/userinfo',component:userinfo},
      {path:'/articlelist',component:articlelist},
      {path:'/addarticles',component:addarticles},
      {path:'/articlelb',component:articlelb},
      {path:'/upload',component:upload},
      {path:'/updatepw',component:updatepw},
      {path:'/ceshi',component:ceshi}
    ]
  },
  {
    path: '/resuger',
    component:resuger
  },
  {
    path: '/index',
    component:index
  },
  {
    path:'/article/:id',
    component:article
  },
  {
    path:'/category/:id',
    component:category
  },
  {
    path:'/user/:id',
    component:user
  },
]

const router = new VueRouter({
  routes,
  mode:'history'//去掉URL中的#
})
//挂载路由导航守卫
// router.beforeEach((to,from,next) =>{
//   //to  将要访问的路径
//   //from 代表从哪个路径跳转而来
//   // next 是一个函数  表示放行

//   if(to.path === '/login' || to.path === '/resuger' || to.path === '/index') return next()
//   //获取token
//   const tokenstr = window.sessionStorage.getItem('token')
//   if(!tokenstr) return next('/login')
//   next()

// })
export default router
