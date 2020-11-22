<template>
  <div class="shipInfo">
    <div class="title">地块管理</div>
    <div class="searchBox">
      <el-form :inline="true" label-position="right" class="demo-form-inline" label-width="85px">
        <el-form-item label="地块名称:">
          <el-input placeholder="请输入地块名称" prefix-icon="el-icon-search" v-model="soilName" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item label="种植作物:">
          <el-input placeholder="请输入种植作物名称" prefix-icon="el-icon-search" v-model="soilName" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item label="负责人:">
          <el-input placeholder="请输入负责人" prefix-icon="el-icon-search" v-model="soilName" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item label="起止时间:">
          <el-date-picker
            v-model="soilTimes"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" style="width:380px">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="searchSoil">搜索</el-button>
        <el-button type="success" @click="changeSoilData('')">新增</el-button>
      </el-form>
    </div>
    <el-table :data="soilDatas" border style="width:98%;max-height:68vh">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="soilName" label="地块名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope"><span v-if="scope.row.createTime != null">{{formateDate(scope.row.createTime)}}</span></template>
      </el-table-column>
      <el-table-column prop="growPlants" label="种植作物"></el-table-column>
      <el-table-column prop="LandManager" label="地块负责人"></el-table-column>
      <el-table-column prop="associatedDevice" label="已关联设备"></el-table-column>
      <el-table-column prop="associatedCamera" label="已关联摄像头"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="changeSoilData(scope.row.index)">编辑</el-button>
          <el-button
            type="text"
            size="mini"
            @click="DeleteSoil(scope.row.sid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :current-page.sync='currPageNum'
      :total="soilTotal"
      @current-change="handleCurrPageChange">
    </el-pagination>

    <el-dialog :title="soilDialogTitle" :visible.sync="soilFlag" width="500px">
      <el-form ref="pwdForm" :model="soilForm" label-width="100px">
        <el-form-item label="地块名称">
          <el-input v-model="soilForm.soilName" placeholder="请输入地块名称"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="soilForm.createTime"
            type="datetime"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="种植作物">
          <el-input v-model="soilForm.growPlants" placeholder="请输入种植作物"></el-input>
        </el-form-item>
        <el-form-item label="地块负责人">
          <el-input v-model="soilForm.LandManager" placeholder="请输入地块负责人"></el-input>
        </el-form-item>
        <el-form-item label="已关联设备">
          <el-input v-model="soilForm.associatedDevice" placeholder="请输入已关联设备"></el-input>
        </el-form-item>
        <el-form-item label="已关联摄像头">
          <el-input v-model="soilForm.associatedCamera" placeholder="请输入已关联摄像头"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="soilFlag = false">取 消</el-button>
        <el-button type="primary" @click="submitSoil">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'soilManage',
  data () {
    return {
      soilDatas: [],
      soilTotal: 0,
      soilName: "",
      currPageNum:1,
      soilTimes:"",
      soilDialogTitle:"",
      soilFlag:false,

      soilForm:{
        soilName:"",
        createTime:"",
        growPlants:"",
        LandManager:"",
        associatedDevice:"",
        associatedCamera:"",
      },
    }
  },
  beforeMount() {
    this.getSoilDatas(1);
  },
  methods: {
    formateDate(timestamp){
      var date = new Date(timestamp);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      return y + '-' + m + '-' + d+' '+h+':'+minute;
    },

    getSoilDatas(_pageNo) {
      $.ajax({
          type: "get",
          url: "/static/json/soil.json",
          dataType: "json",
          success: (data) => {
            this.soilDatas = data.data;
            this.soilTotal = data.total;
          },
          error: (data) => {console.log(data)}
      });
    },
    searchSoil() {
      this.currPageNum = 1;
      this.getSoilDatas(1);
    },
    changeSoilData(num){
      this.soilFlag = true;
      if(num != ""){
        this.soilDialogTitle = "修改地块"
        $.ajax({
          type: "get",
          url: "",//修改-按id查询详细信息
          dataType: "json",
          success: (data) => {
            console.log(data);
            this.soilForm = data;
          },
          error: (data) => {
            console.log(data);
            this.$message({
              showClose: true,
              message: '未查询到相关信息',
              type: 'error'
            });
          }
        });
      }else{
        this.soilDialogTitle = "添加地块"
      }

    },
    DeleteSoil(_sid) {
      this.$alert('是否删除此条数据？', {
        confirmButtonText: '确定',
        callback: action => {
          $.ajax({
            type: "post",
            url: "/ship/del?sid="+_sid,
            dataType: "json",
            success: (data) => {
              if(data.ret !=0){
                this.$message({type: 'warning', message: data.msg});
                return;
              }
              this.$message({type: 'info', message: `删除成功！`});
              this.getSoilDatas(this.currPageNum);
            },
            error: (data) => {console.log(data)}
          });
        }
      });
    },
    handleCurrPageChange(val) {
      this.currPageNum = val;
      this.getSoilDatas(val);
    },
    submitSoil(){
      /*$.ajax({
        type: "get",
        url: "",//提交方法
        dataType: "json",
        success: (data) => {
          this.soilDatas = data.data;
          this.soilTotal = data.total;
        },
        error: (data) => {console.log(data)}
      });*/
    }
  }
}
</script>
<style scoped>
.shipInfo{height:100%;background:#fff;}
</style>
