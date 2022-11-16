<template>
  <div>
    <el-card>
      <el-button type="primary" class="addrole">新增角色</el-button>
      <el-table style="width: 100%" :data="rolelist">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="角色" width="180">
        </el-table-column>

        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-button type="primary" @click="opennav(scope.row.id)">
              菜单分配
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delectlist(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹出框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
          <el-checkbox-group v-model="routeroleinfo.routesid" @change="changeroute">
        <el-checkbox
          v-for="item in routelist"
          :label="item.id"
          :key="item.id">
          {{ item.navname }}
          </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addnav"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rolelist: [],
      routelist: [],
      dialogVisible:false,
      routeroleinfo:{
          roleid:null,
          routesid:[]
      }
    };
  },
  methods: {
    async getrolelist() {
      const { data: res } = await this.$http.get("/role/getrole");
      this.rolelist = res.message;
      console.log(this.rolelist);
    },
    async opennav(roleid){
        this.dialogVisible = true
        this.routeroleinfo.roleid = roleid
        const {data:res} = await this.$http.get(`/nav/getrouterlist/${roleid}`)
        console.log(res)
        const routerolelist = []
        res.message.forEach(item => {
          routerolelist.push(item.routesid)
        });
       console.log(routerolelist)
       this.routeroleinfo.routesid = routerolelist
    },
    async getroutelist() {
      const { data: res } = await this.$http.get("/nav/getroute");
      this.routelist = res.message;
      console.log(this.routelist);
    },
    changeroute(val){
        console.log(val)
        this.routeroleinfo.routesid = val

    },
    async addnav(){
        const {data:res} = await this.$http.post('/nav/addnav',this.routeroleinfo)
        console.log(res)


    }
  },
  created() {
    this.getrolelist(),
    this.getroutelist()
  },
};
</script>
<style scoped>
.addrole {
  margin-bottom: 30px;
}
</style>