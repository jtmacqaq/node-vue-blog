<template>
  <div>
    <Nav></Nav>
    <div class="container">
      <div class="containerlist">
        <div class="main" v-for="(item, index) in posts" :key="index">
          <div class="title">
            <router-link :to="{ path: `/article/${item.id}` }"
              ><h1>{{ item.title }}</h1></router-link
            >
          </div>
          <div class="tag">
            <ul class="taglist">
              <li>
                <i class="iconfont icon-gerenzhongxin"></i
                ><router-link :to="{ path: `/user/${item.author_id}` }">{{
                  item.ev_user.username
                }}</router-link>
              </li>
              <li><i class="iconfont icon-shijian"></i>{{ item.pub_date }}</li>
              <li>
                <i class="iconfont icon-wenzhangguanli"></i
                ><router-link to="/category">{{
                  item.ev_article_cate.name
                }}</router-link>
              </li>
            </ul>
          </div>
          <div class="cover_img">
            <img :src="item.cover_img" />
          </div>
          <div class="Outlinen">
            <p>
              Outlinen. 大纲,轮廓,概要 vt. 描画轮廓,描述要点 n. 大纲,分级,轮廓”
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
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
      posts: [],
      articlelbinfo: {
        page_num: 1,
        page_size: 10,
      },
    };
  },
  methods: {
    async getposts() {
      const { data: res } = await this.$http.get("api/list", {
        params: this.articlelbinfo,
      });
      console.log(res);
      this.posts = res.message.data.rows;
    },
  },
  created() {
    this.getposts();
  },
};
</script>

<style>
.header {
  border: 1px solid #eeeeee;
}
.nav {
  width: 960px;
  margin: 0 auto;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.nav span {
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: bold;
}
.nav-list .el-menu {
  border: none !important;
  flex: 1;
}
.nav-list {
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-left: 30px;
}
.login {
  list-style: none;
  display: flex;
  align-items: center;
  color: #909399;
}
.login li {
  padding-left: 20px;
}
.container {
  width: 860px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
}
.cover_img img {
  max-width: 100%;
}
.title {
  text-align: center;
}
.tag ul li {
  list-style: none;
}
.taglist {
  display: flex;
  justify-content: center;
  color: #999;
  font-size: 14px;
}
.taglist li {
  margin-right: 10px;
}
.taglist .iconfont {
  margin-right: 10px;
}
.Outlinen {
  padding: 25px 0px 25px 0px;
  border-bottom: 1px solid #eeeeee;
}
a {
  text-decoration: none;
  color: black;
}
.tag a {
  color: #909399;
}
</style>