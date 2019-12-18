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
            <el-form-item  prop="verify" class="verify">
              <!--<el-input type="text" name="imgCheckInfo" id="imgCheckInfo" placeholder="点击按钮进行验证">-->
                <!--<el-button icon="el-icon-search" circle @click="refreshImg"></el-button>-->
              <!--<el-button plain @click="refreshImg">朴素按钮</el-button>-->
              <el-button type="text" @click="refreshImg">点击按钮进行验证</el-button>
              <el-dialog
                :visible.sync="dialogVisible"
                width="30%" :show-close="false">

                <div class="img" id="dv">
                  <img id="showCheckImg" @mousedown="createMarker" :src="imgSrc"  alt="点互式验证"/>
                  <div v-for="(item, i) in checkClickNum">
                    <span @mousedown="cancelClick" :style="{'position': 'absolute', 'background': '#f30303', 'border-radius': '50%', 'display': 'inline-block', 'height': '20px', 'width': '20px', 'left': x[i], 'top': y[i]}">
                      <span style="display: block;  color: #FFFFFF; height: 20px; line-height: 20px; text-align: center">{{i + 1}}</span>
                    </span>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <i class="el-icon-refresh" style="float: left; font-size: 25px" @click="refreshImg"></i>
                  <el-button type="primary" @click="check">确 定</el-button>
                </span>
              </el-dialog>
              <!--</el-input>-->
            </el-form-item>
            <!--<div>-->
              <!--&lt;!&ndash;每点击一次拼接记录对应坐标&ndash;&gt;-->
              <!--&lt;!&ndash;<input name="imgCheckInfo" id="imgCheckInfo" type="text"></input>&ndash;&gt;-->
              <!--&lt;!&ndash;生成img图像&ndash;&gt;-->
              <!--<div class="img"  id="dv" >-->
                <!--<img id="showCheckImg" :src="imgSrc" alt="点互式验证"/>-->
                <!--&lt;!&ndash;生成刷新图标&ndash;&gt;-->
                <!--<i id="freshIcon"  @click="refreshImg">刷新</i>-->
              <!--</div>-->

              <!--&lt;!&ndash;输出提示信息&ndash;&gt;-->
              <!--<span class="pull-left" id="imgCheckText"></span>-->
            <!--</div>-->
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
        },
        checkClickNum: 0,
        imgSrc: "",
        dialogVisible: false,
        x: [],
        y: []
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.$apiConfig.loginUrl,
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
      },

      refreshImg: function () {
        this.checkClickNum = 0;
        this.x = [];
        this.y = [];
        this.$http.get(this.$apiConfig.verify.getImgUrl, {responseType: "arraybuffer"}).then((res) => {
          // let blob = new Blob([res.data], {type: "image/png"});
          // let url = URL.createObjectURL(blob);
          // console.log(url);
          // this.imgSrc = url;
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        }).then(data => {
          //图片地址 <img src='data' />
          this.imgSrc = data;
          console.log(data);
          this.dialogVisible = true;
        });
      },
      createMarker(e){
         let i = this.checkClickNum;
         this.x[i] = e.offsetX - 10 + "px";
         this.y[i] = e.offsetY - 10 + "px";
         console.log("x = " + this.x[i] + "; y = " + this.y[i]);
         this.checkClickNum++;
      },
      cancelClick(e){
         let num = e.srcElement.firstChild.data;
         this.x = this.x.filter((item, i) => i < num - 1);
         this.y = this.y.filter((item, i) => i < num - 1);
         this.checkClickNum = num - 1;
      },
      check(){
         let points = [];
         for(var i = 0; i < this.x.length; i++){
           var point = {};
           point.x = this.x[i];
           point.y = this.y[i];
           points.push(point);
         }
         console.log(points);
         console.log(JSON.stringify(points).toString())
         this.dialogVisible = false;

         // this.$http.post(this.$apiConfig.verify.checkImgUrl,
         //
         //   JSON.stringify(points).toString()
         //   // ,
         //   // {headers:{'Content-Type':'application/json'}}
         //   ).then((res) => {
         //     console.log("success");
         // });
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

#dv{
  position:relative;
  width:100%;
  height:100%;
  margin:0px auto;
}

.el-icon-refresh{
  position: relative;
  margin-left: auto;
}
#imgCheckInfo{display:none}
.img .marker{position:absolute;}
#showCheckImg{width:100%;height:100%}
#freshIcon{color:#3464ff;font-size: 1.5em}
#imgCheckText{font-size:0.6em;color:#ff4546}

</style>

<style lang="scss">
  .verify{
    .el-dialog{
      .el-dialog__header{
        padding: 0;
      }
      .el-dialog__body{
        padding: 0;
      }
    }
  }
</style>
