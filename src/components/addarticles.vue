<template>
  <div>
    <el-card>
      <el-form
        :model="addarticleForm"
        :rules="addarticlerules"
        ref="addarticleruleForm"
        label-width="70px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="addarticleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="cate_id">
          <el-input v-model="addarticleForm.cate_id"></el-input>
        </el-form-item>
        <!-- 文章封面 -->
        <el-form-item label="封面" prop="cover_img">
          <!-- <el-upload
            action="/my/addarticles/add"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            ref="upload"
            :class="{ disabled: uploaddisabled }"
            :on-change="handleEditChange"
          >
            <i class="el-icon-plus"></i>
          </el-upload> -->
          <el-upload
            class="avatar-uploader"
            action="/my/addarticles/add"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ref="upload"
            :on-remove="handleRemove"
            :on-change="handleEditChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="addarticleForm.state">
            <el-radio label="已发布"></el-radio>
            <el-radio label="草稿"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 内容编辑区 -->
        <vue-ueditor-wrap v-model="msg" :config="config"></vue-ueditor-wrap>

        <div class="uploadButton">
          <el-button type="primary" @click="getUEContent">提交</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// 1、引入VueUeditorWrap组件
import VueUeditorWrap from "vue-ueditor-wrap";
import qs from "qs";
export default {
  name: "ueditor",
  data() {
    const checkimg = (rule, value, callback) => {
      if (!this.imglist) {
        callback(new Error("请上传图片"));
      } else {
        callback();
      }
    };
    return {
      uploaddisabled: false,
      // dialogImageUrl: "",
      dialogVisible: false,
      msg: "这是 vue-ueditor-wrap ！",
      config: {
        UEDITOR_HOME_URL: "/UE/", // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
      },
      imageUrl: "",
      // headers: { Authorization: window.sessionStorage.getItem("token") },
      cover_img: "",

      addarticleForm: {
        title: "",
        cate_id: null,
        state: "",
        content: "",
      },
      imglist: false,
      addarticlerules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        cate_id: [
          { required: true, message: "请输入文章分类", trigger: "blur" },
        ],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        cover_img: [{ required: true, validator: checkimg, trigger: "change" }],
      },
    };
  },
  methods: {
    getUEContent() {
      const file = this.$refs.upload.uploadFiles[0];
      console.log(file)
      this.$refs.addarticleruleForm.validate(async (valid) => {
        console.log(valid);
        if (!valid) {
          return;
        }
        try {
          const formDate = new FormData();
          formDate.append("cover_img", file.raw);
          formDate.append("title", this.addarticleForm.title);
          formDate.append("cate_id", this.addarticleForm.cate_id);
          formDate.append("state", this.addarticleForm.state);
          formDate.append("content", this.msg);
          const addarticle = await this.$http.post(
            "/my/addarticles/add",
            formDate,
            { "Content-Type": "application/x-www-form-urlencoded" }
          );
          console.log(addarticle);
          this.$message.success("发布成功");
        } catch (error) {
          console.log(error);
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 图片上传成功执行的函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      this.uploaddisabled = false;
      this.imglist = false;
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleEditChange(file, fileList) {
      if (fileList.length >= 1) {
        this.uploaddisabled = true;
        this.imglist = true;
      }
      console.log(fileList);
    },
  },

  components: {
    VueUeditorWrap,
  },
  //   computed: {
  //   headers(){
  //     return{
  //       'token': window.sessionStorage.getItem('token')
  //     }
  //   }

  // },
};
</script>
<style>
.upload-demo {
  margin: 20px 0px;
}
.uploadButton {
  margin-top: 20px;
  text-align: right;
}
.addcontent {
  margin-left: -70px;
}
.edui-editor {
  width: 100%;
}
.hidden {
  display: none !important;
}

.disabled .el-upload {
  display: none !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#edui1{
  width: 100%!important;
}
</style>