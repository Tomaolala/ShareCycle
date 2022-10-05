<template>
	<view class="cyc">
		<image class="cyc-images" src="@/static/images/cyc.png"></image>
		<view class="cyc-name">
			<span>{{ cyc.remarks }}</span><br>
			<span class="cyc-other">自行车编号: {{ cyc.number }}</span>
		</view>
	</view>
</template>

<script name="CycPage">
	/**
	 * 在这里检索时应该判断deviceName 是否为sys来检索车
	 * 事实上展示也只是展示该车的number 而不展示devicename
	 */
	export default {
		props: {
			cyc: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.cyc {
		display: flex;
		box-sizing: border-box;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		align-items: center;
		margin: 20rpx 20rpx;
		padding: 10rpx 15rpx;
		border-radius: 20rpx;
		.cyc-images {
			width: 80rpx;
			height: 80rpx;
			margin-right: 10px;
		}

		.cyc-name {
			font-size: 32rpx;
			color: #000000;

			span {}

			.cyc-other {
				font-size: 26rpx;
				color: #999999;
				font-weight: normal;
			}
		}
	}
</style>
