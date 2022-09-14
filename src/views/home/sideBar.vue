<template>
	<div>
		<ul class="asideNav">
			<li v-for="item in menus" :key="item.id"><a  v-bind:href="item.url">{{item.name}}</a></li>
			
		</ul>
	</div>
</template>

<script>
	export default{
		name:'sideBar',
		props:{
			menus:Array
		}
	}
</script>

<style scoped="scoped">
	.asideNav{
		margin-top: 10px;
		border-top:1px solid #ccc;
		margin-left: 10px;
	}
	.asideNav li{
		height: 62px;
		line-height: 62px;
		border-bottom: 1px solid #ccc;
		color: #1a66b3;
		font-size: 16px;
		background: url(../../assets/imgs/jiantouBlue.jpg) no-repeat right center;

	}
</style>
