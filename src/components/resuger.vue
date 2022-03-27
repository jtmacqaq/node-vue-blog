<template>
<div class="resuger_content">
<div class="resuger_box">
 <el-form  :model="form" label-width="80px" class="resuger_form" :rules="resugerules" ref="resugerref">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-from-item class="resuger_button">
    <el-button type="primary" @click="resugerclick">注册</el-button>
 </el-from-item>
</el-form>
</div>

</div>
</template>
<script>
import qs from 'qs'
export default {
    data () {
        return {
            form:{
                username:'admin',
                password:'123456',
                email:'123@qq.com'
            },
            resugerules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        resugerclick(){
            this.$refs.resugerref.validate( async valid =>{
                console.log(this.form)
                const form = qs.stringify(this.form)
                console.log(form)
                if(!valid) return
                const {data:res} = await this.$http.post('api/reguser',form)
                if(res.status !== 0) {
                    return this.$message.error('注册失败')
                }
                this.$message.success('注册成功，请登陆')
                this.$router.push('/login')
            })
        }
        
    }


}
</script>
<style scoped>
.resuger_content{
    background-color: beige;
    height: 100%;
}
.resuger_box{
    width:450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.resuger_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
}
.resuger_button{
    display: flex;
    justify-content: center;
}
</style>