<template>
    <div class="containerBox">
      <div id="mapConts" class="mapConts"></div>
      <div></div>
      <el-dialog title="地块详情" :visible.sync="open" width="500px">
        <div>
          <p>作物名称：玉米</p>
          <p>种植时间：2020-04-05 12:20:36</p>
          <p>水肥作业进度：3次施肥</p>
          <p>预计收割时间：2020-10-20 16:20:36</p>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import $ from 'jquery';
  import riverIcon from '../assets/riverIcon.png'
  export default {
    name: "farmMap",
    data () {
      return {
        map:undefined,
        satellite:undefined,
        open:false,
      }
    },
    mounted() {
      this.showMap();
      this.getPolygonData();
    },
    methods: {
      /* 地图 */
      showMap(){
        this.map = new AMap.Map('mapConts', {
          center:[114.514311,30.64943],
          zoom:16,//级别
        });
        this.satellite = new AMap.TileLayer.Satellite({
          map: this.map,
        });
      },
      getPolygonData(){
        let that = this;
        $.ajax({
          type: "get",
          url: "/static/json/mapFillData.json",
          dataType: "json",
          success: (data) => {
            let polygonData = data.data;
            for(let i=0;i<polygonData.length;i++){
              let path = polygonData[i].gpsData;
              let soilName = polygonData[i].soilName;
              let polygonColor = "";
              if(i%2 == 0){
                polygonColor = "rgba(234,95,185,0.4)"
              }else{
                polygonColor = "rgba(90,148,189,0.4)"
              }
              let polygon = new AMap.Polygon({
                path: path,
                fillColor: polygonColor, // 多边形填充颜色
                borderWeight: 2, // 线条宽度，默认为 1
                strokeColor: '#312688', // 线条颜色
              });
              this.map.add(polygon);

              let marker = new AMap.Marker({
                icon: riverIcon,
                position: polygonData[i].centerGps,
                offset: new AMap.Pixel(-10, -30)
              });
              marker.setLabel({
                offset: new AMap.Pixel(-5, -5),  //设置文本标注偏移量
                content: "<div class='info'>"+soilName+"</div>", //设置文本标注内容
                direction: 'top' //设置文本标注方位
              });
              marker.setMap(this.map);
              marker.on('click', function (e) {
                that.open = true;
              });
            }
          },
          error: (data) => {console.log(data)}
        });
      }
    }
  }
</script>

<style scoped>
.containerBox{
  width: 100%;
  height: 100%;
  position: relative;
}
.containerBox .mapConts{
  width: 100%;
  height: 100%;
}
</style>
