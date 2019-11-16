<template>
   <div class="login-pili">
     <div class="login-log">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
        <el-form-item label="账号" prop="name" size="mini">
          <el-input v-model="ruleForm.name" placeholder="你的手机号/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input type="password" v-model="ruleForm.passwd" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
        </el-form>
     </div>
   </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          passwd: ''
        },
        rules: {
          name: [
            { required: true, message: '请填写账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://127.0.0.1:9090/user',
            {
              name: this.ruleForm.name,
              password: this.ruleForm.passwd
            }
            ).then(function (res) {
              console.log(res.data);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },

    register(){
        this.$router.push({path:'/register'});
      } 
    }
  }
</script>

<style scoped>
.login-pili {
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/timg.jpg);
  background-size:100% 100%;

}
.login-log{
  position: absolute;
  margin-top: 300px;
  left: 40%;  /* 还要再向左挪回宽度的一半 */
}

</style>
