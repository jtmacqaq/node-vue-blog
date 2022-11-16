<template>
  <div>
    <!-- 侧边栏 -->
    <el-aside class="layoutsidebar">
      <!-- 点击菜单折叠图标 -->
      <div class="toggle-button">|||</div>
      <!-- 侧边栏菜单 -->
      <el-menu
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        router
        unique-opened
        :collapse-transition="false"
      >
        <el-submenu v-for="item in menulist" :key="item.id" :index = "item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.navname }}</span>
          </template>

          <sidebaritem :lychildren="item.children"></sidebaritem>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
import sidebaritem from "@/pages/layout/sidebaritem";
export default {
  name: "layoutsidebar",
  data() {
    return {
      menulist: [],
      //定义一个字体icon对象
      iconobj: {
        1: "iconfont icon-gerenzhongxin",
        2: "iconfont icon-wenzhangguanli",
      },
    };
  },
  components: {
    sidebaritem,
  },
  methods: {
    //菜单栏折叠和展开的函数
    // togglebutton() {
    //   this.iscollapse = !this.iscollapse;
    // },
    getmenu() {
      const lytree = JSON.parse(window.localStorage.getItem("lytree"));
      this.menulist = lytree;
    },
  },
  mounted() {
    this.getmenu();
  },
};
</script>
<style scoped>
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  color: #eaedf1;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-aside {
  background-color: #333744;
}
.el-button {
  margin-left: 10px;
}
.el-menu {
  border: none;
}
.layoutsidebar {
  height: 100%;
}
</style>