<template>
	<view class="order-page-wrap">
		<view class="select-order">
			<view class="select">
				<view class="select-text" @click="selectClick">{{ selectData.name || '请选择订单状态' }}</view>
				<u-button class="select-button" size="mini" @click="reset">重置</u-button>
			</view>
			<u-action-sheet :actions="selectList" :show="showSelect" :closeOnClickOverlay="true" title="请选择订单状态"
				round="16" @close="showSelect = false" @select="selectClick" />
		</view>
		<view class="main">
			<u-empty v-if="orderList.length == 0" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"
				marginTop="100" text="暂无订单" />
			<view class="main-list">
				<view class="list-box" v-for="order in orderList"
					@click="navTo('/pages/user/cycling-page/index', order)">
					<view class="box-header">
						<view class="box-header-title">电车：{{ order.tram_id }}</view>
						<view class="box-header-button" :class="`color-${order.status}`">{{ tranf(order.status) }} >
						</view>
					</view>
					<view class="box-body">
						<text class="box-body-text" prefixIcon="@/static/images/orderPage/time.png"
							iconStyle="width: 25px;height: 25px;margin-right: 20rpx; "
							style="font-size: 30rpx;"
							>
							订单创建于---{{dayjs(order.ctime).format('YYYY年MM月DD日 HH时mm分ss')}}
							</text>
						<u-text class="box-body-text" size="35" prefixIcon="rmb-circle-fill"
							iconStyle="font-size: 25px;margin-right: 20rpx" :text="order.payment" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script name="OrderPage">
	import dayjs from "dayjs"
	import {
		findOrderByUserId
	} from "@/network/order.js"
	import {mapState} from 'vuex'
	const statusMap = {
		'1': '进行中',
		'2': '未支付',
		'3': '已支付'
	}
	export default {
		data() {
			return {
				showSelect: false,
				selectList: [{
						name: '已完成',
						value: '3'
					},
					{
						name: '未支付',
						value: '2'
					},
					{
						name: '正在行程中',
						value: '1'
					}
				],
				selectData: {},
				list: [{
						id: 1,
						tramName: '电车名称1',
						status: '1',
						ctime: '2022-09-25 2:29:00',
						payment: '10'
					},
					{
						id: 2,
						tramName: '电车名称2',
						status: '2',
						ctime: '2022-09-25 2:29:00',
						payment: '20'
					},
					{
						id: 3,
						tramName: '电车名称3',
						status: '3',
						ctime: '2022-09-25 2:29:00',
						payment: '20'
					}
				],
				orderList: []
			}
		},
		mounted() {
			this.getOrderData()
		},
		methods: {
			dayjs(args){
				return dayjs(args)
			},
			async getOrderData() {
				let res =await findOrderByUserId(this.UserId)
				this.list=res.data.data
				console.log(this.list);
				try {
					// 在这里进行过滤 在此之前进行请求
					this.orderList = this.selectData?.value ?
						this.list.filter(item => item.status == this.selectData.value) :
						this.list
				} catch (e) {
					uni.$u.toast(e)
				}
			},
			selectClick(option) {
				this.selectData = option
				this.showSelect = true
				this.getOrderData()
			},
			reset() {
				this.selectData = {}
				this.showSelect = false
				this.getOrderData()
			},
			tranf(status) {
				return statusMap[status]
			},
			navTo(url, order) {
				const toUrl = order.status === '1' ?
					url + '?page=homePage&id=' + order.id :
					url + '?page=orderPage&id=' + order.id
				uni.navigateTo({
					url: toUrl,
				})
			},
		},
		computed: {
			...mapState({
				UserId: function(state) {
					if (typeof state.User.UserId === "function")
						return state.User.UserId()
					else
						return state.User.UserId
				},
			})
		},
	}
</script>

<style lang="scss" scoped>
	.order-page-wrap {
		height: 100vh;
		background-color: $app-background-grey;

		.select-order {
			padding: 30rpx 20rpx;
			background: #fff;

			.select {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.select-button {
					width: 200rpx;
					margin: 0;
				}
			}
		}

		.main-list {
			.list-box {
				background: #fff;
				margin-bottom: 20rpx;
				margin: 20rpx 20rpx;
				padding: 10rpx 15rpx;
				border-radius: 20rpx;

				.box-header {
					display: flex;
					justify-content: space-between;
					margin-bottom: 20rpx;

					.box-header-title {
						font-weight: bold;
						font-size: large;
					}

					.color-1 {
						color: #3c9cff;
					}

					.color-2 {
						color: #f56c6c;
					}

					.color-3 {
						color: #5ac725;
					}
				}

				.box-body {
					.box-body-text {
						margin-bottom: 20rpx !important;
					}
				}
			}
		}
	}
</style>
