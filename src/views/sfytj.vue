<template>
  <div class="shipInfo">
    <div class="title">水肥一体机</div>
    <div class="searchBox">
      <el-form :inline="true" label-position="right" class="demo-form-inline" label-width="85px">
        <el-form-item label="选择地块:">
          <el-select v-model="soilDatas.id" placeholder="请选择" @change="selectSoil">
            <el-option
              v-for="item in soilDatas"
              :key="item.id"
              :label="item.soilName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="sfytjContBox">
      <div class="controlEquipment">
        <div class="subheadText">控制设备</div>
        <div class="kzsbCont">
          <div class="kzsbContBox">
            <div>主泵（电磁阀）</div>
            <div>
              <el-switch
                v-model="mainPump"
                width="50"
                active-text="开"
                inactive-text="关">
              </el-switch>
              <i class="el-icon-time" style="vertical-align: middle;"></i>
            </div>
          </div>
          <div class="kzsbContBox">
            <div>搅拌机1</div>
            <div>
              <el-switch
                v-model="blender1"
                width="50"
                active-text="开"
                inactive-text="关">
              </el-switch>
              <i class="el-icon-time" style="vertical-align: middle;"></i>
            </div>
          </div>
          <div class="kzsbContBox">
            <div>搅拌机2</div>
            <div>
              <el-switch
                v-model="blender2"
                width="50"
                active-text="开"
                inactive-text="关">
              </el-switch>
              <i class="el-icon-time" style="vertical-align: middle;"></i>
            </div>
          </div>
          <div class="kzsbContBox">
            <div>施肥泵</div>
            <div>
              <el-switch
                v-model="fertilizerDrill"
                width="50"
                active-text="开"
                inactive-text="关">
              </el-switch>
              <i class="el-icon-time" style="vertical-align: middle;"></i>
            </div>
          </div>
          <div class="kzsbContBox">
            <div>水肥机</div>
            <div>
              <el-switch
                v-model="fatPump"
                width="50"
                active-text="开"
                inactive-text="关">
              </el-switch>
              <i class="el-icon-time" style="vertical-align: middle;"></i>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="subheadText">传感设备</div>
        <div class="sensingEquipment">
          <div class="sensingEquipmentCont" v-for="(item,index) in sensingEquipmentArr" :key="index">
            <p><i class="el-icon-odometer" style="vertical-align: middle;"></i>{{item.name}}</p>
            <p><span>{{item.num}}</span><i>{{item.unit}}</i></p>
            <p>{{item.time}}</p>
            <p><i class="el-icon-time" style="vertical-align: middle;"></i>历史数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import soilData from '/static/json/soil.json'
    import sensingEquipmentData from '/static/json/sensingEquipment.json'
    export default {
        name: "sfytj",
      data () {
        return {
          soilDatas: [],
          mainPump:undefined,
          blender1:undefined,
          blender2:undefined,
          fertilizerDrill:undefined,
          fatPump:undefined,
          sensingEquipmentArr:[],
        }
      },
      mounted() {
        this.getSoilDatas();
      },
      methods: {
        getSoilDatas(){
          this.soilDatas = soilData.data;
        },
        selectSoil(){
          this.getSensingEquipmentData();
        },
        getSensingEquipmentData(){
          this.sensingEquipmentArr = sensingEquipmentData.data;
        }
      }
    }
</script>

<style scoped>
.shipInfo{
  padding: 0 10px;
}
.sfytjContBox{
  width: 100%;
}
.subheadText{
  margin-top: 5px;
  margin-bottom: 10px;
  border-left: 2px solid #3670ff;
  padding-left: 10px;
  height: 20px;
}
.kzsbCont{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.kzsbCont .kzsbContBox{
  width: 24%;
  height: 50px;
  margin-left: 5%;
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #9b9b9b;
  border-radius: 4px;
  font-size: 17px;
}
.sensingEquipment{
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  width: 100%;
  height: 330px;
  padding-bottom: 20px;
  overflow-y: auto;
}
.sensingEquipment .sensingEquipmentCont{
  height: 210px;
  width: 15%;
  margin-top: 15px;
  border-radius: 2px;
  border: 1px solid #9b9b9b;
  margin-left: 6%;
  position: relative;
}
.sensingEquipmentCont>p:first-of-type{
  text-align: center;
  height: 35px;
  line-height: 35px;
  background-color: #676a87;
  color: #fff;
}
.sensingEquipmentCont>p:last-of-type{
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #b9b9b9;
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.sensingEquipmentCont>p:nth-of-type(2){
  position: absolute;
  top: 25%;
  width: 100%;
  text-align: center;
}
.sensingEquipmentCont>p:nth-of-type(2)>span{
  font-size: 32px;
  font-weight: bold;
  color: #00aeef;
}
.sensingEquipmentCont>p:nth-of-type(2)>i{
  color:#9b9b9b;
  vertical-align: top;
  font-size: 18px;
}
.sensingEquipmentCont>p:nth-of-type(3){
  position: absolute;
  bottom: 36px;
  left: 0;
  height: 30px;
  line-height: 30px;
  text-align: right;
  width: 96%;
  font-size: 14px;
  color: #b9b9b9;
}
</style>
