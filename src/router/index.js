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

Vue.use(VueRouter)

const routes = [
  //重定向
  {
    path:'/',
    redirect: '/login'

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
      {path:'/updatepw',component:updatepw}
    ]
  },
  {
    path: '/resuger',
    component:resuger
  },
  {
    path: '/index',
    component:index
  }
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next) =>{
  //to  将要访问的路径
  //from 代表从哪个路径跳转而来
  // next 是一个函数  表示放行

  if(to.path === '/login' || to.path === '/resuger' || to.path === '/index') return next()
  //获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if(!tokenstr) return next('/login')
  next()

})
export default router
