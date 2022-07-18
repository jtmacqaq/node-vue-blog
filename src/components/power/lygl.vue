<template>
  <div>
    <el-card>
      <el-button type="primary" class="addroute" @click="dialogVisible = true;"
        >新增路由菜单</el-button
      >
      <el-table :data="routelist" style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="navname" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="路由名称" width="180">
        </el-table-column>
        <el-table-column prop="component" label="组件" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-button type="primary" @click="editorrole(scope.row.id)">
              角色分配
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delectlist(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form :model="routeruleForm" :rules="routerules" ref="routeref">
          <el-form-item label="菜单名" prop="navname">
            <el-input v-model="routeruleForm.navname"></el-input>
          </el-form-item>
          <el-form-item label="路由名" prop="name">
            <el-input v-model="routeruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="组件" prop="component">
            <el-input v-model="routeruleForm.component"></el-input>
          </el-form-item>
          <el-form-item label="路径" prop="path">
            <el-input v-model="routeruleForm.path"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addroute"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      routeruleForm: {
        navname: "",
        name: "",
        component: "",
        path: "",
      },
      routelist:[],
      routerules: {
        navname: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入路由名称", trigger: "blur" }],
        component: [
          { required: true, message: "请输入组件名", trigger: "blur" },
        ],
        path: [{ required: true, message: "请输入路由路径", trigger: "blur" }],
      },
    };
  },
  methods: {
    addroute() {
      this.$refs.routeref.validate(async (valid) => {
        const { data: res } = await this.$http.post("/nav", this.routeruleForm);
        console.log(res)
      });
    },
    async getroutelist(){
        const {data:res} = await this.$http.get('/nav/getroute')
        this.routelist = res.message
        console.log(this.routelist)
    }
  },
  created () {
      this.getroutelist()
  }
};
</script>
<style scoped>
.addroute {
  margin-bottom: 30px;
}
</style>