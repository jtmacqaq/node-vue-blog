<template>
  <div>
    <el-upload
      :http-request="handleUpload"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      class="upload-demo"
      action
      list-type="picture-card"
      :limit="1"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button type="success" @click="upload">上传</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filedata:''
    };
  },
  methods: {
    handleUpload(res) {
      let formData = new FormData();
      formData.append("avatar", res.file);
      this.filedata = formData;
    },
    async upload() {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const results = await this.$http.post(
        "/my/update/avatar",
        this.filedata,
        config
      );
    //   const { filename, path } = results.data.message.data;
      console.log(results);
      if(results.data.status !== 0){
        return this.$message.error('上传头像失败')
      }
      this.$message.success('上传头像成功')
      this.$store.commit('updateimg', results.data.message)
      
    },
  },
};
</script>