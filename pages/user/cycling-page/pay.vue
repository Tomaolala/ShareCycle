<template>
	<view class="direct">
		<view class="pay-box" v-if="order">
			<view class="title">{{ tranf(order.status) }}</view>
			<view class="content">
				<view>开锁时间： {{ order.ctime }}</view>
				<view>还车时间： {{ order.startTime }}</view>
				<view class="money">金额： {{ order.payment }}元</view>
			</view>
			<view class="footer">
				<u-button type="error" text="去支付" v-if="order.status == '2'" @click="show = true"></u-button>
				<u-button type="primary" text="返回" @click="back"></u-button>
			</view>
		</view>
		<u-modal 
			:show="show" 
			title="支付订单" 
			:closeOnClickOverlay="true"
			confirmText="支付"
			:showCancelButton="true"
			@close="show = false"
			@cancel="show = false"
			@confirm="confirm"
		>
			<view class="slot-content">
				当前金额为 {{ order.payment }}
			</view>
		</u-modal>
	</view>
</template>

<script name="PayPage">
	const statusMap = {
		'1': '订单正在进行中',
		'2': '还未支付',
		'3': '支付成功'
	}
	export default {
		props: {
			id: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				order: {},
				show: false,
				value: [
					{
						id: 1,
						tramName: '电车名称1',
						status: '1',
						ctime: '2022-09-25 02:29:00',
						payment: '10',
						startTime: '2022-09-25 02:40:00',
						endTime: '2022-09-25 03:00:00'
					},
					{
						id: 2,
						tramName: '电车名称2',
						status: '2',
						ctime: '2022-09-25 02:29:00',
						payment: '10',
						startTime: '2022-09-25 02:40:00',
						endTime: '2022-09-25 03:00:00'
					},
					{
						id: 3,
						tramName: '电车名称3',
						status: '3',
						ctime: '2022-09-25 02:29:00',
						payment: '10',
						startTime: '2022-09-25 02:40:00',
						endTime: '2022-09-25 03:00:00'
					},
				]
			}
		},
		mounted() {
			this.getOrderData()
		},
		methods: {
			getOrderData() {
				try {
					this.order = this.value.filter(item => item.id == this.id)[0]
					console.log(this.id, this.order.status,this.order)
				} catch (e) {
					console.log(e)
					uni.$u.toast(e)
				}
			},
			tranf(status) {
				return statusMap[status]
			},
			back() {
				this.$emit('back')
			},
			confirm() {
				try {
					
				} catch (e) {
					console.log(e)
					uni.$u.toast(e)
				} finally {
					this.show = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.direct {
		.pay-box {
			box-sizing: border-box;
			background-color: #fff;
			margin: 20rpx 20rpx;
			padding: 10rpx 15rpx;
			border-radius: 20rpx;
			.title {
				font-weight: bold;
				font-size: 150%;
				margin-top: 10rpx;
			}
			.content {
				text-align: center;
				margin-top: 20rpx;
				view {
					margin-bottom: 10rpx;
				}
				.money {
					font-weight: bold;
					font-size: 150%;
				}
			}
			.footer {
				display: flex;
				justify-content: space-around;
				padding: 20rpx 50rpx;
				.u-button {
					width: 200rpx;
				}
			}
		}
	}
</style>
