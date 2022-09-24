<template>
  <view class="my-page-container">
    <view class="header">
      <view class="avatar">
        <img class="avatar-img" src="@/static/images/my-page/defaultAvatarUrl.png" />
      </view>
      <view class="name">用户x</view>
    </view>
    <view class="main">
      <view class="cell-list tag-list">
        <view class="tag">
          <view>已登录</view>
          <view class="tag-num">1天</view>
        </view>
        <view class="tag-split"></view>
        <view class="tag">
          <view>骑车次数</view>
          <view class="tag-num">1次</view>
        </view>
      </view>
      <view class="cell-list">
        <u-cell-group :border="false">
          <u-cell size="large" iconStyle="margin-right:12rpx" :border="false" isLink icon="rmb-circle" title="账户"></u-cell>
          <u-cell size="large" iconStyle="margin-right:12rpx" :border="false" isLink icon="coupon" title="支付记录"></u-cell>
          <u-cell size="large" iconStyle="margin-right:12rpx" :border="false" isLink icon="star" title="行程记录"></u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script name="myPage"></script>

<style lang="scss">
.my-page-container {
  height: 100vh;
  .header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    height: 320rpx;
    overflow: hidden;
    background: linear-gradient( #abe9cd,#3eadcf);
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
    height: calc(100% - 320rpx);
    padding: 20rpx;
    background-color: $app-background-grey;
    .cell-list {
      background: #fff;
      padding: 20rpx 10rpx;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
    }
    .tag-list {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background: linear-gradient(to right, #83eaf1, #63a4ff);
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
  }
}
</style>
