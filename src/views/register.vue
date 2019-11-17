<template>
   <div class="register-pili">
     <div class="register-log">
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <el-form-item label="昵称" prop="name">
           <el-input v-model="ruleForm.name" placeholder="昵称"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="pass">
           <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"></el-input>
         </el-form-item>
         <el-form-item label="确认密码" prop="checkPass">
           <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
         </el-form-item>
         <el-form-item label="邮箱" prop="email">
           <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
         </el-form-item>
         <el-form-item label="手机号" prop="telephone">
           <el-input v-model="ruleForm.telephone" placeholder="手机号"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
           <router-link to = '/login'>已有账号，直接登录</router-link>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>

<script>
  import { Message } from 'element-ui';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          pass: '',
          checkPass: '',
          email: '',
          telephone: '',
        },
        rules: {
          name: [
            { required: true, message: '昵称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          telephone: [
            { required: true, message: '手机号', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      register(){
        this.$http.post("http://127.0.0.1:8081/user/register",
          {
            name: this.ruleForm.name,
            account: {
              credentials: this.ruleForm.pass,
              name: this.ruleForm.telephone
            },
            email: this.ruleForm.email
          }).then(function (res) {
            console.log(res);
            if(res.data.success){
              Message.success(res.data.message)
            }else{
              Message.error(res.data.message);
            }
        })
      }
    }
  }
</script>

<style scoped>
  .register-pili {
    width: 100%;
    height: 100%;
    background-size:100% 100%;
  }

  .register-log{
    position: absolute;
    margin-top: 200px;
    left: 40%;
  }
</style>
