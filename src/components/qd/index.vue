<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="containerlist">
        <div class="main" v-for="(item, index) in posts" :key="index">
          <div class="cover_img">
            <img :src="item.cover_img" />
          </div>
          <div class="contentright">
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
                <li>
                  <i class="iconfont icon-shijian"></i>{{ item.pub_date }}
                </li>
                <li>
                  <i class="iconfont icon-wenzhangguanli"></i
                  ><router-link :to="{ path: `/category/${item.cate_id}` }">{{
                    item.ev_article_cate.name
                  }}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paging">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import navbar from "./navbar.vue";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      posts: [],
      articlelbinfo: {
        page_num: 1,
        page_size: 10,
      },
      total: null,
      //文章概要
      essentials: "",
    };
  },
  methods: {
    async getposts() {
      const { data: res } = await this.$http.get("api/list", {
        params: this.articlelbinfo,
      });
      console.log(res);
      this.posts = res.message.data.rows;
      this.total = res.message.total;
    },
    handleCurrentChange(newnum) {
      console.log(newnum);
      this.articlelbinfo.page_num = newnum;
      this.getposts();
    },
  },
  created() {
    this.getposts();
  },
};
</script>

<style>
.title h1 {
  font-size: 22px;
  margin: 0;
}
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
  max-width: 150px;
  border-radius: 5%;
}
.tag ul li {
  list-style: none;
}
.taglist {
  display: flex;
  padding: 0;
  margin: 0;
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
.paging {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
.main {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.contentright {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  flex: 1;
  margin-left: 30px;
}
</style>