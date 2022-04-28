<template>
  <div>
    <Nav></Nav>
    <div class="container">
      <el-card class="box-card">
        <div class="useravatar">
          <el-avatar :src="userinfo.user_pic"></el-avatar>
        </div>
        <h1>{{ userinfo.username }}</h1>
        <el-divider></el-divider>
        <div class="userposts">
          <div
            class="userpostslist"
            v-for="(item, index) in usertaginfo"
            :key="index"
          >
            <div class="postsimg">
              <img :src="item.cover_img" />
            </div>
            <div class="postscontent">
              <h3>
                <router-link :to="{ path: `/article/${item.id}` }">{{
                  item.title
                }}</router-link>
              </h3>
              <div class="poststaglist">
                <ul>
                  <li>{{ item.pub_date }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Nav from "./nav.vue";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      usertaginfo: [],
      userinfo: {},
    };
  },
  methods: {
    async getusertag() {
      //获取调整过来路由的ID，也就是作者的ID
      const id = this.$route.params.id;
      const { data: res } = await this.$http.get("/api/usertag/" + id);
      console.log(res);
      if (res.status !== 0) return false;
      this.usertaginfo = res.message[0].ev_articles;
      this.userinfo = res.message[0];
      console.log(this.userinfo);
      console.log(this.usertaginfo);
    },
  },
  created() {
    this.getusertag();
  },
};
</script>
<style scoped>
.useravatar,
h1 {
  text-align: center !important;
}
.userpostslist {
  display: flex;
  padding: 20px 0px;
  border-bottom: 1px solid #eeee;
}
.postsimg img {
  width: 164px;
  height: 120px;
}
.userpostslist h3 {
  font-size: 18px;
}
.postscontent {
  margin-left: 20px;
  flex: 1;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.poststaglist ul {
  display: flex;
}
.poststaglist {
  margin-top: 50px;
  font-size: 14px;
}
.poststaglist ul li {
  margin-right: 20px;
}
.postscontent a {
  text-decoration: none;
  color: black;
}
</style>