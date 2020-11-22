<template>
    <div class="personalDataBox">
      <div class="personalDataTitle">个人资料</div>
      <div class="personalDataCont">
        <div class="personalImg">
          <div class="personalImgBox"><img src="../assets/u3.svg" alt=""></div>
          <div class="personalImgUpdate">
            <el-upload class="upload-demo" action="" :on-preview="handlePreview">
              <button class="touxiangbtn">修改头像</button>
              <div class="headBtnTip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </div>
        <div class="personalText">
          <div>您好，{{userName}}</div>
          <el-form :inline="true" label-position="left" class="demo-form-inline" label-width="100px">
            <el-form-item label="当前职务:"><div style="width: 200px"></div></el-form-item>
            <el-form-item label="所属单位:"><div style="width: 200px"></div></el-form-item>
          </el-form>
          <el-form :inline="true" label-position="left" class="demo-form-inline" label-width="100px">
            <el-form-item label="上次登录:"><div style="width: 200px"></div></el-form-item>
            <el-form-item label="所属党组织:"><div style="width: 200px"></div></el-form-item>
          </el-form>
          <el-form :inline="true" label-position="left" class="demo-form-inline" label-width="100px">
            <el-form-item label="党内职务:"><div style="width: 200px"></div></el-form-item>
            <el-form-item label="任职地区:"><div style="width: 200px"></div></el-form-item>
          </el-form>
        </div>
      </div>

      <div class="personalDataTitle" style="margin-top: 60px">账号信息</div>
      <div class="accountCont">
        <div class="accountList">
          <div class="accountImg"><img src="../assets/u836.svg" alt=""></div>
          <div class="accountState">
            <p>登陆密码</p>
            <p>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全</p>
          </div>
          <div class="updateTime">上次修改时间：2019-06-18</div>
          <div class="passwordBtnCss"><el-button type="primary" @click="dialogChangePwd=true">修改密码</el-button></div>
        </div>
        <div class="accountList">
          <div class="accountImg"><img src="../assets/u837.svg" alt=""></div>
          <div class="accountState">
            <p>手机绑定</p>
            <p>可以用作登录、找回密码及其它安全保护！</p>
          </div>
          <div class="updateTime">187****0017</div>
          <div class="passwordBtnCss"><el-button type="primary" @click="dialogChangePhone=true">更换手机</el-button></div>
        </div>
      </div>

      <el-dialog title="修改密码" :visible.sync="dialogChangePwd" width="500px">
        <el-form ref="pwdForm" :model="pwdForm" label-width="100px">
          <el-form-item label="旧密码">
            <el-input v-model="oldPassword" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="newPassword" placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChangePwd = false">取 消</el-button>
        <el-button type="primary" @click="handleClickChangePwd">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog title="更换手机号" :visible.sync="dialogChangePhone" width="500px">
        <el-form ref="phoneForm" :model="phoneForm" label-width="100px">
          <el-form-item label="原电话号码">
            <el-input v-model="oldPhone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="新电话号码">
            <el-input v-model="newPhone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="新电话验证码">
            <el-input style="width: 220px;" v-model="AuthCode" placeholder="请输入验证码"></el-input>
            <el-button type="primary" @click="">获取验证码</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChangePwd = false">取 消</el-button>
        <el-button type="primary" @click="updatePhone">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
      name: "personalDetails",
      data () {
        return {
          userName:'黎英奇',
          dialogChangePwd:false,
          oldPassword:'',
          newPassword:'',
          dialogChangePhone:false,
          pwdForm:undefined,
          phoneForm:undefined,
          oldPhone:'',
          newPhone:'',
          AuthCode:'',
        }
      },
      mounted() {
        //this.userName = sessionStorage.getItem("loginName");
      },
      methods: {
        handleClickChangePwd() {
          $.ajax({
            type: "post",
            url: "/user/change-pwd?oldPwd=" + this.oldPassword + "&newPwd=" + this.newPassword,
            dataType: "json",
            success: (respMsg) => {
              if (respMsg.ret != 0) {
                this.$message.error(respMsg.msg);
                return;
              }
              this.$message({type: 'success', message: '密码修改成功!'});
              this.dialogChangePwd = false;
            },
            error: (data) => {
              console.log(data);
            }
          });
        },
        updatePhone(){

        }
      }
    }
</script>

<style scoped>
.personalDataBox{
  width: 100%;
  height: 100%;
}
.personalDataTitle{
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.personalDataCont{
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
  width: 100%;
  margin-top: 50px;
}
.personalImg{
  width: 20%;
}
.personalImg>.personalImgBox{
  width: 100%;
  text-align: center;
}
.personalImg>.personalImgBox>img{
  width: 50%;
}
.personalImgUpdate{
  width: 100%;
}
.personalImgUpdate .upload-demo{
  width: 100%;
  text-align: center;
}
.personalImgUpdate .touxiangbtn{
  width: 150px;
  height: 30px;
  border: 1px solid #666;
  border-radius: 5px;
  margin-top: 10px;
}
.personalImgUpdate .headBtnTip{
  font-size: 12px;
  width: 100%;
  text-align: center;
}
.accountCont{
  width: 100%;
}
.accountCont .accountList{
  width: 100%;
  height: 100px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
.accountCont .accountList>.accountImg{
  width: 13%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.accountCont .accountList>.accountState{
  width: 37%;
}
.accountCont .accountList>.accountState>p:last-of-type{
  font-size: 14px;
  color: #AAAAAA;
}
.accountCont .accountList>.updateTime{
  width: 30%;
  color: #70B603;
}
.accountCont .accountList>.passwordBtnCss{
  width: 19%;
}
</style>
