<template>
  <div>
    <el-card>
      <div class="userinfo">
        <ul>
          <li>
            <span>Avatar</span>
              <el-image
                style="width: 100px; height: 100px"
                :src="$store.state.userinfo.user_pic"
              ></el-image>
          </li>
          <li>
            <span>Username</span>
            <div class="inforight">
              <el-input
                class="usernameinput"
                v-model="$store.state.userinfo.username"
                ref="Nameref"
                disabled
              ></el-input>
            </div>
          </li>
          <li>
            <span>Email</span>
            <div class="inforight">
              <el-input
                class="usernameinput"
                v-model="$store.state.userinfo.email"
                ref="Emailref"
              ></el-input>
              <i class="el-icon-edit" @click="emailclick"></i>
            </div>
          </li>
          <li>
            <span>Nickname</span>
            <div class="inforight">
              <el-input class="usernameinput" v-model="$store.state.userinfo.nickname" ref="nickref">
              </el-input>
              <i class="el-icon-edit" @click="nickclick"></i>
            </div>
          </li>
        </ul>
        <el-button type="primary" class="updateinfo" @click="updateinfo">提交修改</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      updateinfolist:{
      username: "",
      email: "",
      nickname: "null",
      user_pic:''
      },
    };
  },
  methods: {
    //请求数据
    async getuserinfo() {
      const { data: res } = await this.$http.get("my/userinfo");
      console.log(res);
      if (res.status !== 0) return this.$message.error(res.message);
      this.$store.commit('getiusernfo',res.data) 
    },
    
    nickclick() {
      this.$refs.nickref.select();
    },
    emailclick() {
      this.$refs.Emailref.select();
    },
    nameclick() {
      this.$refs.Nameref.select();
    },
    //更新用户信息函数
    async updateinfo(){
      // console.log(this.$store.state.userinfo)
      const updateinfolist = qs.stringify(this.$store.state.userinfo)
      console.log(updateinfolist)

      const {data:res} = await this.$http.post('my/updateuserinfo',updateinfolist)
      if(res.status !== 0) return this.$message.error('更新失败')
      this.$message.success('更新成功')
      this.getuserinfo()

    }
  },
  created() {
    this.getuserinfo();
  },
};
</script>
<style>
.userinfo ul {
  list-style: none;
  padding: 0 !important;
  margin: 0 !important;
}
.userinfo ul li {
  padding: 20px 0px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}
.userinfo ul li span {
  width: 10%;
}
.inforight {
  display: flex;
  align-items: center;

  flex: 1;
}
.inforight a {
  display: flex;
  text-decoration: none;
  align-items: center;
}
.inforight .el-input__inner {
  border: none !important;
}
.updateinfo {
  margin-top: 30px !important;
}
.avatar{
  display: flex;


}
</style>