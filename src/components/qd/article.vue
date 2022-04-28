<template>
  <div>
    <Nav></Nav>
    <!-- 文章详情 -->
    <div class="container">
      <el-card>
        <h1 class="articletitle">{{ article.title }}</h1>
        <div class="articletag">
          <el-avatar :src="article.ev_user.user_pic" :size="large"></el-avatar>
          <div class="articletaglist">
            <div>{{ article.ev_user.username }}</div>
            <div>{{ article.pub_date }}</div>
            <div>{{ article.ev_article_cate.name }}</div>
          </div>
        </div>

        <div v-html="article.content" class="articlecontent"></div>
        <div class="taglist">
            <span>标签:</span>
            <div v-for="(item,index) in tags" :key="index" class="tagitem">
                <a href="#">{{item.tagname}}</a>
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
      article: {},
      //文章标签
      tags: [],
    };
  },
  methods: {
    async getarticle() {
      const id = this.$route.params.id;
      const { data: res } = await this.$http.get("/api/articleinfo/" + id);
      console.log(res);
      this.article = res.message.data[0];
      this.tags = res.message.data[0].tags
      console.log(this.tags)
    },
  },
  created() {
    this.getarticle();
  },
};
</script>
<style scoped>
.articletag {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  justify-content: center;
}
.articletaglist {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
}
.articletaglist div {
  margin-left: 10px;
}
.articletitle {
  margin-bottom: 40px;
  font-size: 30px;
  text-align: center;
}
.articlecontent {
  margin: 20px 0px;
}
.taglist {
  display: flex;
  justify-content: flex-start;
}
.tagitem{
  margin-left: 20px;
}
</style>