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
        <el-menu-item>
         <el-button type="primary" @click="$router.push('login')">登录</el-button>
        </el-menu-item>
      </el-menu>
    </div>
		<div class="contentWidth box">
			<sidebar class="side" :menus="menus" ></sidebar>
			<newslist :news="news" class="newslist"></newslist>
		</div>
		<myfoot></myfoot>
	</div>
</template>

<script>
	import sidebar from '@/views/home/sideBar.vue'
	import newslist from '@/views/home/newslist.vue'
	import linesmall from '@/views/home/linesmall.vue'
	import myfoot from '@/views/home/myfoot.vue'
	import {getNotice} from '@/api/modules/notice'
	export default{
		name:'tzgg',
		components:{
			sidebar,
			newslist,
			linesmall,
			myfoot
		},
		data(){
			return{
				menus:[
					{
						id:1,
						name:'',
						url:'/newstrends'
					}
				],
				news:[]
			}
		},
		created(){
			this.menus[0].name = this.$route.params.titles
			let req = {
				type:this.$route.params.types
			}
			getNotice(req).then(resp=>{
				if(resp.status==200){
					this.news = resp.data
				}
			})
		},
		methods:{
			index(){
			this.$router.push('/index')
			},
		}
	}
</script>

<style scoped="scoped">
	.box{
		padding-top: 10px;
		 display: flex;
		 justify-content: space-between;
	}
	.side{
		width: 230px;
	}
	.dynewList{
		width: 900px;
		margin-right: 10px;
	}
	::v-deep .select-btn .el-input__inner::placeholder {
			color: #000000;
			text-align: center;
		}
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
</style>
