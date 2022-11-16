import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import resuger from '@/components/resuger'
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
import yhgl from '@/components/power/yhgl'
import jsgl from '@/components/power/jsgl'
import lygl from '@/components/power/lygl'

//导入公共模版组件
import layout from '@/pages/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  //重定向
  {
    path: '/',
    redirect: '/index'

  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: layout,
  },
  // {
  //   path: '/home',
  //   component:layout,
  //   children:[
  //     {path:'/userinfo',component:userinfo},
  //     {path:'/articlelist',component:articlelist},
  //     {path:'/addarticles',component:addarticles},
  //     {path:'/articlelb',component:articlelb},
  //     {path:'/upload',component:upload},
  //     {path:'/updatepw',component:updatepw},
  //     {path:'/ceshi',component:ceshi},
  //     {path:'/yhgl',component:yhgl},
  //     {path:'/jsgl',component:jsgl},
  //     {path:'/lygl',component:lygl}
  //   ]
  // },
  {
    path: '/resuger',
    component: resuger
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/article/:id',
    component: article
  },
  {
    path: '/category/:id',
    component: category
  },
  {
    path: '/user/:id',
    component: user
  },
]
const router = new VueRouter({
  routes,
  mode: 'history' //去掉URL中的#
})
const filterRoutes = [] //需要过滤掉的路由
routes.forEach(item => {
  filterRoutes.push(item.path)
  return filterRoutes
})
console.log(filterRoutes)
//路由拦截
router.beforeEach((to, from, next) => {
  if (filterRoutes.indexOf(to.path) !== -1) {
    next()
  }
  console.log(router.options.routes)
  if (router.options.routes.length == 8) {
    console.log('1')
    const userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
    console.log(userinfo)
    //当token和原始路由都存在的时候
    if (userinfo) {
      if (userinfo.token && userinfo.routes) {
        console.log('登陆了')
        // onFilterRoutes(to, next, userinfo.routes)

        const routes = filterASyncRoutes(JSON.parse(window.localStorage.getItem('lytree'))) // 路由过滤
        console.log(routes)
        // routes.sort((a, b) => a['id'] - b['id'])
        routes.forEach(item => {
          router.options.routes.push(item)
          router.addRoute(item)
        })
        next({
          ...to,
          replace: true
        })
      } else {
        next({
          path: '/login',
          replace: true
        })
      }
    } else {
      console.log(2)
      next({
        path: '/login',
        replace: true
      })
    }
  } else {
    console.log(3)
    next()
  }
})

//路由拼接
function loadView(view) {
  return () => import(`@/components/${view}`)
}


// 路由过滤   遍历路由 转换为组件对象和路径
function filterASyncRoutes(data) {
  const routes = data.filter(item => {
    if (item["component"] === "layout") item.component = layout
    else item["component"] = loadView(item["component"])
    // 路由递归，转换组件对象和路径
    if (item["children"] && item["children"].length > 0) item["children"] = filterASyncRoutes(item.children)
    return true //一定要加上
  })
  return routes

}


export default router