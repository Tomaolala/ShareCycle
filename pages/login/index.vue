<template>
	<view class="login-wrap">
		<view class="top-status-bar" />
		<view class="login-logo">
			<image mode="" src="~@/static/images/logo.svg" />
		</view>
		<view class="login-title">账号密码登录</view>
		<view class="login-form">
			<u--form ref="loginForm" error-type="toast" label-position="left" :model="loginInfo" :rules="rules">
				<view :class="{ 'form-item': true }">
					<u-form-item prop="username">
						<u-input v-model="loginInfo.username" placeholder="账号" @blur="blurHandle('username')"
							@focus="focusHandle('username')">
							<template slot="prefix">
								<text class="iconfont icon-account prefix-icon" />
							</template>
						</u-input>
					</u-form-item>
				</view>

				<view :class="{ 'form-item': true }">
					<u-form-item prop="password">
						<u-input v-model="loginInfo.password" placeholder="密码" :type="pwdShow ? 'text' : 'password'"
							@blur="blurHandle('password')" @focus="focusHandle('password')">
							<template slot="prefix">
								<text class="iconfont icon-password prefix-icon" />
							</template>
							<template slot="suffix">
								<text class="iconfont prefix-icon" :class="pwdShow ? 'icon-pwdyc' : 'icon-pwdxs'"
									@click="pwdShow = !pwdShow" />
							</template>
						</u-input>
					</u-form-item>
				</view>

				<view class="form-item">
					<view class="toggle-login flex-c"> </view>
					<u-form-item>
						<u-button shape="circle" text="登录" type="primary" @click="submit" />
					</u-form-item>
				</view>
				<view class="signup" style="text-align: center;">
					<text @click="signUp()">注册新账号</text>
				</view>
			</u--form>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/network/signInAndUp.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				loginInfo: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入账号'
					}],
					password: [{
						required: true,
						message: '请输入密码'
					}]
				},
				isDxLogin: true,
				codeFocus: false,
				passwordFocus: false,
				pwdShow: false
			}
		},
		computed: {
			codeClassDisable() {
				return uni.$u.test.mobile(this.loginInfo.phone) ? false : true
			}
		},
		onReady() {
			this.$refs.loginForm.setRules(this.rules)
		},
		methods: {
			async submit() {
				if (!this.loginInfo.username || !this.loginInfo.password) {
					this.$toast.error('请输入')
					return
				}
				let res = await login({
					id: this.loginInfo.username,
					password: this.loginInfo.password
				})
				if (res.data.data.msg === "user"||res.data.data.msg === "admin") {
					// 持久化
					uni.setStorage({
						key: 'UserId',
						data: this.loginInfo.username,
					});
					// 不登陆默认从缓存中读取
					this.$store.commit("updateUserId",{
						UserId:this.loginInfo.password
					})
					if(res.data.data.msg === "user"){
						uni.navigateTo({
							url: '/pages/user/index'
						})
					}else{
						uni.navigateTo({
							url: '/pages/admin/index'
						})
					}
				} else {
					this.$toast.error(res.data.data.msg)
				}

			},
			focusHandle(key) {
				this[key + 'Focus'] = true
			},
			blurHandle(key) {
				this[key + 'Focus'] = false
			},
			// 登陆失败或点击注册链接跳转到注册
			signUp() {
				uni.navigateTo({
					url: "/pages/login/signUp"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-wrap {
		height: 100vh;
		// background-color: #f2f2f2;
		position: relative;
		background: linear-gradient(#f6ebe6, #aee1f9);

		.code-class-disable {
			color: #c0c0c0 !important;
		}

		.login-logo {
			height: 600rpx;
			width: 85%;
			margin: 0 auto;
			padding-top: 80rpx;
			text-align: center;

			image {
				width: 50%;
				height: 50%;
				margin-top: 20%;
				background: rgba(255, 255, 255, 0.2);
				box-shadow: 0px 0px 20px 1px rgba(255, 255, 255, 1);
				border-radius: 50%;
				padding: 50rpx;
			}
		}

		.login-title {
			width: 100%;
			text-align: center;
			color: #333;
			font-size: 40rpx;
		}

		/deep/ .u-form {
			height: 100%;
		}

		.login-form {
			.form-item {
				margin: 20rpx 30rpx;

				/deep/ .u-input {
					border: 1rpx solid #fff;
					border-radius: 45rpx;
					background-color: #fff;
					padding: 20rpx 30rpx !important;
				}

				.prefix-icon {
					font-size: 38rpx;
					margin-right: 20rpx;
					color: #cecece;
				}

				.code-text {
					color: #2b85e4;
					font-size: 28rpx;
				}
			}

			.focus {
				/deep/ .u-input {
					border: 1rpx solid #1877f2 !important;
				}

				.prefix-icon {
					color: #1877f2;
				}
			}
		}

		.toggle-login {
			color: #1877f2;
			font-size: 30rpx;
			padding: 20rpx 10rpx;

			.forget-pwd {
				font-size: 26rpx;
				color: #a3a3a3;
			}
		}
	}
</style>
