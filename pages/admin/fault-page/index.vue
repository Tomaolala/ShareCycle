<template>
	<view>
		<view class="header">
			故障信息

		</view>
		<view class="" v-for="(item) in records" :key="item.id">
			<view class="">
				<u-cell :title="item.id" :value="item.fault"></u-cell>
			</view>
		</view>



	</view>
</template>
<script>
	/**
	 * 所有的故障信息在这里处理
	 * 
	 * 
	 */
	import {
		getFault
	} from "@/network/fault.js"
	export default {
		data() {
			return {
				records: [],
				total: 0
			}
		},
		methods: {
			async getFaultIofo() {
				let res = await getFault(0, 10)
				this.records = res.data.data.records
				this.total = res.data.data.total
			}
		},
		mounted() {
			this.getFaultIofo()
		}
	}
</script>
<style lang="scss" scoped>
	.header {
		font-size: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		margin-bottom: 30rpx;
		border-bottom: solid 2px lightgray;
		background-color: #1677ff;
	}
</style>
