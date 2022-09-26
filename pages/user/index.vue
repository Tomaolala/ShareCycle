<template>
  <view class="content">
    <view class="top-status-bar" />
    <view class="main">
      <homePage v-show="this.routeActive === 0" />
      <orderPage v-show="this.routeActive === 1" />
      <myPage v-show="this.routeActive === 2" />
    </view>

    <view class="tabbar">
      <u-tabbar :value="routeActive" :fixed="true">
        <u-tabbar-item v-for="(route, index) in routeList" :name="index" :key="route.name" :text="route.text" :icon="route.icon" @click="routeChange" />
      </u-tabbar>
    </view>
  </view>
</template>

<script>
import homePage from './home-page/index'
import orderPage from './order-page/index'
import myPage from './my-page/index'

export default {
  components: {
    homePage,
    orderPage,
    myPage
  },
  data() {
    return {
      routeActive: 0,
      routeList: [
        {
          name: 'homePage',
          text: '首页',
          icon: 'home'
        },
        {
          name: 'orderPage',
          text: '订单',
          icon: 'order'
        },
        {
          name: 'myPage',
          text: '我的',
          icon: 'account'
        }
      ]
    }
  },
  onLoad() {},
  methods: {
    routeChange(active) {
      this.routeActive = active
    }
  }
}
</script>

<style lang="scss" scoped></style>
