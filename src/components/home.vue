<template>
  <el-container class="elcontainer">
    <el-header>
      <img src="@/assets/homelogo.png" />
      <div class="header_left">
        <p>欢迎，{{ username }}</p>
        <i class="el-icon-switch-button"></i>
        <el-button type="text" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单的模版区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>个人中心</span>
            </template>
            <!--二级菜单 -->
            <el-menu-item index="/userinfo">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>基本资料</span>
              </template>
            </el-menu-item>
            <el-menu-item index="1-2">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>更换头像</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/upload">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>重置密码</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 一级菜单的模版区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>文章管理</span>
            </template>
            <!--二级菜单 -->
            <el-menu-item index="/articlelist">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>文章类别</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/addarticles">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>更换头像</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/articlelb">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
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
      username: "",
    };
  },

  methods: {
    logout() {
      //清除token
      window.sessionStorage.clear();
      //跳转到登陆页
      this.$router.push("/login");
    },
  },

  created() {},
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
</style>