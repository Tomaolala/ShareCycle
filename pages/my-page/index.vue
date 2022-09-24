<template>
  <view class="my-page-container">
    <view class="header">
      <view class="avatar">
        <img class="avatar-img" src="@/static/images/my-page/defaultAvatarUrl.png" />
      </view>
      <view class="name">{{userName}}</view>
    </view>
    <view class="main">
      <view class="cell-list tag-list">
        <view class="tag">
          <view>已登录</view>
          <view class="tag-num">{{loginDays}}天</view>
        </view>
        <view class="tag-split"></view>
        <view class="tag">
          <view>骑车次数</view>
          <view class="tag-num">{{usedDays}}次</view>
        </view>
      </view>
      <view class="cell-list">
        <u-cell-group :border="false">
          <u-cell v-for="cell in cellList" :key="cell.title" size="large" iconStyle="margin-right:12rpx" :border="false" isLink :icon="cell.icon" :title="cell.title" @click="changeRoute(cell.url)"/>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script name="MyPage">
export default {
  data() {
    return {
      userName: '用户x',
      loginDays: 1,
      usedDays: 1,
      cellList: [
        {
          icon: 'rmb-circle',
          title: '账户',
          url: '/pages/my-page/account/index'
        },
        {
          icon: 'coupon',
          title: '支付记录',
          url: '/pages/payment-record/index'
        },
        {
          icon: 'star',
          title: '行程记录',
          url: '/pages/my-page/journey-record/index'
        }
      ]
    }
  },
  methods: {
    changeRoute(url) {
      uni.navigateTo({
          url,
        })
    }
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
    height: 320rpx;
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
