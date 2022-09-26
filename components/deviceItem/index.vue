<template>
	<view class="deviceItem" v-if="isShow">
		<view class="delete" @click="isShow = false">删除</view>
		<uni-card :title="title">
			<view class="content">
				<text>{{content}}</text>
				<slot name="content"></slot>
			</view>
			<!-- <view style="width: 100%;display: flex;justify-content: center;">
				<button type="primary" size="mini">添加指令</button>
			</view> -->
		</uni-card>
	</view>
</template>

<script>
	import { uniCard } from '@dcloudio/uni-ui'
	
	export default {
		components:{
			uniCard
		},
		data(){
			return {
				isShow:true
			}
		},
		methods:{
			// deleteItem(){
			// 	console.log("》》》模拟删除")
			// }
		},
		props:{
			title:{
				type:String,
				default:"标题"
			},
			content:{
				type:String,
				default:" "
			},
		}
	}
</script>

<style lang="less" scoped>
	.deviceItem{
		position: relative;
		.delete{
			position: absolute;
			background-color: #f46c6c;
			color: #fff;
			z-index: 10;
			width: 120rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			border-radius: 32rpx 0 0 32rpx;
			right:28rpx;
			top:24rpx;
		}
		.content{
			min-height: 100rpx;
		}
	}
</style>