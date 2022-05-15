<template>
  <div>
      {{$store.state.userinfo.username}}
        <button @click="updateinfo">修改信息</button>
  </div>

</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    methods:{
        updateinfo(){
            this.$store.dispatch('aupdate')
        }
    }
};
</script>
<style>
</style>