<template>
  <div>
    <el-card>
      <el-button type="primary" class="addroute" @click="xzlu"
        >新增路由菜单</el-button
      >
      <el-table :data="routelist" style="width: 100%">
        <el-table-column type="index" label="序号" width="120">
        </el-table-column>
        <el-table-column prop="navname" label="菜单名称" width="120">
        </el-table-column>
        <el-table-column prop="name" label="路由名称" width="120">
        </el-table-column>
        <el-table-column prop="component" label="组件" width="120">
        </el-table-column>
        <el-table-column prop="icon" label="图标" width="120">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>

        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-button type="primary" @click="editorrole(scope.row.id)">
              编辑
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
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-tabs v-model="activeName" @tab-click="xzcf">
          <el-tab-pane label="一级菜单" name="first">
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
              <el-form-item label="图标" prop="icon">
                <el-input v-model="routeruleForm.icon"></el-input>
              </el-form-item>
              <el-form-item label="redirect" prop="redirect">
                <el-input v-model="routeruleForm.redirect"></el-input>
              </el-form-item>
              <el-form-item label="路径" prop="path">
                <el-input v-model="routeruleForm.path"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="子菜单" name="second">
            <!-- 子菜单 -->
            <el-form :model="routeruleForm" :rules="routerules" ref="routeref">
              <el-form-item label="菜单名" prop="navname">
                <el-input v-model="routeruleForm.navname"></el-input>
              </el-form-item>
              <el-form-item label="路由名" prop="name">
                <el-input v-model="routeruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="一级菜单" prop="parentid" class="tree">
                <!-- 路由树 -->
                <el-tree
                  :data="lytree"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                  ref="treeone"
                  :default-checked-keys="[1]"
                >
                </el-tree>
              </el-form-item>
              <el-form-item label="组件" prop="component">
                <el-input v-model="routeruleForm.component"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="icon">
                <el-input v-model="routeruleForm.icon"></el-input>
              </el-form-item>
              <el-form-item label="redirect" prop="redirect">
                <el-input v-model="routeruleForm.redirect"></el-input>
              </el-form-item>
              <el-form-item label="路径" prop="path">
                <el-input v-model="routeruleForm.path"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addroute">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "navname",
      },
      activeName: "first",
      dialogVisible: false,
      routeruleForm: {
        navname: "",
        name: "",
        component: "",
        path: "",
        icon: "",
        parentid: 0,
        redirect: "",
      },
      routelist: [],
      lytree: [],
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
    xzlu() {
      this.dialogVisible = true;
    },
    addroute() {
      this.$refs.routeref.validate(async (valid) => {
        const { data: res } = await this.$http.post("/nav", this.routeruleForm);
        console.log(res);
        if (res.status !== 0) return this.$message("新增失败");
        this.$message.success("新增成功");
        // 隐藏弹出框
        this.dialogVisible = false;
      });
    },
    //el-tab点击触发函数
    xzcf(tab, event) {
      console.log(tab, event);
      const treeid = this.$refs.treeone.getCheckedKeys();
      console.log(treeid);
      console.log(tab.index);
      if (tab.index === "1") {
        this.routeruleForm.parentid = treeid[0];
      } else {
        this.routeruleForm.parentid = 0;
      }
      console.log(this.routeruleForm.parentid);
    },

    async getroutelist() {
      const { data: res } = await this.$http.get("/nav/getroute");
      this.routelist = res.message;
      console.log(this.routelist);
      //处理路由，使之变成路由树结构
      const routtree = res.message.map((item) => {
        item.children = [];
        return item;
      });
      console.log(routtree);
      const routtreelist = [];
      routtree.forEach((item) => {
        routtree.forEach((item1) => {
          if (item1.parentid === item.id) {
            item.children.push(item1);
          }
        });
      });
      routtree.forEach((item) => {
        if (item.parentid === 0) {
          routtreelist.push(item);
        }
      });
      console.log(routtree);
      console.log(routtreelist);
      this.lytree = routtreelist;
      console.log(this.lytree);
      console.log(this.activeName);
    },
  },
  created() {
    this.getroutelist();
  },
};
</script>
<style scoped>
.addroute {
  margin-bottom: 30px;
}
.tree {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}
</style>