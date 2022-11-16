<template>
  <div>
    <el-header class="layoutheader">
      <span class="adminlogo">jtmac</span>
      <div class="header_left">
        <div class="infoimg">
          <el-avatar :src="$store.state.userinfo.user_pic"></el-avatar>
        </div>
        <p>欢迎，{{ $store.state.userinfo.username }}</p>
        <i class="el-icon-switch-button"></i>
        <el-button type="text" @click="logout">退出</el-button>
      </div>
    </el-header>
  </div>
</template>
<script>
export default {
  name: "layoutheader",
  data() {
    return {};
  },
  methods: {
    logout() {
      //清除token
      window.sessionStorage.clear();
      //清除用户ID
      window.localStorage.clear();
      //跳转到登陆页
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.el-header {
  background-color: #373d41;
}
.layoutheader,
.header_left {
  display: flex;
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
.adminlogo {
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: bold;
  color: white;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  color: #eaedf1;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.infoimg {
  margin-right: 30px;
  display: flex;
}
</style>
