<template>
  <div>
    <el-card>
      <!-- 搜索和添加用户区域 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="请输入查询科目"
            v-model="queryinfo.title"
            class="input-with-select"
            clearable
            @clear="getarticlelist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getarticlelist"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">
            添加科目</el-button
          >
        </el-col>
      </el-row>
      <!-- 文章类别表格区域 -->
      <el-table :data="articlelist" style="width: 100%">
        <el-table-column type="index" width="180" label="序号">
        </el-table-column>
        <el-table-column prop="alias" label="别名"> </el-table-column>
        <el-table-column prop="name" label="科目"> </el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showeditlist(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delectlist(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.page_num"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryinfo.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户弹出层 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="adddialogclose"
       >
      <!-- 内容主体区域 -->
      <el-form :model="addform" :rules="addformrules" ref="addformruleForm" label-width="70px">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="addform.name"></el-input>
  </el-form-item>
    <el-form-item label="用户名" prop="alias">
    <el-input v-model="addform.alias"></el-input>
  </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑类目弹出层 -->
    <el-dialog
  title="编辑科目信息"
  :visible.sync="editdialogVisible"
  width="50%">
  <el-form :model="editform" :rules="editrules" ref="editruleForm" label-width="70px">
  <el-form-item label="科目" prop="name">
    <el-input v-model="editform.name"></el-input>
  </el-form-item>
    <el-form-item label="别名" prop="alias">
    <el-input v-model="editform.alias"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editformlist">确 定</el-button>
  </span>
</el-dialog>
    

  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      articlelist: [],
      queryinfo: {
        title: "",
        page_num: 1, //当前的页数
        page_size: 2, //每页显示的数量
      },
      total: 0,
      dialogVisible: false, //弹出层的现实和隐藏
      //添加用户的表单数据
      addform:{
          name:'',
          alias:''
      },
      //添加表单的验证规则对象
      addformrules:{
          name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
      },
      //编辑用户信息弹出层显示和隐藏
      editdialogVisible:false,
      //编辑用户的对象
      editform:{
          name:'',
          alias:''
      },
      //修改科目分类信息的验证规则对象
      editrules:{
          name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
      },
   


    };
  },
  methods: {
    async getarticlelist() {
      const { data: res } = await this.$http.get("/my/article/cates", {
        params: this.queryinfo,
      });
      console.log(res);
      this.articlelist = res.message.data.rows;
      this.queryinfo.page_num = res.message.page_num;
      this.queryinfo.page_size = res.message.page_size;
      this.total = res.message.total;
      console.log("点击了搜索");
    },
    //根据id显示用户信息请求
    async showeditlist(id){
        console.log(id)
        //点击显示编辑用户信息弹出层
        this.editdialogVisible = true
        //发送请求
        const {data:res} = await this.$http.get('/my/article/cates/' + id)
        console.log(res)
        if(res.status !== 0) return this.$message.error('查询用户信息失败')
        this.editform = res.message.data[0]
        console.log(this.editform)

    },
    //监听pagesize改变的事件
    handleSizeChange(newsize) {
      console.log(newsize);
      this.queryinfo.page_size = newsize;
      this.getarticlelist();
    },
    //监听页码值改变的事件
    handleCurrentChange(newnum) {
      this.queryinfo.page_num = newnum;
      this.getarticlelist();
    },
     //监听添加用户对话框的关闭事件
  adddialogclose(){
      this.$refs.addformruleForm.resetFields()
  },
  //点击按钮添加用户
  addcate(){
      //校验规则
      const addform = qs.stringify(this.addform)
      this.$refs.addformruleForm.validate(async valid =>{
          if(!valid) return
          //可以发起添加用户的请求
          const {data:res} = await this.$http.post('/my/article/addcates',addform)
          if(res.status !== 0){
              this.$message.error('添加失败')
          }
          this.$message.success('添加用户成功')
          //隐藏添加用户的对话框
          this.dialogVisible = false
          //重新发起数据请求
          this.getarticlelist()
      })
  },
  //修改分类信息事件
  editformlist(){
      const editform = qs.stringify(this.editform)
      console.log(editform)
      console.log(this.editform.id)
      //校验规则
      this.$refs.editruleForm.validate(async valid =>{
          if(!valid) return
          //发起修改分类信息的请求
          const {data:res} = await this.$http.post('/my/article/updatecate',editform)
          console.log(res)
          if(res.status !== 0) return this.$message.error(res.message)
          this.editdialogVisible=false
          this.getarticlelist()
        this.$message.success('修改分类信息成功')
      })
  },
//根据id删除科目信息事件
  async delectlist(id){
      const res1 = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        console.log(res1)
       if(res1 !== 'confirm') return this.$message.info('取消了删除操作')
       //发送删除科目分类的请求
       const {data:res} = await this.$http.get('/my/article/deletecate/' + id)
       console.log(res)   
       if(res.status !== 0) return this.$message.error('删除分类信息失败')
       this.$message.success('删除分类信息成功')
       this.getarticlelist()
  }

  },
  created() {
    this.getarticlelist();
  },
 
};
</script>
<style scoped>
.el-pagination {
  margin-bottom: 15px;
}
</style>