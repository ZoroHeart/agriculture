<template>
  <div class=login>
    <img src="../assets/bg.png" style="display:block;width:100%; height:100%;" />
    <div class="main">
      <div class="pic">
        <img src="../assets/hsta.png" />
        <img src="../assets/computer.png" />
      </div>
      <form>
        <h3>农业AI大脑</h3>
        <div>
          账 号<br><el-input placeholder="请输入账户" v-model="name" clearable></el-input>
        </div>
        <div>
          密 码<br><el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
        <div class="loginBtn">
          <div @click="login">登录</div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      $.ajax({
        type: "post",
        url: "/dologin?loginName="+this.name+"&pwd="+this.password,
        dataType: "json",
        success: (respMsg) => {
          if(respMsg.ret != 0){
            this.$message.error(respMsg.msg);
            return;
          }
          sessionStorage.setItem("loginName", this.name);
          this.$router.push('/home/sourceInfo');
          this.name = '';
          this.password = '';
        },
        error: (data)=>{console.log(data);}
      });
    }
  }
}
</script>
<style scoped>
.login{width:100%; height:100vh;position:relative;}
.main{position:absolute; top:0; bottom:0; left:0; right:0; margin:auto; width:72%; height:77%; background:#fff;}
.pic{float:left;width:60%; height:100%; background:#f7f7f7; position:relative;}
.pic>img:first-child{position:absolute; top:50px; left:50px;}
.pic>img:last-child{position:absolute; top:0; bottom:0; left:0; right:0; margin:auto;}
form{float:right;width:40%; height:100%; padding:15vh 0; box-sizing: border-box; display:flex; flex-direction: column; justify-content: space-evenly; align-items: center;}
form>h3{font-size:2vw; color:#403e56;}
form>div{width:75%;margin:0 auto; font-size:18px;}
form>div>input{width:100%; height:45px; font-size:18px;}
.loginBtn>div{width:100%; height:45px; background:#3d55ff; color:#fff; font-size:18px; text-align:center; line-height:45px; cursor:pointer;}
</style>
