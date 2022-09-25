<template>
	<view class="home-page">
		<view class="map"></view>
		<view class="title"><span>电车列表</span></view>
		<view class="list-cell" v-for="(cyc, index) in cycList" @click="navTo('/pages/cycling-page/index', cyc.id)">
			<cyc :cyc="cyc"></cyc>
		</view>
	</view>
</template>

<script name="OrderPage">
	import cyc from '../cycling-page/cyc.vue'
	export default {
		components: { cyc },
		data() {
			return {
				list: [{
						id: 1,
						deviceName: '自行车1',
						number: 'cyc1',
						status: '2'
					},
					{
						id: 2,
						deviceName: '自行车2',
						number: 'cyc2',
						status: '1'
					},
					{
						id: 3,
						deviceName: '自行车3',
						number: 'cyc3',
						status: '1'
					}
				],
				cycList: []
			}
		},
		mounted() {
			this.getCycList()
		},
		methods: {
			getCycList() {
				try {
					this.cycList = this.list
				} catch (e) {
					console.log(e)
					uni.$u.toast(e)
				}
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
