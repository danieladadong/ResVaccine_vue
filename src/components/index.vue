<template>
  <div>
    <div class="header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item @click="index()" style="margin-left:700px">首页</el-menu-item>
        <el-menu-item>关于我们</el-menu-item>
        <el-menu-item>医疗动态</el-menu-item>
        <el-menu-item>医疗资源</el-menu-item>
        <el-menu-item>联系我们</el-menu-item>
        <el-menu-item v-if="!isLogin">
         <el-button type="primary" @click="$router.push('login')">登录</el-button>
        </el-menu-item>
        <el-menu-item v-else>
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
          <span style="color:#fff;">{{name}}</span>
        </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <el-carousel height="550px">
      <el-carousel-item v-for="item in banner" :key="item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
    <!--服务-->
    <div class="main">
      <div class="main-box">
        <div
          class="box"
          :style="{ background: item.bgImage[0] === '#' ? item.bgImage : `url(${item.bgImage})` }"
          v-for="item in iconList"
          :key="item.name"
          >
           <!-- @click="this.$router.push({name:item.contentList.get(0)})"> -->
          <el-img :fit="scale-down" :src="item.logoImage" alt></el-img>
          <span @click="go(item.name,item.contentList[0])">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="notice">
      <div class="notice-c">
        <div class="notice-item" v-for="item in typeList" :key="item.name">
          <div class="notice-top">
            <img :src="item.bgImage" alt class="notice-top" />
          </div>
          <div class="notice-bottom">
            <div class="notice-bottom-c">
              <h3>
                <span class="goMore" @click="more(item.name)">查看更多</span>
               {{item.name}}
              </h3>
              <p @click="getContent(keys)" class="title" v-for="(values,keys) in item.contentList" :key="keys">{{values}}</p>
            </div>
          </div>
        </div>
      </div>
      <chatdialog v-if="cvisable" ref="chatdialog"> </chatdialog>
      <noticedialog v-if="visable" ref="noticedialog"></noticedialog>
    </div>
    <myfoot></myfoot>
  </div>
</template>
<script>
import { getBanner, getIcon,getNotice } from '@/api/modules/user'
import noticedialog from '../views/home/noticedialog.vue'
import myfoot from '@/views/home/myfoot.vue'
import cookie from 'js-cookie'
import chatdialog from "../views/common/chat";
export default {
  components: { noticedialog,myfoot,"chatdialog": chatdialog,},
  data() {
    return {
      isLogin:false,
      name:"",
      value: new Date(),
      noticeData: [],
      vaccineData: [],
      pointData: [],
      activeIndex: "1",
      pageIndex: 1,
      noticepageSize: 10,
      noticetotalPage: 0,
      vaccinepageSize: 10,
      vaccinetotalPage: 0,
      pointpageSize: 10,
      pointtotalPage: 0,
      noticepageSize: 10,
      noticetotalPage: 0,
      searchText: "",
      banner: [],
      iconList: [],
      typeList: [],
      visable:false,
      cvisable:false
    }
  },
  async created() {
    const res = await getBanner()
    this.banner = res.data || []
    const icon = await getIcon()
    this.iconList = icon.data || []
    const type = await getNotice()
    this.typeList = type.data || []
    this.isLogin = typeof(cookie.get("uuid"))!="undefined"
    this.name = cookie.get("name")
  },
  methods: {
    index(){
      this.$router.push('/index')
    },
    logout(){
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if(keys) {
      for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
      this.$router.push('/login')
    },
    more(title){
      let type
      if(title=="医院公告"){
        type = "notice"
      }else if(title=="重大新闻"){
        type = "new"
      }else if(title=="医生科普"){
        type = "answer"
      }
      this.$router.push({name:'newstrends',params:{titles:title,types:type}})
    },
    go(title,ins){
      let data = ins.split('.')
     this.$router.push({name:data[0],params:{titles:title,types:data[1]}})
    },
    getContent(id){
				this.visable=true
				this.$nextTick(() => {
					this.$refs.noticedialog.init(id);
				});
		},
    myinfo() {
      this.$router.push({ name: "myinfo" });
    },
    chat() {
      this.cvisable = true
      this.$nextTick(() => {
        this.$refs.chatdialog.init(id);
      });
      //this.$router.push({name:"chat"})
    },
  }
}
</script>
<style scoped>
.header {
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.main {
  width: 100%;
  margin-top: 50px;
}
.main-box {
  width: 1230px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box {
  width: 300px;
  height: 207px;
  vertical-align: middle;
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 207px;
}
.notice {
  width: 100%;
  margin-top: 50px;
}
.notice-c {
  width: 1230px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}
.notice-item {
  width: 397px;
  /* height: 463px; */
  box-shadow: 0px 0px 10px rgb(0 0 0 / 20);
}
.notice-top {
  width: 397px;
  height: 226px;
}
.notice-bottom-c {
  padding: 25px 20px 0;
}
h3 {
  font-size: 24px;
  line-height: 1.1;
  padding-bottom: 15px;
  text-align: left;
}
.goMore {
  float: right;
  font-size: 12px;
  line-height: 24px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  width: 90px;
  border: 1px solid #eee;
  border-radius: 10px;
  text-align: center;
  color: #474747;
  cursor: pointer;
}
.title {
  line-height: 40px;
  border-top: 1px solid #eee;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  cursor: pointer;
}
.footer{
  width: 100%;
  height: 200px;
  background-color: #474747;
  margin-top: 50px;
}

</style>
