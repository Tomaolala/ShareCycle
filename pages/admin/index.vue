<template>
  <view class="content">
    <view class="top-status-bar" />
    <view class="main">
      <StatisticsPage v-show="this.routeActive === 0" />
      <BikePage v-show="this.routeActive === 1" />
      <BatteryPage v-show="this.routeActive === 2" />
      <FaultPage v-show="this.routeActive === 3" />
      <DataPage v-show="this.routeActive === 4" />
    </view>

    <view class="tabbar">
      <u-tabbar :value="routeActive" :fixed="true">
        <u-tabbar-item v-for="(route, index) in routeList" :name="index" :key="route.name" :text="route.text" :icon="route.icon" @click="routeChange" />
      </u-tabbar>
    </view>
  </view>
</template>

<script>
import StatisticsPage from './statistics-page/index'
import BikePage from './bike-page/index'
import BatteryPage from './battery-page/index'
import FaultPage from './fault-page/index'
import DataPage from './data-page/index'

export default {
  components: {
    StatisticsPage,
    BikePage,
    BatteryPage,
    FaultPage,
    DataPage
  },
  data() {
    return {
      routeActive: 0,
      routeList: [
        {
          name: 'statistics',
          text: '统计',
          icon: 'account'
        },
        {
          name: 'bike',
          text: '电车',
          icon: 'home'
        },
        {
          name: 'battery',
          text: '电池',
          icon: 'order'
        },
        {
          name: 'fault',
          text: '故障',
          icon: 'account'
        },
        {
          name: 'data',
          text: '数据',
          icon: 'order'
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
