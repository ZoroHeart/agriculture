<template>
  <div class="shipInfo">
    <div class="title">虫情监测</div>
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
        <el-form-item label="选择设备:">
          <el-select v-model="facilityDatas.id" placeholder="请选择" @change="selectFacility">
            <el-option
              v-for="item in facilityDatas"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="cqjcCont">
      <div class="cqjcImg">
        <div class="demo-image__preview">
          <el-image
            style="width:100%"
            :src="wormImgUrl"
            :preview-src-list="wormImgUrl">
          </el-image>
        </div>
      </div>
      <div class="cqjcMessage">
        <div class="cqjcMessageTop">
          <div>
            <img src="../assets/1607266397(1).png" alt="">
            <p>未分析</p>
          </div>
          <div>
            <img src="../assets/1607266460(1).png" alt="">
            <p>未分析</p>
          </div>
          <div>
            <img src="../assets/1607266669(1).png" alt="">
            <p>未分析</p>
          </div>
          <div>
            <img src="../assets/1607266397(1).png" alt="">
            <p>未分析</p>
          </div>
        </div>
        <div class="cqjcMessageCenter">
          <div class="cqjcCenterLeft">
            <el-form label-width="50px">
              <el-form-item label="类别">
                <el-input v-model="wormType"></el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="50px">
              <el-form-item label="成虫">
                <el-input v-model="wormType" style="width:90px;padding-right:10px;"></el-input>个
              </el-form-item>
            </el-form>
            <el-form label-width="50px">
              <el-form-item label="幼虫">
                <el-input v-model="wormType" style="width:90px;padding-right:10px;"></el-input>个
              </el-form-item>
            </el-form>
          </div>
          <div class="cqjcCenterCont">
            <p>+</p>
            <p>-</p>
          </div>
          <div class="cqjcCenterRight"></div>
        </div>
        <div class="cqjcMessageBottom">
          <div class="cqjcMessageBottomLeft">
            <el-form label-width="90px" label-position="left">
              <el-form-item label="计数人">
                <el-input v-model="wormType"></el-input>
              </el-form-item>
            </el-form>
            <el-form label-width="90px" label-position="left">
              <el-form-item label="世间">
                <el-input v-model="wormType" style="width:90px;padding-right:10px;"></el-input>个
              </el-form-item>
            </el-form>
            <el-form label-width="90px" label-position="left">
              <el-form-item label="审核(专家)">
                <el-input v-model="wormType" style="width:90px;padding-right:10px;"></el-input>个
              </el-form-item>
            </el-form>
            <el-form label-width="90px" label-position="left">
              <el-form-item label="确认时间">
                <el-input v-model="wormType" style="width:90px;padding-right:10px;"></el-input>个
              </el-form-item>
            </el-form>
          </div>
          <div class="cqjcMessageBottomRight">
            <p><el-button type="primary">自动识别</el-button></p>
            <p><el-button type="primary">确定</el-button></p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import soilData from '/static/json/soil.json'
  import cqjcData from '/static/json/cqjc.json'
  import wormImg from '../assets/1607266397(1).png'
  export default {
    name: "wormMonitor",
    data () {
      return {
        soilDatas: [],
        facilityDatas: [],
        wormImgUrl:wormImg,
        wormType:""
      }
    },
    mounted() {
      this.getSoilDatas();
      this.getFacilityDatas();
    },
    methods: {
      getSoilDatas(){
        this.soilDatas = soilData.data;
      },
      getFacilityDatas(){
        this.facilityDatas = cqjcData.data;
      },
      selectFacility(){

      }
    }
  }
</script>

<style scoped>
.shipInfo{
  padding: 10px;
}
.cqjcCont{
  width: 100%;
  height:560px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.cqjcCont .cqjcImg{
  width: 65%;
  height: 100%;
  overflow:hidden;
}
.cqjcCont .cqjcMessage{
  width: 32%;
  height: 100%;
  border: 1px solid #9b9b9b;
  overflow-y: auto;
}
.cqjcMessage .cqjcMessageTop{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.cqjcMessage .cqjcMessageTop>div{
  width: 30%;
  margin: 10px 10%;
}
.cqjcMessage .cqjcMessageTop>div>img{
  width: 100%;
}
.cqjcMessage .cqjcMessageTop>div>p{
  text-align: center;
}

.cqjcMessageCenter{
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.cqjcMessageCenter .cqjcCenterLeft{
  width: 40%;
  border: 1px solid #9b9b9b;
}
.cqjcMessageCenter .cqjcCenterCont{
  width: 10%;
  text-align: center;
}
.cqjcMessageCenter .cqjcCenterCont>p{
  width: 36px;
  height: 36px;
  line-height: 40px;
  border-radius: 20px;
  font-size: 20px;
  background-color: #0a6cd6;
  color: #fff;
  margin: 60% auto 0 auto;
}
.cqjcMessageCenter .cqjcCenterRight{
  width: 44%;
  border: 1px solid #9b9b9b;
}
.cqjcMessageBottom{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin: 20px 0;
}
.cqjcMessageBottom .cqjcMessageBottomLeft{
  width: 65%;
}
.cqjcMessageBottom .cqjcMessageBottomRight>p{
  margin-top: 30%;
}
</style>
