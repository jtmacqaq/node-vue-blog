<template>
  <div>
    <div class="header">
      <div class="nav">
        <span>jtmac</span>
        <div class="nav-list">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            :router="true"
          >
            <el-menu-item index="/index">Posts</el-menu-item>
            <el-menu-item index="2">处理中心</el-menu-item>
          </el-menu>
          <ul class="login">
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/resuger">Resuger</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 文章详情 -->
    <div class="container">
        <el-card>
            <h1 class="articletitle">{{ article.title }}</h1>
            <div class="articletag">
                <el-avatar :src="article.ev_user.user_pic" :size="large"></el-avatar>
                <div class="articletaglist">
                    <div>{{ article.ev_user.username }}</div>
                    <div>{{ article.pub_date }}</div>
    
                    

                </div>
            </div>

            <div v-html="article.content" class="articlecontent"></div>
            <div class="taglist">
                            <div v-for="(item,index) in tags" :key="index">
                        <span>{{ item.tagname }}</span>
                    </div>
            </div>
        </el-card>

    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            article:{},
            //文章标签
            tags:[]
        }
    },
    methods: {
        async getarticle(){
            const id = this.$route.params.id
            const {data:res} = await this.$http.get('/api/articleinfo/'+id)
            console.log(res)
            this.article = res.message.data[0]
            this.tags = res.message.data[0].tags
        }
    },
    created(){
        this.getarticle()
    }
};
</script>
<style scoped>
.articletag{
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}
.articletaglist{
    margin-left: 20px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    font-size: 14px;
}
.articletitle{
    margin-bottom: 40px;
    font-size: 30px;
    }
.articlecontent{
    margin: 20px 0px;
}
.taglist{
    display: flex;
    justify-content: flex-start;
}
.taglist span{
    margin-right: 20px;
}
</style>