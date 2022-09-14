<template>
<div>
	<ul class="dynewList">
		<li v-for="item in news" :key="item.ntid">
			<span @click="getContent(item.ntid)">{{item.title}}</span><span @click="getContent(item.ntid)">{{item.name}}</span>
		</li>
	</ul>
	<noticedialog v-if="visable" ref="noticedialog"></noticedialog>
</div>
	
</template>

<script>
import noticedialog from './noticedialog.vue'
	export default{
  components: { noticedialog },
		name:'newslist',
		data(){
			return{
				visable:false
			}
		},
		props:{
			news:Array
		},
		methods:{
			getContent(id){
				this.visable=true
				this.$nextTick(() => {
					this.$refs.noticedialog.init(id);
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.dynewList{
		width: 100%;
		
	}
	.dynewList li{
		width: 900px;
		height: 35px;
		line-height: 35px;
		background-image: url(../../assets/imgs/BluelistStyle.jpg);
		background-repeat:no-repeat;
		background-position: 0 16px;
		padding-left: 10px;
	}
	.dynewList li span{
		float: left;
	}
	.dynewList li span:hover{
		cursor: pointer
	}
	.dynewList li span:last-child{
		float: right;
		color: #ccc;
	}
</style>
