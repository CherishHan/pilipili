<template>
   <div class="layout">
      <el-container direction="vertical">
        <el-header>
           <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="1" style="float:right">
                 <router-link to="/login" >登录</router-link>
              </el-menu-item>
            </el-menu>
        </el-header>
        <el-main></el-main>
        <el-footer></el-footer>
      </el-container>
   </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .layout{
    height: 100%;
    width: 100%;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px;
  }

  html,body,#app,.el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;
    width: 100%;
  }

 .el-menu-item{
    float: right
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>

