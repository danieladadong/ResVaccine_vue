<template>
	<div>
		<div class="footer">
			<el-select v-model="value" class="select-btn" placeholder="=政府部门导航=">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-select v-model="value" class="select-btn" placeholder="=院系兄弟单位=">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-select v-model="value" class="select-btn" placeholder="=医学研究机构=">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-select v-model="value" class="select-btn" placeholder="=其他研究机构=">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</div>
		
		<div class="contentWidth banquan"><p>copyright@2022鲁ICP备11032646号版权属山东医学图书情报协会所有</p></div>
	</div>
</template>

<script>
	export default{
		name:'myfoot',
		data(){
			return{
				options: [
					{
						value: '山东省立医院',
						label: '山东省立医院'
					},
					{
						value: '山东大学齐鲁医院',
						label: '山东大学齐鲁医院'
					},
					{
						value: '青岛大学附属医院',
						label: '青岛大学附属医院'
					},
					{
						value: '山东省肿瘤医院',
						label: '山东省肿瘤医院'
					},
					{
						value: '山东大学附属生殖医院',
						label: '山东大学附属生殖医院'
					}
				],
				value: ''
			}
		}
		
	}
</script>

<style>
	.footer {
		margin-top: 60px;
		height: 120px;
		background-color: #efefef;
		color: #000000;
		text-align: center;
		display: flex;
		justify-content: space-around;
	}
	.select-btn {
		margin-top: 30px;
	}
	.banquan {
		height: 80px;
		text-align: center;
	}
	.banquan p {
		margin-top: 15px;
		color: #999;
	}
	
</style>
