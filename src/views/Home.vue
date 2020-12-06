<template>
  <div class="home">
    <div class="header">
      <div class="logo">农业AI大脑</div>
      <div class="user">
        <el-dropdown style="display: block">
          <span class="el-dropdown-link logoBtn">
            {{userName}} <img src="../assets/u3.svg" alt="">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span class="changepwdBtn">
                <router-link :to="{name: 'personalDetails'}"><i class="el-icon-unlock"></i>个人信息</router-link>
              </span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span class="quit" @click="LogOut"><i class="el-icon-switch-button"></i>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span></span>
      </div>
    </div>
    <div class="main">
      <div class="aside">
        <ul class="menu">
          <li><router-link :to="{name: 'farmMap'}"><i class="el-icon-ship"></i>生产地图</router-link></li>
          <li><router-link :to="{name: 'soilManage'}"><i class="el-icon-ship"></i> 地块管理</router-link></li>
          <li><router-link :to="{name: 'farmMachinery'}"><i class="el-icon-box"></i> 农机管理</router-link></li>
          <li><router-link :to="{name: 'sfytj'}"><i class="el-icon-box"></i> 水肥一体机</router-link></li>
          <li><router-link :to="{name: 'wormMonitor'}"><i class="el-icon-box"></i> 虫情监测</router-link></li>
          <li><router-link :to="{name: 'personalDetails'}"><i class="el-icon-s-data"></i> 个人信息</router-link></li>
        </ul>

        <!--<el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#293255"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
        </el-menu>-->
      </div>
      <div class="content"><router-view /></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'Home',
  data () {
    return {
      userName:'黎英奇'
    }
  },
  mounted() {
    //this.userName = sessionStorage.getItem("loginName");
  },
  methods: {

    LogOut() {
      $.ajax({
        type: "post",
        url: "/logout",
        dataType: "json",
        success: (respMsg) => {
          if(respMsg.ret != 0){
            this.$message.error(respMsg.msg);
            return;
          }
          this.$router.push('/');
        },
        error: (data)=>{console.log(data);}
      });
    }
  }
}
</script>
<style scoped>
.home{
  width:100vw;
  height:100vh;
}
.header{
  height:65px;
  padding:0 20px;
  line-height:65px;
  color:#fff;
  background:#3670ff;
}
.logo{
  float:left;
  padding-left:1.5vw;
  font-size:24px;
  background:url("../assets/logo.png") no-repeat 0 center;
  background-size:auto 45%;
}
.logoBtn{
  display:flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
}
.logoBtn img{
  margin-left: 10px;
}
.el-dropdown-menu{
  margin: 0 !important;
}
.user{
  float:right;
  font-size:20px;
}
.user>.changepwdBtn{
  margin:0 10px;
  cursor:pointer;
}
.user>.quit{
  color:#fff;
  cursor:pointer;
}
.main{
  width:100%;
  height:calc(100% - 65px);
  background:#f0f3fa;
  display:flex;
  justify-content:space-between;
}
.aside{
  width:8.9%;
  background:#293255;
}
.menu>li{
  display:flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height:50px;
  text-align:center;
  line-height:50px;
}
.menu>li>a{
  display:flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width:100%;
  height:70%;
  color:#fff;
  font-size:1.85vh;
  border-radius: 10px;
}
.menu>li>a>i{
  margin-right: 5px;
}
.content{
  width:91%;
}
.menu>li>a.active{
  color:#fff;
  background:#3670ff
}
</style>
