<template>
  <div class="login_content">
    <div class="login_box">
      <img src="@/assets/logo.png" />
      <!-- 登陆表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginfrom"
        :rules="loginfromrules"
        ref="loginformref"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-search"
            v-model="loginfrom.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-search"
            v-model="loginfrom.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="login_button">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="reguser">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      loginfrom: {
        username: "admin10",
        password: "333333",
      },
      //这是表单的验证规则对象
      loginfromrules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginformref.validate(async (valid) => {
        console.log(this.loginfrom);
        const loginfrom = qs.stringify(this.loginfrom);

        console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post("/api/login", loginfrom);
        console.log(res);
        if (res.status !== 0) return this.$message.error("登陆失败");
        this.$message.success("登陆成功");
        //将token保存在sessionStorage中
        window.sessionStorage.setItem("token", res.token);
        window.localStorage.setItem('uid',res.uid)
        window.localStorage.setItem('nid',res.token)
        //然后跳转到后台主页,路由地址为/home
        this.$router.push("/home");
      });
    },
    //注册
    reguser() {
      this.$router.push("/resuger");
    },
  },
};
</script>
<style scoped>
.login_content {
  background-color: beige;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_box img {
  width: 100px;
  height: 100px;
  position: absolute;

  border: 1px solid #eee;
  border-radius: 50%;
  background-color: #eee;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_button {
  display: flex;
  justify-content: right;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>