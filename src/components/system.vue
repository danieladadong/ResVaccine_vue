<template>
  <div>
    <el-container>
      <h1>疫苗预约接种管理系统</h1>
      <el-header style="text-align: right; font-size: 12px">
      <span @click="index()" style="cursor:pointer; margin-right:20px">返回首页</span>
        <el-dropdown>
          <i class="el-icon-user-solid" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="myinfo()" >个人中心</el-dropdown-item >
            <el-badge :value="1" class="item" type="primary">
              <el-dropdown-item @click.native="chat()">消息</el-dropdown-item>
            </el-badge>
             <!-- <el-dropdown-item @click.native="$router.push('system')">返回</el-dropdown-item> -->
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
          <span>{{name}}</span>
        </el-dropdown>
      </el-header>
    </el-container>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="210px" style="background-color: rgb(238, 241, 246)">
        <el-scrollbar>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
          :unique-opened="true">
          <label v-for="(item, i) in list" :key="i">
          <el-submenu :index="item.path" v-if="item.children.length>0">
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="child.path" v-for="child in item.children" :key="child.name"><i class="el-icon-s-claim"></i>{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.path" v-if="item.children.length ==0">
            <i class="el-icon-s-claim"></i>
            {{item.name}}</el-menu-item>
          </label>
        </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <el-scrollbar>
          <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <chatdialog v-if="visable" ref="chatdialog"> </chatdialog>
  </div>
</template>
<style scoped>
.el-aside {
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.item {
  margin-top: 10px;
  margin-right: -90%;
}
</style>

<script>
import cookie from "js-cookie";
import chatdialog from "../views/common/chat";
import * as list from "../utils/roleList";
export default {
  data() {
    return {
      name:"",
      addOrUpdateVisible: false,
      isamdin: false,
      isCollapse: true,
      token: null,
      readerAddOrUpdateVisable: false,
      managerAddOrUpdateVisable: false,
      list:[],
      visable:false,
    };
  },
  components: {
    "chatdialog": chatdialog,
  },
  created() {
    this.isLogin = typeof(cookie.get("uuid"))!="undefined"
    if(!this.isLogin){
      this.$router.push({name:'login'})
    }else{
    }
    const role = sessionStorage.getItem('role')
    if(role){
      this.list = list[role+'Menu']
      this.name = cookie.get("name")
    }else{
      this.$message.error('身份失效，请重新登录')
      this.$router.push('/login')
    }
    var type = cookie.get("type");
    if (type == "admin") {
      this.isamdin = true;
    }

  },
  methods: {
    index(){
      this.$router.push({name:'index'})
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if(keys) {
      for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
      this.$router.push('/login')
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut() {
      cookie.remove("token");
      this.token == null;
      this.$router.push("/index");
    },
    empList() {
      this.$router.push({ name: "empList" });
    },
    deptList() {
      this.$router.push({ name: "deptList" });
    },
    wareHouseList() {
      this.$router.push({ name: "wareHouseList" });
    },
    pointList() {
      this.$router.push({ name: "pointList" });
    },
    noticeList() {
      this.$router.push({ name: "noticeList" });
    },
    vaccineList() {
      this.$router.push({ name: "vaccineList" });
    },
    myinfo() {
      this.$router.push({ name: "myinfo" });
    },
    chat() {
      this.visable = true
      this.$nextTick(() => {
        this.$refs.chatdialog.init(id);
      });
      //this.$router.push({name:"chat"})
    },
  },
};
</script>