<template>
   <div class="login-pili">
     <div class="login-log">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="login-box">
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item  prop="name">
              <el-input v-model="ruleForm.name" placeholder="你的手机号/邮箱"></el-input>
            </el-form-item>
            <el-form-item  prop="passwd">
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
  import { Message } from 'element-ui';
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
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://127.0.0.1:8081/user/login',
            {
              username: this.ruleForm.name,
              password: this.ruleForm.passwd
            }
            ).then(function (res) {
              if(res.data.status === "success"){
                Message.success(res.data.message);
                console.log(res);
                console.log(res.headers.authorization);
                localStorage.setItem("token", res.headers.authorization);
                _this.$store.commit('setIsLogin', true);
                _this.$store.commit('setCurrentUser', _this.ruleForm.name);
                _this.$router.push('/');
              }else{
                Message.error(res.data.message);
              }
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
  position: relative;
}
.login-log{
  position: absolute;
  margin-top: 80px;
  left: 40%;  /* 还要再向左挪回宽度的一半 */
}

.login-box{
  border: 1px solid #DCDFE6;
  width: 300px;
  margin: 120px auto;
  padding: 35px 60px 15px 0;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-box-shadow: 0 0 25px #909399;
  -moz-box-shadow: 0 0 25px #909399;
  box-shadow: 0 0 25px #909399;
  background-color: #FFF;
}

.login-title{
  text-algin:center;
  margin: 0 auto 40px 60px;
  color: #303133;
}

</style>
