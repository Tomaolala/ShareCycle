
<template>
	<!-- 卡片类型 -->
	<view style="width: 100%;">
		<view class="card">
			<view v-for="(item) in data">
				<view class="cardItem" :style="`margin-bottom: ${margin}rpx;`" :class="{border,boxShadow}">
					<view class="head"> 
						<slot name="head"></slot>
					</view>
					<view class="content" >
						<view class="title" :style="`color:${titleColor}`" v-if="title !== {}">{{title.name}}：{{item[title.dataIndex]}}</view>
						<template v-if="isRow && !isRow">
							<view class="text" v-for="(ele) in columns">
								{{ele.name}}:
								<!-- <text style="margin: 0rpx 10rpx;"></text> -->
								{{item[ele.dataIndex]}}
							</view>
						</template>
						<view v-if=" isRow" style="display: flex; flex-wrap: wrap;justify-content: space-between;" class="text">
							<view  v-for="(ele) in columns">
								{{ele.name}}:
								<!-- <text style="margin: 0rpx 10rpx;">:</text> -->
								{{item[ele.dataIndex]}}
							</view>
						</view>
					</view>
					<view class="foot">
						<slot name="foot"></slot>
					</view>
				</view>
			</view>
			<view :style="`${itemStyle}`">
				<slot name="item"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	
	// import cardItem from './cardItem.vue'
	export default {
		components:{
			// cardItem
		},
		props:{
			// 循环数据
			data:{ 
				type:Array,
				default:()=>{return []},
			},
			// 列表标题
			title:{
				type:Object,
				default:()=>{
					return {}
				},
			},
			// 展示数据的名字
			columns:{
				type:Array,
				default:()=>{
					return []
				}
			},
			// 列表的间距
			margin:{
				type:Number,
				default:20
			},
			// 标题颜色
			titleColor:{
				type:String,
				default:'#303133',
			},
			// 是否存在边框
			border:{
				type:Boolean,
				default:false,
			},
			// item插槽的样式
			itemStyle:{
				type:'',
				default:'',
			},
			// 是否加阴影
			boxShadow:{
				type:Boolean,
				default:true,
			},
			// 内容数据是否横向排列
			isRow:{
				type:Boolean,
				default:false,
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.border{
		border-bottom: 1px solid #f8f8f8;
	}
	.boxShadow{
		box-shadow:  5px 5px 0px #dedede,
					-5px -5px 0px #ffffff;
	}
	.card{
		background: #ffffff;
		padding:20rpx;
		.cardItem{
			width: 95%;
			min-height: 120rpx;
			border-radius: 0rpx;
			background-color: #fbfbfb;
			// box-shadow:  5px 5px 0px #dedede,
			// 			-5px -5px 0px #ffffff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx;
			.head{
				max-width: 15%;
				height: 100%;
				margin: 10rpx;
			}
			.content{
				min-width: 65%;
				.title{
					font-weight: 600;
					font-size: 30rpx;
					margin-bottom: 20rpx;
				}
				.text{
					font-size: 32rpx;
					width: 90%;
					color: #b2b2b2;
					text-overflow: ellipsis;
					white-space:nowrap;
					overflow:hidden;
					margin-bottom: 10rpx;
				}
				
				
			}
			.foot{
				width: 20%;
				.state{
					background: #275efe;
					color: #FFFFFF;
					width: 100%;
					overflow: hidden;
					height: 64rpx;
					line-height: 64rpx;
					border-radius: 36rpx;
					text-align: center;
				}
			}
		}
		// .cardItemActive:hover{
		// 	background: #fbfbfb;
			
		// }
	}
	

</style>
