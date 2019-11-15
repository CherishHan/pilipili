<template>
   <div class="login-pili">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
		  <el-form-item label="账号" prop="name" size="mini">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="passwd">
		    <el-input type="password" v-model="ruleForm.passwd"></el-input>
		  </el-form-item>
		  <el-form-item> 
		    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
      </el-form>
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
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.login-pili {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: 100%;
}

</style>