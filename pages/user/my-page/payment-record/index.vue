<template>
	<view class="payment-record-container">
		<!-- <view class="payment-search">
      <u-search placeholder="" searchIcon="calendar" height="60" showAction :actionStyle="{width: '100rpx',height: '55rpx','line-height': '55rpx',background: '#007aff', color: '#fff','border-radius': '10rpx'}"  v-model="search.time"></u-search>
    </view> -->
		<view class="payment-image">
			<image src="@/static/images/my-page/payment.svg"></image>
		</view>
		<view class="payment-list">
			<u-cell-group :title="`总消费金额：${totalMoney}元`" :border="false">
				<u-cell v-for="payment in paymentList" title="租车消费"
					:label="dayjs(payment.ctime).format('YYYY-MM-DD HH-mm-ss')">
					<view slot="value" class="payment-value">
						{{ `-${payment.pay_money}元` }}
					</view>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>
<script name="PaymentRecord">
	import {
		mapState
	} from "vuex"
	import {
		getTotalPay,
		getAllMoney
	} from "@/network/pay.js"
	import dayjs from "dayjs"
	export default {
		data() {
			return {
				paymentList: [],
				search: {
					time: ''
				},
				total: 0,
				totalMoney:0
			}
		},
		methods: {
			dayjs() {
				return dayjs()
			},
			/**
			 * 在这里发送pay请求所有消费订单
			 */
			async getPayList() {
				let res = await getTotalPay(this.UserId)
				console.log("pay", res.data.data);
				this.paymentList = res.data.data.records
				this.total = res.data.data.total
			},
			/**
			 * 获取消费的总金额
			 */
			async getPayMoneyAll() {
				let res = await getAllMoney(this.UserId)
				console.log("payAll",res.data);
				this.totalMoney=res.data.data
			}
		},
		computed: {
			payMoneyAll() {
				return this.paymentList.reduce((pre, payment) => {
					return pre + payment.payMoney
				}, 0)
			},
			...mapState({
				UserId: function(state) {
					if (typeof state.User.UserId === "function")
						return state.User.UserId()
					else
						return state.User.UserId
				},
			})
		},
		mounted() {
			this.getPayList()
			this.getPayMoneyAll()
		}
	}
</script>
<style lang="scss" scoped>
	.payment-record-container {

		// .payment-search {
		//   padding: 30rpx 20rpx;
		// }
		.payment-image {
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient($color1, $color2);

			image {
				padding: 30rpx;
				width: 210rpx;
				height: 70%;
				margin: auto;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 50%;
			}
		}

		.payment-value {
			color: $uni-color-primary;
		}

		::v-deep {
			.u-cell-group__title {
				background: $app-background-grey;
			}
		}
	}
</style>
