<template>
  <div>
    <el-card>
      <el-table :data="articlelbdata" style="width: 100%">
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="pub_date" label="发布日期"> </el-table-column>
        <el-table-column prop="state" label="发布状态"> </el-table-column>
        <el-table-column prop="cate_id" label="分类ID"> </el-table-column>
        <el-table-column prop="author_id" label="作者ID"> </el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- {{ scope.row }} -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editarticle(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delectarticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="articlelbinfo.page_num"
        :page-sizes="[1, 5, 8, 10]"
        :page-size="articlelbinfo.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 修改文章列表信息弹出框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <!-- 内容区 -->
      <el-form
        :model="articleinfobyid"
        :rules="editarticlerules"
        ref="addarticleruleForm"
        label-width="70px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleinfobyid.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="cate_id">
          <el-input v-model="articleinfobyid.cate_id"></el-input>
        </el-form-item>
        <!-- 文章封面 -->
        <el-form-item label="封面" prop="cover_img">
          <el-upload
            class="avatar-uploader"
            action="/my/addarticles/updatearticle"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            ref="upload"
            :on-remove="handleRemove"
            :on-change="handleEditChange"
          >
            <img
              v-if="articleinfobyid.cover_img"
              :src="articleinfobyid.cover_img"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 内容编辑区 -->
        <vue-ueditor-wrap
          v-model="articleinfobyid.content"
          :config="config"
        ></vue-ueditor-wrap>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatearticle()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import qs from "qs";
export default {
  data() {
    return {
      articlelbdata: [],
      articlelbinfo: {
        page_num: 1,
        page_size: 5,
      },
      filelist: [{ name: "", url: "" }],
      articleinfobyid: {
        title: "",
        cate_id: null,
        content: "",
        cover_img: "",
      },

      total: 0,
      dialogVisible: false,
      msg: "这是 vue-ueditor-wrap ！",
      config: {
        UEDITOR_HOME_URL: "/UE/", // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
      },
      editarticlerules: {
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
      },
    };
  },
  methods: {
    async getarticlelb() {
      //请求数据
      const { data: res } = await this.$http.get("/my/addarticles/list", {
        params: this.articlelbinfo,
      });
      console.log(res);
      this.articlelbdata = res.message.data.rows;
      this.total = res.message.total;
      this.articlelbinfo.page_num = res.message.page_num;
      this.articlelbinfo.page_size = res.message.page_size;
    },
    //每页多少条
    handleSizeChange(newsize) {
      this.articlelbinfo.page_size = newsize;
      this.getarticlelb();
    },
    //当前页
    handleCurrentChange(newnum) {
      this.articlelbinfo.page_num = newnum;
      this.getarticlelb();
    },
    async editarticle(id) {
      this.dialogVisible = true;
      const { data: res } = await this.$http.get(
        "/my/addarticles/articleinfo/" + id
      );
      this.articleinfobyid = res.message.data[0];
      //   this.articleinfobyid.title = res.message.data[0].title
      //   this.articleinfobyid.cate_id = res.message.data[0].cate_id
      //   this.articleinfobyid.content = res.message.data[0].content
      this.articleinfobyid.cover_img = res.message.data[0].cover_img;
      console.log(res);
    },
    async delectarticle(id) {
      const re = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (re === "confirm") {
        const { data: res } = await this.$http.get(
          "/my/addarticles/delete/" + id
        );
        console.log(res);
        if (res.status !== 0) return this.$message.error("删除失败");
        this.$message.success("删除文章成功");
        this.getarticlelb();
      }
    },
    handlePictureCardPreview(file, fileList) {},
    handleRemove(file, fileList) {},
    //更新文章信息函数
    async updatearticle() {
      const articleinfobyid = qs.stringify(this.articleinfobyid);
      const file = this.$refs.upload.uploadFiles;
      console.log(file);
      console.log(this.articleinfobyid.id);
      const { data: res } = await this.$http.post(
        "/my/addarticles/updatearticle",
        articleinfobyid
      );
      console.log(res);
    },
    // 图片上传成功执行的函数
    handleAvatarSuccess(res, file) {
      this.articleinfobyid.cover_img = URL.createObjectURL(file.raw);
    },
  },
  created() {
    this.getarticlelb();
  },
  components: {
    VueUeditorWrap,
  },
};
</script>