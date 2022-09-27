<template>
  <view class="journey-record-container">
    <view class="journey-title">我的行程</view>
    <view class="journey-list">
      <u-cell-group :border="false">
        <u-cell class="journey-item" title="共享电车" :isLink="true" >
          <view slot="icon" class="journey-image">
            <image src="@/static/images/my-page/bike.svg"></image>
          </view>
          <view slot="label" class="journey-time">累计骑行{{ journeyTime }}时</view>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>
<script name="JourneyRecord">
export default {
  data() {
    return {
      journeyTime: 20
    }
  }
}
</script>
<style lang="scss" scoped>
.journey-record-container {
  .journey-title {
    height: 80rpx;
    line-height: 80rpx;
    padding: 20rpx;
    font-size: large;
    border-bottom: 20rpx solid $app-background-grey;
  }
  .journey-list {
    padding: 20rpx 0;
    .journey-item {
      .journey-image {
        width: 70rpx;
        height: 70rpx;
        padding: 10rpx;
        border: 2rpx solid $app-background-grey;
        border-radius: 50%;
        margin-right: 20rpx;
        image {
          width: 70rpx;
          height: 70rpx;
        }
      }
      .journey-time {
        margin-top: 10rpx;
        font-size: 24rpx;
        color: #909193;
        line-height: 36rpx;
      }
    }
  }
}
</style>
