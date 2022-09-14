<template>
    <div>
    <el-container>
    <h1>个人信息中心</h1>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-user-solid" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="myinfo()">个人中心</el-dropdown-item>
          <el-badge :value="1" class="item" type="primary">
          <el-dropdown-item @click.native="chat()">消息</el-dropdown-item>
          </el-badge>
           <el-dropdown-item @click.native="$router.push('system')">返回</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{name}}</span>
    </el-header>
    </el-container>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="210px" style="background-color: rgb(238, 241, 246)">
       <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          router
        >
          <label v-for="(item, i) in list" :key="i">
          <el-submenu :index="item.path" v-if="item.children.length>0">
            <template slot="title">
              <i class="el-icon-s-claim"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="child.path" v-for="child in item.children" :key="child.name"><i class="el-icon-s-claim"></i>{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.path" v-if="item.children.length === 0">
            <i class="el-icon-s-claim"></i>
            {{item.name}}</el-menu-item>
          </label>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
          <!-- <el-button type="primary" @click="$router.push('system')">返回</el-button> -->
        </el-main>
      </el-container>
    </el-container>
    <chatdialog
      v-if="addOrUpdateVisible"
       ref="chatdialog">
    </chatdialog>
  </div>
</template>

<script>
import chatdialog from '../common/chat'
import cookie from 'js-cookie'
import * as list from "../../utils/roleList";
export default {
  data(){
    return{
      addOrUpdateVisible:false,
      dataForm:{
        username:"",
        name:"",
        sex:"",
        idcard:"",
        born:"",
        address:"",
        phone:"",
        type:"",
        list:[]
      },
      name:""
    }
  },
  created(){
    cookie.get("uuid");
     const role = sessionStorage.getItem('role')
    if (role) {
      this.list = list[role]
    } else {
      this.$message.error('身份失效，请重新登录')
      this.$router.push('/login')
    }
    this.name = cookie.get("name")
  },
  components:{
    "chatdialog":chatdialog
  },
  methods:{
    editMyInfo(){
      this.$router.push({name:"editMyInfo"});
    },
    logout(){
      cookie.remove('token')
      this.$router.push('login')
    },
    editRes(){
      this.$router.push({name:"editRes"});
    },
    certificate(){
      this.$router.push({name:"certificate"});
    },
    chat(){
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
          this.$refs.ResDialog.init(id);
      });
      //this.$router.push({name:"chat"})
    }
  }
}
</script>

<style>

</style>
