<template>
	<view class="content">
		<view class="header">
			<view style="height: 50rpx;">

			</view>
			<text class="textStyle" @click="backTo()"> 回到登录页面</text>
		</view>
		<!-- <view class="login_img"><image mode="aspectFill" src="/static/image/iamhe.png"></image></view> -->

		<view class="login_from">
			<view class="login_from_input">
				<view class="login_from_name">账号</view>
				<view class="login_from_fun"><input type="text" placeholder="请输入注册账号" v-model="admin"></view>
			</view>
			<view class="login_from_input">
				<view class="login_from_name">密码</view>
				<view class="login_from_fun"><input type="text" placeholder="请输入登录密码" v-model="password">
				</view>
			</view>
			<view class="login_from_input">
				<view class="login_from_name">手机号</view>
				<view class="login_from_fun"><input type="digit" placeholder="请输入手机号码" v-model="phoneNumber"></view>
			</view>
			<view class="login_from_dl">
				<button @click="signup">注册</button>
			</view>
		</view>

	</view>
</template>
<script>
	import {
		isAdminExist,
		signUpUser,
		initAccout
	} from "@/network/signInAndUp.js"
	export default {

		data() {
			return {
				admin: '',
				password: '',
				phoneNumber: '',

			}
		},

		methods: {
			async signup() {
				if (!this.admin || !this.password || !this.phoneNumber) {
					this.$toast.error('请输入')
					return
				}
				// 查询该账号是否存在
				if (await this.isAdminExistOut()) {
					this.$toast.error('该账号已存在')
				}
				// 注册
				let res = await signUpUser({
					id: this.admin,
					userPhone: this.phoneNumber,
					password: this.password,
				})
				console.log(res.data.data);
				if (res.data.data) {
					this.$toast.success('注册成功')
					// 成功后对用户表进行初始化
					initAccout(this.admin)
				}
			},
			async isAdminExistOut() {
				// 验证是否存在该账户
				let res = await isAdminExist(this.admin)
				return res.data.data !== null
			},
			backTo() {
				uni.navigateTo({
					url: "/pages/login/index"
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.header {
		.textStyle {
			top: -90rpx;
		}

		height: 100rpx;
	}

	page {
		background: #fff;
	}

	.login_img {
		width: 100%;
		height: auto;
		margin-top: 90upx;
	}

	.login_img image {
		width: 170upx;
		height: 170upx;
		display: block;
		margin: 0px auto;
		border-radius: 50%;
	}

	.login_from {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 20upx 8%;
	}

	.login_from_input {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px #eee solid;
		padding: 40upx 0px;
		margin: 0px auto;
	}

	.login_from_name {
		width: 20%;
	}

	.login_from_fun {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.login_from_fun input {
		width: 100%;
		text-align: left;
		font-size: 14px;
	}


	.login_from_dl {
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin-top: 150upx;
	}

	.login_from_dl button {
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #FF3B00;
		color: #fff;
		border-radius: 50px;
	}

	.logo_xieyi {
		width: 100%;
		height: 40px;
		line-height: 40px;
		display: flex;
		flex-direction: row;
		margin-top: 30upx;
		align-items: center;
		color: #444;
		font-size: 14px;
		justify-content: center;
	}

	.logo_xieyi label {
		font-size: 18px;
		margin-right: 1%;
		display: block;
		width: 15px;
		height: 15px;
	}

	.cuIcon-squarecheckfill {
		color: #FF3B00;
	}

	.logo_text text {
		color: #FF3B00;
	}

	.getyzm {
		width: 60%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		color: #FF3B00;
	}

	.cuicon {
		font-size: 18px;
	}

	.regFrom_tom_yzlabel {
		width: 60%;
		text-align: right;
	}

	.cuIcon-squarecheckfill {
		background: #FF3B00;
		position: relative;
		border: 2px #ccc solid;
		box-sizing: border-box;
		border-radius: 3px;
	}

	.cuIcon-square {
		background: #fff;
		border: 2px #ccc solid;
		box-sizing: border-box;
		border-radius: 3px;
	}
</style>
