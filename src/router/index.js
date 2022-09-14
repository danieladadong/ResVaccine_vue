import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import empList from '../views/common/emp'
import login from '../views/common/login'
import deptList from '../views/common/dept'
import wareHouseList from '../views/common/warehouse'
import pointList from '../views/common/points'
import noticeList from '../views/common/notice'
import vaccine from '../views/common/vaccine'
import vaccineList from '../views/common/vaccineList'
import vaccineListChild from '../views/common/vaccineListChild'
import myInfo from '../views/personal/myinfo'
import editMyInfo from '../views/personal/editmyinfo'
import editReserv from '../views/personal/editreservation'
import certificate from '../views/personal/certificate'
import chat from '../views/common/chat'
import echarts from '../views/common/echarts'
import host from '../views/common/host'
import system from '../components/system'
import updatePwd from '../views/personal/updatePwd'
import MyEmp from '../views/personal/myemp'
import NewsTrends from '../views/home/newstrends'
import EpideMic from '../components/epidemicmap'
import PwdManager from '../views/admin/pwdmanager'
import UserProfile from '../views/admin/userprofile'
import PointInfo from '../views/personal/pointinfo.vue'
import CertificateEcharts from '../views/admin/certificateecharts'
import VaccineEcharts from '../views/admin/vaccineecharts.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/system',
            name: 'system',
            component: system,
            children: [
                {
                    path: '/empList',
                    name: 'empList',
                    component: empList
                },
                {
                    path: '/deptList',
                    name: 'deptList',
                    component: deptList
                },
                {
                    path: '/wareHouseList',
                    name: 'wareHouseList',
                    component: wareHouseList
                },
                {
                    path: '/host',
                    name: 'host',
                    component: host
                },
                {
                    path: '/pointList',
                    name: 'pointList',
                    component: pointList
                },
                {
                    path: '/noticeList',
                    name: 'noticeList',
                    component: noticeList
                },
                {
                    path: "/vaccine",
                    name: "vaccine",
                    component: vaccine
                },
				{
				    path: "/vaccineList",
				    name: "vaccineList",
				    component: vaccineList
				},
                {
                    path: "/vaccineListChild",
                    name: "vaccineListChild",
                    component: vaccineListChild
                },
                {
                    path: "/echarts",
                    name: "echarts",
                    component: echarts
                },
                {
                    path:'/pwdManager',
                    name: 'pwdManager',
                    component: PwdManager
                },
                {
                    path:'/userprofile',
                    name:'userprofile',
                    component: UserProfile
                },
                {
                    path: "/pointinfo",
                    name:'pointinfo',
                    component: PointInfo
                },
                {
                    path: '/certificateecharts',
                    name: 'certificateecharts',
                    component: CertificateEcharts
                },
                {
                    path: '/vaccineecharts',
                    name: 'vaccineecharts',
                    component: VaccineEcharts
                }
            ]
        },
        {
            path: "/myinfo",
            name: "myinfo",
            component: myInfo,
            children: [
                {
                    path: "/editMyInfo",
                    name: "editMyInfo",
                    component: editMyInfo
                },
                {
                    path: "/editRes",
                    name: "editRes",
                    component: editReserv
                },
                {
                    path: "/certificate",
                    name: "certificate",
                    component: certificate
                },
                {
                    path: "/chat",
                    name: "chat",
                    component: chat
                },
                {
                    path: "/updatePwd",
                    name: "updatePwd",
                    component: updatePwd
                },
                {
                    path: "/myEmp",
                    name: "myEmp",
                    component: MyEmp
                },
            ]
        }, {
            path: "/",
            name: "index",
            component: Index
        },
        {
            path: "/index",
            name: "index",
            component: Index
        },
        {
            path: "/newstrends",
            name: "newstrends",
            component: NewsTrends
        },
        {
            path: '/epidemic',
            name: 'epidemic',
            component: EpideMic
        }
    ]
})