const userMenu = [
  {
    name: '疫苗预约',
    path: '',
    children: [
      {
        name: '成人疫苗',
        path: 'vaccineList',
      },
      {
        name: '儿童疫苗',
        path: 'vaccineListChild',
      },
    ]
  },
  {
    name: '接种点详情',
    path: 'pointinfo',
    children: [
    ]
  }
]
const user = [
  {
    name: '基本信息',
    path: 'editMyInfo',
    children: [

    ]
  },
  {
    name: '预约信息',
    path: 'editRes',
    children: [

    ]
  }, {
    name: '接种凭证',
    path: 'certificate',
    children: [

    ]
  },
  {
    name: '密码修改',
    path: 'updatePwd',
    children: [

    ]
  }
]
const workerMenu = [
  {
    name: '接种管理',
    path: 'host',
    children: [

    ]
  },
  {
    name: '部门管理',
    path: 'deptList',
    children: [

    ]
  },
  {
    name: '仓库管理',
    path: 'wareHouseList',
    children: [

    ]
  },
  {
    name: '公告管理',
    path: 'noticeList',
    children: [

    ]
  },
  {
    name: '疫苗管理',
    path: 'vaccine',
    children: [

    ]
  },
  {
    name: '接种点管理',
    path: 'pointList',
    children: [

    ]
  },
]
const worker = [
  {
    name: '基本信息',
    path: 'editMyInfo',
    children: [

    ]
  },
  {
    name: '工作信息',
    path: 'myEmp',
    children: [

    ]
  }, {
    name: '密码修改',
    path: 'updatePwd',
    children: [

    ]
  },

]
const adminMenu = [
  {
    name: '数据统计',
    path: 'shuju',
    children: [
      {
        name: '接种数据统计',
        path: 'certificateecharts',
        children: [
        ]
      },
      {
        name: '疫苗数据统计',
        path: 'vaccineecharts',
        children: [
        ]
      },
    ]
  },
  {
    name: '用户管理',
    path: 'user',
    children: [
      {
        name: '基本信息',
        path: 'userprofile',
        children: [
        ]
      },
      {
        name: '工作信息',
        path: 'empList',
        children: [
        ]
      },
      {
        name: '密码管理',
        path: 'pwdManager',
        children: [
        ]
      },
    ]
  },
  {
    name: '疫苗管理',
    path: 'vaccine',
    children: [

    ]
  },
  {
    name: '接种管理',
    path: 'host',
    children: [

    ]
  }, {
    name: '部门管理',
    path: 'deptList',
    children: [

    ]
  },
  {
    name: '仓库管理',
    path: 'wareHouseList',
    children: [
    ]
  },
  {
    name: '公告管理',
    path: 'noticeList',
    children: [
    ]
  },
  {
    name: '接种点管理',
    path: 'pointList',
    children: [
    ]
  },
]
const admin = [
  {
    name: '基本信息',
    path: 'editMyInfo',
    children: [

    ]
  },
  {
    name: '工作信息',
    path: 'myEmp',
    children: [

    ]
  }, {
    name: '密码修改',
    path: 'updatePwd',
    children: [

    ]
  },
]
export  {admin,worker,user,workerMenu,adminMenu,userMenu}
