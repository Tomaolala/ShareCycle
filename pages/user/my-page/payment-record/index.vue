<template>
  <view class="payment-record-container">
    <!-- <view class="payment-search">
      <u-search placeholder="" searchIcon="calendar" height="60" showAction :actionStyle="{width: '100rpx',height: '55rpx','line-height': '55rpx',background: '#007aff', color: '#fff','border-radius': '10rpx'}"  v-model="search.time"></u-search>
    </view> -->
    <view class="payment-image">
      <image src="@/static/images/my-page/payment.svg"></image>
    </view>
    <view class="payment-list">
      <u-cell-group :title="`总消费金额：${payMoneyAll}元`" :border="false">
        <u-cell v-for="payment in paymentList" title="租车消费" :label="payment.ctime">
          <view slot="value" class="payment-value">
            {{ `-${payment.payMoney}元` }}
          </view>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>
<script name="PaymentRecord">
export default {
  data() {
    return {
      paymentList: [
        {
          payMoney: 1,
          ctime: '2022-9-11 18:59:30'
        },
        {
          payMoney: 2,
          ctime: '2022-9-11 18:59:30'
        },
        {
          payMoney: 3,
          ctime: '2022-9-11 18:59:30'
        }
      ],
      search: {
        time: ''
      }
    }
  },
  computed: {
    payMoneyAll() {
      return this.paymentList.reduce((pre, payment) => {
        return pre + payment.payMoney
      }, 0)
    }
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
    background: linear-gradient( $color1, $color2);
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
