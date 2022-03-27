<template>
    <div>
    <el-card>
        用户名：{{ username }}
        邮箱：{{ email }}
    </el-card>
    </div>
</template>
<script>
export default {
  data(){
    return{
      username:'',
      
    }
  },
    methods: {
              //请求数据
      async getuserinfo(){
        const {data:res} = await this.$http.get('my/userinfo')
        console.log(res)
        if(res.status !== 0) return this.$message.error(res.message)
        this.username = res.data.username
        console.log(this.username)
        this.email = res.data.email

      },

    },
    created () {
        this.getuserinfo()
    }
}
</script>