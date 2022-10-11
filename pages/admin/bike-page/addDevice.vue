<template>
	<view>
		<view class="header">
			<text style="color: aliceblue;font-size: 60rpx; margin-left: 20rpx;position: absolute;top: 10rpx;"
				@click="BackTo">
				< </text>
					<text
						style="color: aliceblue;font-size: 40rpx; margin-left: 22rpx;position: absolute;top: 20rpx;right:300rpx;">添加电车</text>
		</view>
		<view class="main">
			<view class="">
				<text>电车备注:</text>
				<u--input placeholder="请输入内容" border="surround" v-model="cyc_remarks" @change="change"
					style="display: inline-block;margin-left: 60rpx;"></u--input>
			</view>
			<view class="">
				<text>电车电池:</text>
				<u--input placeholder="请输入内容" border="surround" v-model="cyc_remarks" @change="change"
					style="display: inline-block;margin-left: 60rpx;"></u--input>
			</view>
			<view class="">
				<text>添加设备</text>
				<text
					style="font-size: 200rpx;display: block;color: lightblue;border: 2px solid darkslategray;border-radius: 5%; text-align: center;width: 400rpx;">✚</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				cyc_remarks: ""
			}
		},
		methods: {
			BackTo() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.header {
		font-size: 36rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: #1677ff;
		border-bottom: solid 2px lightgray;
	}
	.main{
		display: flex;
		flex-wrap: wrap;
		gap: 50rpx;
	}
</style>
