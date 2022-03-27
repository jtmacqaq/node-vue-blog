import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui'
//导入全局样式表
import './assets/css/global.css'
//导入axios
import axios from 'axios'
//引入ueditor相关的配置
import '../public/UE/ueditor.config.js'
import '../public/UE/ueditor.all.min.js'
import '../public/UE/lang/zh-cn/zh-cn.js'
import '../public/UE/ueditor.parse.min.js'
Vue.use(ElementUI)
// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//请求拦截
axios.interceptors.request.use(config =>{
  //为请求头对象，添加token验证的authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//挂载到vue原型对象上
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
