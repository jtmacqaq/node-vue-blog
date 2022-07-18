<template>
  <div>
    <el-card class="box-card">
      <el-table :data="userinfolist" style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="user_pic" label="头像">
        <template slot-scope="scope">
            <el-avatar :src="scope.row.user_pic"></el-avatar>

        </template>
        </el-table-column>
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
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page_num"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </el-card>
    <!-- 弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-checkbox-group v-model="addroleinfo.roleid" @change="changerole">
        <el-checkbox
          v-for="item in checkList"
          :label="item.id"
          :key="item.id"
          >{{ item.rolename }}</el-checkbox
        >
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addrole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      userinfolist: [],
      count: null,
      page_num: 1,
      page_size: 10,
      rolelist: [],
      dialogVisible: false,
      checkList: [],

      addroleinfo: {
        userid: null,
        roleid: [], //选中的值
      },
    };
  },
  methods: {
    async getuserinfolist() {
      const { data: res } = await this.$http.get("/my/userinfolist", {
        params: {
          page_num: this.page_num,
          page_size: this.page_size,
        },
      });
      console.log(res);
      this.userinfolist = res.message.rows;
      this.count = res.message.count;
    },
    //获取全部角色
    async getrolelist() {
      const { data: res } = await this.$http.get("/role/getrole");
      console.log(res);
      this.checkList = res.message;
      console.log(this.checkList);
    },
    changerole(val) {
      this.addroleinfo.roleid = val;
      console.log(this.addroleinfo.roleid);
    },
    handleSizeChange(newsize) {
      console.log(newsize);
      this.page_size = newsize;
      this.getuserinfolist();
    },
    handleCurrentChange(newnum) {
      console.log(newnum);
      this.page_num = newnum;
      this.getuserinfolist();
    },
    //分配角色函数
    async editorrole(userid) {
      this.addroleinfo.userid = userid;
      console.log("dianji");
      this.dialogVisible = true;
    },
    //添加角色
    async addrole() {
      console.log("点击了确定");
      console.log(this.addroleinfo.roleid)
    //   const addroleinfo = qs.stringify(this.addroleinfo);
      console.log(this.addroleinfo)
      const { data: res } = await this.$http.post("/role/assignroles",this.addroleinfo);
      console.log(res);
    },  
  },
  created() {
    this.getuserinfolist();
    this.getrolelist();
  },
};
</script>
<style scoped>
</style>