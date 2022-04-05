<template>
  <div class="editpwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>更改密码</span>
      </div>
      <el-form ref="pwref" :model="pwinfo" :rules="pwrule" label-width="80px">
        <el-form-item label="原密码" prop="oldpwd">
          <el-input v-model="pwinfo.oldpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-input v-model="pwinfo.newpwd" type="password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="updatepw">提交</el-button>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      pwinfo: {
        oldpwd: null,
        newpwd: null,
      },
      pwrule: {
        oldpwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newpwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    updatepw() {
      const pwinfo = qs.stringify(this.pwinfo);
      this.$refs.pwref.validate(async (valid) => {
        const { data: res } = await this.$http.post("my/updatepwd", pwinfo);
        if (res.status !== 0) return this.$message.error(res.message);
        this.$message.success(res.message);
      });
    },
  },
};
</script>

<style>
.editpwd .el-input {
  width: 50% !important;
}
</style>