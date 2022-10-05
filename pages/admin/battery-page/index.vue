<template>
	<view>
		<view class="header">
			电池管理
		</view>
		<view class="battery-list" v-for="item in battery" :key="item.id">
			<view class="">
				<view>
					开始时间：{{dayjs(item.start_time).format('YYYY-MM-DD HH-mm-ss')}}
				</view>
				<view >
					结束时间：{{dayjs(item.end_time).format('YYYY-MM-DD HH-mm-ss')}}
				</view>
				<view>
					<text>    状态：  </text>
					<text class="" v-if="item.status==0">正常 </text>
					<text class="" v-if="item.status==1">故障 </text>
				</view>
			</view>
		</view>


	</view>
</template>
<script>
	import dayjs from 'dayjs'
	import {
		getBattery
	} from "@/network/battery.js"
	export default {
		/**
		 * 在这里v-for生成每一块电池以及相应的电池编号
		 * 
		 */
		data() {
			return {
				battery: []
			}
		},
		methods: {
			async getBatteryInfo() {
				let res = await getBattery()
				this.battery = res.data.data
				console.log(this.battery);
			},
			// uniapp 识别不出来 dayjs挂载到vm身上
			dayjs(arg) {
				return dayjs(arg)
			}
		},
		computed: {

		},
		mounted() {
			this.getBatteryInfo()

		}
	}
</script>
<style lang="scss" scoped>
.header{
	font-size: 36rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100rpx;
	margin-bottom: 30rpx;
	border-bottom: solid 2px lightgray;
}	
.battery-list{
	padding: 30rpx;
	padding-bottom: 20rpx;
	border: solid 5px lightgray;
	border-radius: 5%;
}

	
</style>
