<template>
  <el-container class="layoutmai">
      <!-- 头部 -->
    <layoutheader></layoutheader>
    <el-container>
      <!-- 侧边栏 -->
      <layoutsidebar></layoutsidebar>
      
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
//导入头部模版
import layoutheader from "@/pages/layout/header.vue";
import layoutsidebar from "@/pages/layout/sidebar.vue";
export default {
  components: {
    layoutheader,
    layoutsidebar,
  },
  data() {
    return {
      userinfo: {},

      //定义一个字体icon对象
      iconobj: {
        1: "iconfont icon-gerenzhongxin",
        2: "iconfont icon-wenzhangguanli",
      },
      //定义折叠参数
      iscollapse: false,
    };
  },

  methods: {
    async getuserinfo() {
      const { data: res } = await this.$http.get("my/userinfo");
      if (res.status !== 0) return this.$message.error("获取信息失败");
      this.userinfo = res.data;
      console.log(this.userinfo);
      this.$store.commit("getiusernfo", this.userinfo);
    },

    //菜单栏折叠和展开的函数
    togglebutton() {
      this.iscollapse = !this.iscollapse;
    },
  },

  created() {
    this.getuserinfo();
  },
};
</script>
<style scoped>
.layoutmai {
  flex-direction: column;
}
.el-container {
  height: 100%;
}
</style>
