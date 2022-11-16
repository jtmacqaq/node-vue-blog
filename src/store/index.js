import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:{
      // username:'',
      // user_pic:'',
      // Email:'',
      // Nickname:'',
      // routes:[]
    },
    lytree:[]
  },
  mutations: {
    //这里的传入的是state
    // updateimg(state,updateimg){
    //   state.userinfo.user_pic = updateimg
    // },
    getiusernfo(state,userinfo){
      state.userinfo = userinfo
    },
    ly(state,ly){
      state.lytree = ly
    }
    //更新用户email和nickname
    // updateinfo(state,updateinfo){
    //   state.userinfo = updateinfo
    // }
  },
  actions: {
    //context是上下文的意思
    aupdate(context){
      setTimeout(() =>{
        context.commit('update')
      },1000)
    }
  },
  modules: {
  }
})
