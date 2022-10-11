<template>
	<view>
		<view class="header" >
			<text style="font-size: 40rpx;color: aliceblue;position: absolute;left: 300rpx;top: 24rpx;">管理电车</text>
			<text style="font-size: 72rpx;color: aliceblue;float: right;margin-right: 20rpx;" @click="toAddDevice">+</text>
		</view>
		<u-list @scrolltolower="scrolltolower" v-if="cycList">
			<u-list-item v-for="(item, index) in cycList" :key="index" height="60" style="border: 1px solid lightgray;">
				<text>电车编号 {{item.number}}</text>
				<u-cell size="large" title="描述信息" :value="item.remarks"></u-cell>
				<u-button text="删除" type="error" shape="circle"></u-button>
			</u-list-item>
		</u-list>
		<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/car.png" v-else>
		</u-empty>

	</view>
</template>
<script>
	import {
		getCycAll
	} from "@/network/device.js"
	import {
		mapState
	} from "vuex"
	export default {
		/**
		 * 在这里可以管理所有的电车
		 * 电车获取电车表的数据即可
		 * 
		 */
		data() {
			return {
				cycList: []
			}
		},
		methods: {
			async getAllCyc() {
				let res = await getCycAll()
				console.log("所有电车", res.data.data);
				this.cycList = res.data.data
			},
			toAddDevice(){
				uni.navigateTo({
					url:'bike-page/addDevice'
				})
			}
		},
		mounted() {
			this.getAllCyc()
		},
	}
</script>
<style lang="scss" scoped>
	.header {
		font-size: 36rpx;
		height: 100rpx;
		margin-bottom: 30rpx;
		background-color: #1677ff;
		border-bottom: solid 2px lightgray;
	}
</style>
