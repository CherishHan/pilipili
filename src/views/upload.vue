<template>
  <div class="up">
    <el-upload
      class="avatar-uploader el-upload--text"
      drag
      :show-file-list="false"
      action= "http://127.0.0.1:8081/upload"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
      :on-progress="uploadVideoProcess"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传视频文件，且不超过500MB</div>
      <el-progress v-if=this.upload.videoFlag
                   type="circle"
                   :percentage="this.upload.videoUploadPercent"
                   style="margin-top:30px;"></el-progress>
      <!--<el-button class="video-btn"-->
                 <!--slot="trigger"-->
                 <!--size="small"-->
                 <!--v-if="this.upload.isShowUploadVideo"-->
                 <!--type="primary">选取文件</el-button>-->
    </el-upload>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  export default{
    data(){
      return {
        upload:{
          uploadUrl: "http://127.0.0.1:8081/upload",
          videoFlag: false ,
          videoUploadPercent:"",
          isShowUploadVideo: false
        }
    };
    },
    methods:{
      beforeUploadVideo (file) {
        const isLt20M = file.size / 1024 / 1024 < 2000;
        // if (['video/mp4'].indexOf(file.type) == -1) {
        //   Message.error('请上传正确的视频格式');
        //   return false;
        // }
        if (!isLt20M) {
          Message.error('上传视频大小不能超过2000MB哦!');
          return false;
        }
 //       this.upload.isShowUploadVideo = false;
      },

      uploadVideoProcess (event, file, fileList) {
        this.upload.videoFlag = true;
        this.upload.videoUploadPercent = file.percentage.toFixed(0) * 1;
      },

      handleVideoSuccess (res, file) {
 //       this.upload.isShowUploadVideo = true;
        this.upload.videoFlag = false;
        this.upload.videoUploadPercent = 0;
        console.log("上传成功的回调。。。");
        // if (res.errorCode == "00") {
        //   this.global.company.showVideoPath = res.sprbody.urlAddress;
        //   // this.videoForm.showVideoPath = res.data.uploadUrl;
        // } else {
        //   this.$message.error('视频上传失败，请重新上传！');
        // }
      },
    }
  }
</script>

<style>
  .up{
    margin-top: 15%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .video-avatar {
    width: 400px;
    height: 200px;
  }
</style>
