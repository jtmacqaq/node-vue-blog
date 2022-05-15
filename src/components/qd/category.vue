<template>
    <div>
        <!-- 头部导航 -->
        <navbar></navbar>
        <div class="container">
            <el-card>
                <h1>{{category}}</h1>
                <div class="categorylist">
                    <div class="categoryitem" v-for="item in categorylist" :key="item.id">
                        <div class="catetitle">
                            {{ item.title}}
                        </div>
                        <div v-html="item.content">

                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import navbar from './navbar.vue'
export default {
    data () {
        return {
            categorylist:[],
            category:''
        }
    },
    methods:{
        async getcategory(){
            const categoryid = this.$route.params.id;
            console.log(categoryid)
            const {data:res} = await this.$http.get("/category/cate/"+categoryid)
            console.log(res)
            this.categorylist = res.message
            this.category = res.message[0].ev_article_cate.name

        }

    },
    created(){
        this.getcategory()
    },
    components:{
        navbar
    }
}
</script>
<style scoped>
.categorylist{
    padding-top: 30px;
    border-top: 1px solid #eee;
}
.categoryitem{
   padding: 30px 0px;
   border-bottom: 1px solid #eee;
}
</style>