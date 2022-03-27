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
    <img :src="url" alt v-if="url != null" width="100" height="100" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      filedata: "",
      url: null,

      title: "dd",
      cate_id: 1,
      state: "草稿",
      content: "nihao",
    };
  },
  methods: {
    handleUpload(res) {
      let formData = new FormData();
      formData.append("cover_img", res.file);
      formData.append("title", this.title);
      formData.append("cate_id", this.cate_id);
      formData.append("state", this.state);
      formData.append("content", this.content);
      this.filedata = formData;
    },
    async upload() {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const results = await this.$http.post(
        "/my/addarticles/add",
        this.filedata,
        config
      );
    //   const { filename, path } = results.data.message.data;
      console.log(results);
      this.url = results.data.message.img_url;
    },
  },
};
</script>