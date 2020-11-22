<template>
  <div class="shipInfo">
    <div class="title">农机管理</div>
    <div class="searchBox">
      <el-form :inline="true" label-position="right" class="demo-form-inline" label-width="85px">
        <el-form-item label="农机名称:">
          <el-input placeholder="请输入地块名称" prefix-icon="el-icon-search" v-model="farmMachineryName" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item label="使用时间:">
          <el-date-picker
            v-model="farmMachineryTimes"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期" style="width:380px">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="searchFarmMachinery">搜索</el-button>
        <el-button type="success" @click="changeFarmMachineryData('')">新增</el-button>
      </el-form>
    </div>
    <el-table :data="farmMachineryDatas" border style="width:98%;max-height:68vh">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="farmMachineryName" label="农机名称"></el-table-column>
      <el-table-column prop="farmMachineryType" label="型号编码"></el-table-column>
      <el-table-column prop="durableYears" label="使用年限"></el-table-column>
      <el-table-column prop="companies" label="所属公司"></el-table-column>
      <el-table-column prop="LastUseDate" label="最近使用日期">
        <template slot-scope="scope"><span v-if="scope.row.LastUseDate != null">{{formateDate(scope.row.LastUseDate)}}</span></template>
      </el-table-column>
      <el-table-column prop="recentUser" label="最近使用人"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="changeFarmMachineryData(scope.row.index)">编辑</el-button>
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
      :total="FarmMachineryTotal"
      @current-change="handleCurrPageChange">
    </el-pagination>

    <el-dialog :title="soilDialogTitle" :visible.sync="soilFlag" width="500px">
      <el-form ref="pwdForm" :model="soilForm" label-width="100px">
        <el-form-item label="农机名称">
          <el-input v-model="soilForm.farmMachineryName" placeholder="请输入农机名称"></el-input>
        </el-form-item>
        <el-form-item label="型号编码">
          <el-input v-model="soilForm.farmMachineryType" placeholder="请输入型号编码"></el-input>
        </el-form-item>
        <el-form-item label="使用年限">
          <el-input v-model="soilForm.durableYears" placeholder="请输入使用年限"></el-input>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="soilForm.companies" placeholder="请输入所属公司"></el-input>
        </el-form-item>
        <el-form-item label="最近使用日期">
          <el-date-picker
            v-model="soilForm.LastUseDate"
            type="datetime"
            placeholder="选择最近使用日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最近使用人">
          <el-input v-model="soilForm.recentUser" placeholder="请输入最近使用人"></el-input>
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
    name: 'farmMachinery',
    data () {
      return {
        farmMachineryDatas: [],
        FarmMachineryTotal: 0,
        farmMachineryName: "",
        currPageNum:1,
        farmMachineryTimes:"",
        soilDialogTitle:"",
        soilFlag:false,

        soilForm:{
          farmMachineryName:"",
          farmMachineryType:"",
          durableYears:"",
          companies:"",
          LastUseDate:"",
          recentUser:"",
        },
      }
    },
    beforeMount() {
      this.getFarmMachineryDatas(1);
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

      getFarmMachineryDatas(_pageNo) {
        $.ajax({
          type: "get",
          url: "/static/json/farmMachinery.json",
          dataType: "json",
          success: (data) => {
            this.farmMachineryDatas = data.data;
            this.FarmMachineryTotal = data.total;
          },
          error: (data) => {console.log(data)}
        });
      },
      searchFarmMachinery() {
        this.currPageNum = 1;
        this.getFarmMachineryDatas(1);
      },
      changeFarmMachineryData(num){
        this.soilFlag = true;
        if(num != ""){
          this.soilDialogTitle = "修改信息"
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
          this.soilDialogTitle = "新增农机"
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
                this.getFarmMachineryDatas(this.currPageNum);
              },
              error: (data) => {console.log(data)}
            });
          }
        });
      },
      handleCurrPageChange(val) {
        this.currPageNum = val;
        this.getFarmMachineryDatas(val);
      },
      submitSoil(){
        /*$.ajax({
          type: "get",
          url: "",//提交方法
          dataType: "json",
          success: (data) => {
            this.FarmMachineryDatas = data.data;
            this.FarmMachineryTotal = data.total;
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
