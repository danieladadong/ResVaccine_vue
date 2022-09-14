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
        <div class="hello">
            <!-- 初始化echarts 需要个有宽高的盒子 -->
            <div ref="mapbox" class="box">
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import jsonp from 'jsonp'

	const option = {
		title: {
			text: '疫情地图'
		},
		series: [{
			type: 'map', //告诉echarts 渲染地图
			map: 'china',
			label: {
				show: true, //显示各个省份名称
				fontSize: 8,
			},
			itemStyle: {
				areaColor: '#fff' //区域的背景颜色
			},
			emphasis: {
				//控制鼠标滑过时的高亮样式
				itemStyle: {
					areaColor: '#c7fffd'
				}
			},
			zoom: 1.2, //控制地图的大小
		}],
		visualMap: [{
			type: 'piecewise',
			show: true,
			splitNumber: 6,
			pieces: [{
					min: 10000
				}, // 不指定 max，表示 max 为无限大（Infinity）。
				{
					min: 1000,
					max: 9999
				},
				{
					min: 100,
					max: 999
				},
				{
					min: 10,
					max: 99
				},
				{
					min: 1,
					max: 9
				},
				{
					min: 0,
					max: 0
				}
			],
			//align:'right' // 默认是left
			inRange: {
				symbol: 'rect',
				color: ['#fff', '#ffaa85', '#ff7b69', '#cc2929', '#8c0d0d', '#660208']
			},
			itemHeight: 10,
			itemWidth: 20
		}],
		tooltip:{
			// position: function (pos, params, dom, rect, size) {
			//       // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
			//       var obj = {top: 60};
			//       obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
			//       return obj;
			//   }
		}
	};
	export default {
		name: 'Map',
		mounted() {
			this.getData();
			this.mychart = echarts.init(this.$refs.mapbox); //获取mapbox盒子
			this.mychart.setOption(option);
		},
		methods: {
			index(){
			this.$router.push('/index')
			},
			getData() {
				jsonp(
					'http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', {}, (erros, data) => {
						// console.log(data);
						// console.log(data.data.list)
						var lists = data.data.list.map(item => {
							return {
								name: item.name,
								value: item.econNum
							}
						})
						option.series[0].name="确诊数"
						option.series[0].data = lists;
						this.mychart.setOption(option);
					})
			},
            myinfo() {
                this.$router.push({ name: "myinfo" });
            },
            chat() {
                this.cvisable = true
                this.$nextTick(() => {
                    this.$refs.chatdialog.init(id);
                });
            },
		}
	}
</script>

<style scoped>
.box{
    width: 750px;
    height: 650px;
    margin: auto;
    /* border: 2px solid aquamarine; */
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
.footer{
  width: 100%;
  height: 200px;
  background-color: #474747;
  margin-top: 50px;
}
</style>

