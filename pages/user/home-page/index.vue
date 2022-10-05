<template>
	<view class="home-page">
		<view class="map"></view>
		<view class="title"><span>电车列表</span></view>
		<view class="list-cell" v-for="(cyc, index) in cycList" @click="navTo('/pages/user/cycling-page/index', cyc.id)">
			<cyc :cyc="cyc"></cyc>
		</view>
	</view>
</template>

<script name="OrderPage">
	import cyc from '../cycling-page/cyc.vue'
	import {getCycAll} from "@/network/device.js"
	export default {
		components: { cyc },
		data() {
			return {
				list: [],
				cycList: []
			}
		},
		mounted() {
			this.getCycList()
		},
		methods: {
			async getCycList() {
				let res=await getCycAll()
				this.cycList=res.data.data
				console.log("所有自行车的信息",this.cycList);
			},
			navTo(url, id) {
				uni.navigateTo({
					url: url + '?page=homePage&id=' + id,
				});
			},
	
	}
}
</script>

<style lang="scss" scoped>
	.home-page {
		height: 100vh;
		background-color: $app-background-grey;
		.title {
			background: #fff;
			height: 70rpx;
			line-height: 70rpx;
			padding-left: 20rpx;
		}
	}
</style>
