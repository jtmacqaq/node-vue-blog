<template>
        <div class="header">
      <div class="nav">
        <span>jtmac</span>
        <div class="nav-list">
          <el-menu
            mode="horizontal"
            router
          >
            <el-menu-item index="/index">Posts</el-menu-item>
            <el-menu-item index="2">处理中心</el-menu-item>
          </el-menu>
          <ul class="login">
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/resuger">Register</router-link></li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name:"navbar"
    
}
</script>
<style>
.login a{
    color: #909399;
}
</style>