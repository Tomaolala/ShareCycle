<template>
	<view class="wrap">
		<u-navbar :safeAreaInsetTop="true" :placeholder="true" :border="true" class="navbar" @leftClick="backNav">
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="32"></u-icon>
				<span class="title">{{ titleMap[title] }}</span>
			</view>
		</u-navbar>
		<cyc-page :cyc="cyc"></cyc-page>
		<view class="box-title">电车基础信息</view>
		<u-cell-group :border="false" class="cell-group">
			<u-cell title="电池编号" value="科技有限公司" icon="home" :title-width="180" :arrow="false"></u-cell>
			<u-cell title="电池状态" value="人事部" icon="file-text" :title-width="180" :arrow="false"></u-cell>
			<u-cell title="电池电量" value="秘书" icon="account" :title-width="180" :arrow="false"></u-cell>
			</u-cell>
		</u-cell-group>
		<view v-if="title === 'homePage'">
			<view class="box-title">电车指令</view>
			<direct-page :id="id" :disable="cyc.status == '1'"></direct-page>
			<view class="clock">
				<u-button type="error" text="开锁" v-if="cyc.status == '1'"></u-button>
				<u-button type="warning" text="还车" v-else></u-button>
			</view>
		</view>
		<pay-page :id="id" v-if="title === 'orderPage'" @back="backNav"></pay-page>
	</view>
</template>
<script>
	import CycPage from './cyc.vue'
	import DirectPage from './direct.vue'
	import PayPage from './pay.vue'
	export default {
		components: { CycPage, DirectPage, PayPage },
		data() {
			return {
				cyc: {
					id: 1,
					deviceName: '自行车1',
					number: 'cyc1',
					status: '1'
				},
				titleMap: {
					homePage: '骑行中',
					orderPage: '订单记录'
				},
				title: 'homePage',
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
				id: '',
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.title = option.page
		},
		mounted() {
			this.getCycData()
		},
		methods: {
			getCycData() {
				try {
					this.cyc = this.list.filter(item => item.id == this.id)[0]
				} catch(e) {
					console.log(e)
					uni.$u.toast(e)
				}
			},
			backNav() {
				uni.navigateBack()
			},
		}
	};
</script>
<style lang="scss" scoped>
	.wrap {
		background-color: #f5f5f5;
		height: 100vh;
		.navbar {
			.u-nav-slot {
				display: flex;
				.title {
					margin-left: 20rpx;
				}
			}
		}
		.box-title {
			margin: 30rpx 20rpx;
			padding: 10rpx 15rpx;
		}
		.cell-group {
			box-sizing: border-box;
			background-color: #fff;
			margin: 20rpx 20rpx;
			padding: 10rpx 15rpx;
			border-radius: 20rpx;
		}
		.clock {
			margin: 30rpx 20rpx;
		}
	}
</style>
