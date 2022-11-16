<template>
  <div>
    <el-menu-item v-for="item in lychildren" :key="item.id" :index="item.path" >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.navname }}</span>
      </template>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: "sidebaritem",
  props: {
    lychildren: Array,
  },
};
</script>
<style scoped>
</style>