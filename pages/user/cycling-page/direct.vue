<template>
	<view class="direct">
		<u-cell-group :border="false" class="cell-group">
			<u-cell title="开启" value="科技有限公司" icon="home" :title-width="180" :arrow="false"></u-cell>
			<u-cell title="电池位置" :value="GPS" icon="file-text" :title-width="180" :arrow="false"></u-cell>
			<u-cell title="电池电量" value="秘书" icon="account" :title-width="180" :arrow="false"></u-cell>
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script name="DirectPage">
	/**
	 * 
	 */
	export default {
		props: {
			id: {
				type: String,
				required: true
			},
			disable: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
				
				
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.direct {
		.cell-group {
			box-sizing: border-box;
			background-color: #fff;
			margin: 20rpx 20rpx;
			padding: 10rpx 15rpx;
			border-radius: 20rpx;
		}
	}
</style>
