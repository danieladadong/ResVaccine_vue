<template>
	<div>
		<div class="lineShow"  v-for="item in titles" :key="item.id"><a href="/">首页</a>>
		<a>{{item.name}}</a></div>
		
	</div>
</template>

<script>
	export default {
		name:'linesmall',
		props: {
			titles:Array
		},
	}
	
</script>

<style>
	.lineShow{
		width: 1180px;
		height: 40px;
		margin: auto;
		margin-top: 20px;
		margin-bottom: 5px;
		line-height: 40px;
		padding-left: 20px;
		background: #efefef;
	}
</style>
