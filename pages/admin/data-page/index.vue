<template>
	<view>
		<view class="header">
			数据
		</view>
		<view class="u-page">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in dataList" :key="index">
					<u-cell :title="item.msg">
						<u-avatar slot="icon" shape="square" size="35" :src="item.url"
							customStyle="margin: -3px 5px -3px 0"></u-avatar>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>
<script>
	export default {
		/**
		 *  在这里通过总线接受下层传输的信息
		 * 
		 */
		data() {
			return {
				dataList: [{
					url: "",
					msg: "信息"
				}]
			}
		},
		methods: {
			getVstats() {
				uni.$on("updateVstatus", (res) => {
					console.log(res, "mqtt发的信息");
				})
			}
		},
		mounted() {
			this.getVstats()
		}
	}
</script>
<style lang="scss" scoped>
	.header {
		background-color: #1677ff;
		font-size: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		margin-bottom: 30rpx;
		border-bottom: solid 2px lightgray;
	}
</style>
