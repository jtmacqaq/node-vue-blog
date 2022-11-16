<template>
  <div>
    <navbar></navbar>
    <!-- 文章详情 -->
    <div class="container">
      <el-card>
        <h1 class="articletitle">{{ article.title }}</h1>
        <div class="articletag">
          <el-avatar :src="article.ev_user.user_pic"></el-avatar>
          <div class="articletaglist">
            <div>{{ article.ev_user.username }}</div>
            <div>{{ article.pub_date }}</div>
            <div>{{ article.ev_article_cate.name }}</div>
            <div @click="like"><i class="iconfont icon-xihuan"></i>{{likenum}}</div>
          </div>
        </div>

        <div v-html="article.content" class="articlecontent"></div>
        <div class="taglist">
          <span>标签:</span>
          <div v-for="(item, index) in tags" :key="index" class="tagitem">
            <a href="#">{{ item.tagname }}</a>
          </div>
        </div>
        <!-- 评论区 -->
        <div class="comments" v-if="nid">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="comments.content"
          >
          </el-input>
          <el-button type="primary" class="commentbutton" @click="postcomments"
            >提交</el-button
          >
        </div>
        <el-alert title="您还未登录，请登录后评论" type="error" v-else>
        </el-alert>
        <div class="commentslist">
          <div v-for="(item, index) in commentslist" :key="index">
            <div class="commentsitem">
              <div>
                <el-avatar
                  :src="item.ev_user.user_pic"
                  class="userlogo"
                />
              </div>
              <div class="commentszj">
                <div class="commentsname">{{ item.ev_user.username }}</div>
                <div class="commentscontent">{{ item.content }}</div>
              </div>
              <div class="reply">
                <a @click="replycomments(item.id)">回复</a>
              </div>
            </div>
            <div class="replycontent" v-if="replyid === item.id">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="replycomment.content"
              >
              </el-input>
              <el-button
                type="primary"
                class="commentbutton"
                @click="postreply(item.id)"
                >提交</el-button
              >
            </div>
            <div
              v-for="item2 in item.children"
              :key="item2.id"
              class="replylist"
            >
              <div class="commentsitem">
                <div>
                  <el-avatar
                    :src="item2.ev_user.user_pic"
                    class="userlogo"
                  />
                </div>
                <div class="commentszj">
                  <div class="commentsname">{{ item2.ev_user.username }}</div>
                  <div class="commentscontent">{{ item2.content }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import navbar from "./navbar.vue";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      article: {},
      //文章标签
      tags: [],
      nid: "",
      comments: {
        post_id: null,
        from_uid: null,
        content: "",
      },
      replycomment: {
        post_id: null,
        from_uid: null,
        content: "",
        parent_id: null,
      },
      commentslist: [],
      replylist: [],
      replyid: null,
      likeinfo:{
        post_id:null,
        from_uid:null
      },
      likenum:null
    };
  },
  methods: {
    async getarticle() {
      const id = this.$route.params.id;
      const { data: res } = await this.$http.get("/api/articleinfo/" + id);
      console.log(res);
      this.article = res.message.data[0];
      this.tags = res.message.data[0].tags;
      console.log(this.tags);
    },
    //获取评论列表
    async getcommentslist() {
      const post_id = this.$route.params.id;
      this.nid = window.localStorage.getItem("nid");
      const { data: res } = await this.$http.get("/api/commentslist", {
        params: { post_id: post_id },
      });
      console.log(res);
      if (res.status !== 0) this.$message.error("获取信息失败");
      const datalist = [];
      console.log(res.message)
      res.message.map((item) => (item.children = []));
      console.log(res.message)
      res.message.forEach((item) => {
        res.message.forEach((item2) => {
          if (item2.parent_id === item.id) {
            item.children.push(item2);
          }
        });
      });
      res.message.forEach((item) => {
        if (!item.parent_id) {
          datalist.push(item);
        }
      });
      this.commentslist = datalist;
    },
    //提交评论
    async postcomments() {
      this.comments.post_id = this.$route.params.id;
      this.comments.from_uid = window.localStorage.getItem("uid");
      const comments = qs.stringify(this.comments);
      const { data: res } = await this.$http.post(
        "/comment/comments",
        comments
      );
      console.log(res);
      if (res.status !== 0) return;
      this.$message.success("评论成功");
      this.comments.content = "";
      this.getcommentslist();
    },
    //回复评论
    replycomments(commentid) {
      this.replyid = commentid;
    },
    async postreply(commentid) {
      this.replycomment.post_id = this.$route.params.id;
      this.replycomment.from_uid = window.localStorage.getItem("uid");
      this.replycomment.parent_id = commentid;
      const replycomment = qs.stringify(this.replycomment);
      const { data: res } = await this.$http.post(
        "/comment/replycomments",
        replycomment
      );
      console.log(res);
      if (res.status !== 0) this.$message.error("评论失败");
      this.$message.success("评论成功");
      this.replyid = null;
      this.getcommentslist();
    },

    //文章点赞（喜欢）函数
    async like(){

       this.likeinfo.post_id = this.$route.params.id
       this.likeinfo.from_uid = window.localStorage.getItem('uid')
       const likeinfo = qs.stringify(this.likeinfo)
       console.log(likeinfo)  
       if(!window.localStorage.getItem('nid')){
         return this.$message.error('请登陆后点赞👍')
       }
      const {data:res} = await this.$http.post('/like/like',likeinfo)
      if(res.status !==0 ) return this.$message.error(res.message)
      this.$message.success('点赞成功')
      this.getlikenum()
    },
    //获取文章点赞数量
    async getlikenum(){

      const {data:res} =await this.$http.get(`/api/likenum/${this.$route.params.id}`)
      this.likenum = res.message
      console.log(this.likenum)
    }

  },
  mounted() {},
  created() {
    this.getarticle();
    this.getcommentslist();
    this.getlikenum()
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
  margin-bottom: 20px;
}
.tagitem {
  margin-left: 20px;
}
.comments {
  margin: 50px 0px;
}
.commentbutton {
  margin-top: 30px;
}
.commentsitem {
  display: flex;
  padding: 10px 0px;
  border-bottom: 1px solid #eee;
  width: 100%;
}
.commentsname {
  font-size: 12px;
  margin-bottom: 5px;
}
.commentscontent {
  font-size: 14px;
}
.reply {
  display: flex;
  font-size: 12px;
  align-items: flex-end;
}
.commentszj {
  flex: 1;
  margin-left: 20px;
}
.replylist {
  display: flex;
  margin-left: 40px;
}
.replycontent {
  padding: 20px 0px;
}
</style>