<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin:0; padding:0;}
ul,li{list-style:none;}
a{color:#000; text-decoration:none;}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/ 
::-webkit-scrollbar {width: 9px;height: 9px;}
/*定义滚动条轨道*/ 
::-webkit-scrollbar-track {
    background-color: transparent;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em
}
/*定义滑块 内阴影+圆角*/ 
::-webkit-scrollbar-thumb {
    background-color: #0093ff;
    background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.4) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.4) 75%,transparent 75%,transparent);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em
}
.el-tabs__nav{margin-left:50px}
.el-table{margin: 20px 20px 0; overflow-y:auto !important;}
.el-table td, .el-table th{padding:5px 0 !important;}
.el-form-item {margin-bottom: 8px !important;}
.el-pagination{display:flex; justify-content:center; margin:12px 0;}

.title{position:relative; padding:10px 20px;height:30px; font-weight:bold; line-height:30px; }
.title:before{position:absolute; top:0; bottom:0; left:0; margin:auto 0; content:""; width:3px; height:12px; background:#FF7c22;}
.searchBox{padding-left: 20px;}
.searchBox .el-input, .goodsSearch .el-input__inner{width:300px;}
.sourceInfo .el-tabs__content{background:#fff;}
.sourceInfo .el-tabs__header{background:#fff;}
.sourceInfo .el-form-item {margin-bottom: 20px !important;}
@media screen and (max-width: 1440px) {
  .el-table{margin:10px 15px 0;}
  .title{padding:5px 20px;}
}
</style>
