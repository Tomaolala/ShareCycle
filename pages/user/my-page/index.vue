<template>
	<view class="my-page-container">
		<view class="header">
			<view class="avatar">
				<image class="avatar-img" src="/static/images/my-page/defaultAvatarUrl.png" />
			</view>
			<view class="name">{{ userName }}</view>
		</view>
		<view class="main">
			<view class="card tag-list">
				<view class="tag">
					<view>已登录</view>
					<view class="tag-num">{{ loginDays }}天</view>
				</view>
				<view class="tag-split"></view>
				<view class="tag">
					<view>骑车次数</view>
					<view class="tag-num">{{ usedDays }}次</view>
				</view>
			</view>
			<view class="card account">
				<view class="account-title">我的账户</view>
				<view class="account-main">
					<view>
						<image class="account-img" src="/static/images/my-page/account.svg" />
					</view>
					<view class="account-right">
						<view class="account-money">￥{{account}}</view>
						<button @click="perchase(1)">充值</button>
						<!-- 理论上给出弹窗选择充值金额 然后充值-->
						<view class="account-tip">
							<view class="text">可用余额</view>
							<view class="rmb">人民币</view>
						</view>
					</view>
				</view>
			</view>
			<view class="card">
				<u-cell-group :border="false">
					<u-cell v-for="cell in cellList" :key="cell.title" size="large" iconStyle="margin-right:12rpx"
						:border="false" isLink :icon="cell.icon" :title="cell.title" @click="changeRoute(cell.url)" />
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script name="MyPage">
	import {
		mapState
	} from 'vuex'
	import {
		getAccoutById,
		changeMoney
	} from '@/network/accoutAbout.js'
	export default {
		data() {
			return {
				id: '',
				userName: '用户x',
				loginDays: 1,
				usedDays: 1,
				account: '0',
				cellList: [{
						icon: 'coupon',
						title: '支付记录',
						url: '/pages/user/my-page/payment-record/index'
					},
					{
						icon: 'star',
						title: '行程记录',
						url: '/pages/user/my-page/journey-record/index'
					},
					{
						icon: 'clock',
						title: '退出',
						url: '/pages/login/index'
					}
				],
			}
		},
		methods: {
			changeRoute(url) {
				uni.navigateTo({
					url
				})
			},
			// 获取用户信息进行渲染
			async getUserMessage() {
				let res = await getAccoutById(this.UserId)
				const {
					user_id,
					pay_money
				} = res.data.data
				this.userName = user_id
				this.account = pay_money
			},
			async perchase(money) {
				let res = await changeMoney(this.UserId,money+this.account)
				// 事实上应该调微信的第三方
				this.getUserMessage()
			}

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
		mounted() {
			this.getUserMessage()
		}
	}
</script>

<style lang="scss" scoped>
	.my-page-container {
		height: 100vh;

		.header {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: space-evenly;
			height: 360rpx;
			overflow: hidden;
			background: linear-gradient(#abe9cd, #3eadcf);

			.avatar {
				width: 190rpx;
				height: 190rpx;
				background: #ffffff12;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.avatar-img {
					width: 160rpx;
					height: 160rpx;
				}
			}

			.name {
				color: #fff;
				font-size: large;
			}
		}

		.main {
			height: calc(100% - 360rpx);
			padding: 30rpx;
			background-color: $app-background-grey;

			.card {
				background: #fff;
				padding: 20rpx 10rpx;
				border-radius: 20rpx;
				margin-bottom: 30rpx;
			}

			.tag-list {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				background: linear-gradient(to right, $color1, $color2);
				color: #fff;

				.tag {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;

					.tag-num {
						margin-top: 20rpx;
						font-size: large;
					}
				}

				.tag-split {
					width: 2rpx;
					height: 50rpx;
					background-color: #fff;
				}
			}

			.account {
				padding: 20rpx 40rpx;

				.account-title {
					margin-bottom: 40rpx;
					padding: 0 15rpx;
					border-left: 8rpx solid $color2;
				}

				.account-img {
					width: 160rpx;
					height: 120rpx;
				}

				.account-main {
					display: flex;
					justify-content: space-around;
				}

				.account-money {
					font-size: large;
					margin-bottom: 20rpx;
				}

				.account-right {
					text-align: end;
				}

				.account-tip {
					display: flex;

					.text {
						font-size: small;
						margin-right: 10rpx;
					}

					.rmb {
						color: #fff;
						background-color: #ffc107;
						padding: 0 10rpx;
						border-radius: 5rpx;
						font-size: small;
					}
				}
			}
		}
	}
</style>
