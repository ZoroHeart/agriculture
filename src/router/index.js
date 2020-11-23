import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  // mode: 'history',  //去掉url中的#
  linkActiveClass: 'active',
  routes: [
    /*{
      path: '/',
      name: '/',
      redirect: '/login' //会把url重新指向/login ；
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },*/
    {
      path: '/',
      name: '/',
      redirect: '/home' //会把url重新指向/login ；
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      children: [
        {
          path: '/home/farmMap',//地图
          name: 'farmMap',
          component: resolve => require(['../views/farmMap.vue'],resolve)
        },
        {
          path: '/home/soilManage',//地块管理
          name: 'soilManage',
          component: resolve => require(['../views/soilManage.vue'],resolve)
        },{
          path: '/home/farmMachinery',//农机管理
          name: 'farmMachinery',
          component: resolve => require(['../views/farmMachinery.vue'],resolve)
        },
        {
          path: '/home/personalDetails',//个人信息
          name: 'personalDetails',
          component: resolve => require(['../views/personalDetails.vue'], resolve)
        },
      ]
    }
  ]
})
