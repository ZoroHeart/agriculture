<template>
    <div class="containerBox">
      <div id="mapConts" class="mapConts"></div>
      <div></div>
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
        $.ajax({
          type: "get",
          url: "/static/json/mapFillData.json",
          dataType: "json",
          success: (data) => {
            let polygonData = data.data;
            for(let i=0;i<polygonData.length;i++){
              let path = polygonData[i].gpsData;
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
              marker.setMap(this.map);
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
