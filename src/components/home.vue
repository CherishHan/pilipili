<template>
   <div class="layout">
      <el-container direction="vertical">
        <el-header>
           <el-menu
              :default-active="upload.activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="1" style="float:right">
                <router-link to="/upload">投稿</router-link>
              </el-menu-item>
              <el-menu-item index="2" style="float:right">
               <router-link to="/" v-show="upload.isLogin" @click.native="logout">退出</router-link>
               <router-link to="/register" v-show="!upload.isLogin">注册</router-link>
              </el-menu-item>
              <el-menu-item index="3" style="float:right">
                <router-link to="/" v-show="upload.isLogin">{{upload.currentUser}}</router-link>
                <router-link to="/login" v-show="!upload.isLogin">登录</router-link>
              </el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
          <div class='parent' style="float: left">
          <div class='demo' style="width:320px;height:180px;margin-right: 20px">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions1">
            </video-player>
          </div>
          <div class='demo' style="width:320px;height: 180px;margin-right: 20px">
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions2">
            </video-player>
          </div>
          </div>
          <!--<el-button type="primary" @click="test">测试</el-button>-->
        </el-main>
        <el-footer></el-footer>
      </el-container>
   </div>
</template>

<script>
  import  '../../static/store'
  import 'videojs-flash'
  import 'videojs-contrib-hls'
  export default {
    data() {
      return {
        upload: {
          activeIndex: '1',
          activeIndex2: '1',
          isLogin: false,
          currentUser: ''
        },
        playerOptions1: {
          //播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          //如果true,浏览器准备好时开始回放。
          autoplay: true,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 导致视频一结束就重新开始。
          loop: false,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: 'auto',
          language: 'zh-CN',
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: '16:9',
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [{
            type: "video/x-flv",
            src: "https://mister-ben.github.io/videojs-flvjs/bbb.flv"
          }],
          techOrder: ['flash'],
          //你的封面地址
          poster: '',
          //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            //全屏按钮
            fullscreenToggle: true
          }
        },
        playerOptions2: {
          //播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          //如果true,浏览器准备好时开始回放。
          autoplay: true,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 导致视频一结束就重新开始。
          loop: false,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: 'auto',
          language: 'zh-CN',
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: '16:9',
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [{
            type: "rtmp/mp4",
            src: 'rtmp://58.200.131.2:1935/livetv/hunantv'
          }],
          techOrder: ['flash'],
          //你的封面地址
          poster: '',
          //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            //全屏按钮
            fullscreenToggle: true
          }
        }
    };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        console.log("logout");
        this.upload.isLogin = false;
        this.$store.commit("logout");
      },
      test(){
        this.$http.get("http://127.0.0.1:8081/user/test", {
          headers: {
            token: localStorage.getItem("token")
          }
        }).then(res => {
          console.log(res);
        })
      }
    },

    computed: {
    },
    created: function(){
        console.log(this.$store.getters.getIsLogin);
        console.log(this.$store.getters.getCurrentUser);
        this.upload.isLogin = this.$store.getters.getIsLogin;
        this.upload.currentUser = this.$store.getters.getCurrentUser;
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

  .demo{
    display: inline-grid;
  }

  /*demo{*/
    /*display: inline-block;*/
    /*width: 200px;*/
    /*height: 90px;*/
    /*text-align: center;*/
    /*line-height: 50px;*/
    /*border: 1px solid transparent;*/
    /*border-radius: 4px;*/
    /*overflow: hidden;*/
    /*background: #fff;*/
    /*position: relative;*/
    /*box-shadow: 0 1px 1px rgba(0, 0, 0, .2);*/
    /*margin-right: 4px;*/
  /*}*/

  /*.demo:hover{*/
    /*display: block;*/
  /*}*/

</style>

