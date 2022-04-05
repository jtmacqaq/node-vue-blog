<template>
  <el-container class="elcontainer">
    <el-header>
      <img src="@/assets/homelogo.png" />
      <div class="header_left">
            <div class="infoimg">
      <el-avatar :src="userinfo.user_pic"></el-avatar>
    </div>
        <p>欢迎，{{ userinfo.username }}</p>
        <i class="el-icon-switch-button"></i>
        <el-button type="text" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="iscollapse ? '56px': '200px'">
        <!-- 点击菜单折叠图标 -->
        <div class="toggle-button" @click="togglebutton">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          router
          unique-opened
          :collapse = "iscollapse"
          :collapse-transition = "false"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单的模版区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconobj[1]"></i>
              <!-- 文本 -->
              <span>个人中心</span>
            </template>
            <!--二级菜单 -->
            <el-menu-item index="/userinfo">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-grid"></i>
                <!-- 文本 -->
                <span>基本资料</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/updatepw">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-grid"></i>
                <!-- 文本 -->
                <span>更改密码</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/upload">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-grid"></i>
                <!-- 文本 -->
                <span>上传头像</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 一级菜单的模版区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconobj[2]"></i>
              <!-- 文本 -->
              <span>文章管理</span>
            </template>
            <!--二级菜单 -->
            <el-menu-item index="/articlelist">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-grid"></i>
                <!-- 文本 -->
                <span>文章类别</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/addarticles">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-grid"></i>
                <!-- 文本 -->
                <span>发布文章</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/articlelb">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-s-grid"></i>
                <!-- 文本 -->
                <span>文章列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import userinfo from "@/components/userinfo/userinfo";
import Userinfo from "./userinfo/userinfo.vue";
export default {
  data() {
    return {
      userinfo:{},

      //定义一个字体icon对象
      iconobj:{
        '1': 'iconfont icon-gerenzhongxin',
        '2': 'iconfont icon-wenzhangguanli'

      },
      //定义折叠参数
      iscollapse:false
    };
  },

  methods: {
    async getuserinfo(){
      const {data:res} = await this.$http.get("my/userinfo")
      if(res.status !== 0) return this.$message.error('获取信息失败')
      this.userinfo = res.data
      console.log(this.userinfo)

    },
    logout() {
      //清除token
      window.sessionStorage.clear();
      //跳转到登陆页
      this.$router.push("/login");
    },
    //菜单栏折叠和展开的函数
    togglebutton(){
      this.iscollapse = !this.iscollapse
    }
  },

  created() {
    this.getuserinfo()
  },
};
</script>
<style scoped>
.el-header {
  background-color: #373d41;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.elcontainer {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header img {
  height: 60px;
  width: 60px;
}
.header_left {
  display: flex;
  color: aliceblue;
  align-items: center;
  justify-content: center;
}
.header_left p {
  margin-right: 20px;
}
.el-button {
  margin-left: 10px;
}
.el-menu {
  border: none;
}
.iconfont{
  margin-right: 20px;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  color:#eaedf1;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;

}
.infoimg{
  margin-right: 30px;
  display: flex;
}
</style>