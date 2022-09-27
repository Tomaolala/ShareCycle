<template>
  <view class="scroll-tolower">
    <view v-if="pageLoading" class="skeleton">
      <u-skeleton
        :animate="pageLoadingOptions.animate"
        :avatar="pageLoadingOptions.avatar"
        :avatar-shape="pageLoadingOptions.avatarShape"
        :avatar-size="pageLoadingOptions.avatarSize"
        :loading="pageLoading"
        :rows="pageLoadingOptions.rows"
        :rows-height="pageLoadingOptions.rowsHeight"
        :rows-width="pageLoadingOptions.rowsWidth"
        :title="pageLoadingOptions.title"
        :title-height="pageLoadingOptions.titleHeight"
      />
    </view>

    <scroll-view
      v-show="!pageLoading"
      enable-flex
      :refresher-enabled="openRefresher"
      :refresher-triggered="refresher.isRefresher"
      :scroll-top="scrollViewTop"
      class="scroll-Y"
      :scroll-y="true"
      style="display: flex; flex-direction: column; justify-content: space-between"
      @refresherabort="refresherabort"
      @refresherpulling="refresherpulling"
      @refresherrefresh="refresherrefresh"
      @refresherrestore="refresherrestore"
      @scrolltolower="handleScrolltolower"
    >
      <view id="scrollMain">
        <template v-show="loadList.length">
          <slot :list="loadList" name="main" />
        </template>
        <view v-if="showEmpty" class="empty-container">
          <img src="@/static/img/empty/empty.png" />
          <text style="color: gray">{{ emptyText }}</text>
        </view>
      </view>
      <view v-if="showLoadmore && !showEmpty" class="box-buttom">
        <u-loadmore
          v-if="showStatus.findIndex((i) => load.status == i) !== -1"
          line
          :margin-bottom="loadmoreMarginBottom"
          :margin-top="loadmoreMarginTop"
          :nomore-text="load.nomoreText"
          :status="load.status"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    props: {
      loadSize: {
        type: Number,
        default: 8,
      },
      // 数据为空时显示图片
      showEmptyStatus: {
        type: Boolean,
        default: true,
      },
      emptyText: {
        type: String,
        default: '暂无数据',
      },
      // 初始时自动请求数据
      isAutoSendRequest: {
        type: Boolean,
        default: true,
      },
      // 开启自定义下拉刷新
      openRefresher: {
        type: Boolean,
        default: true,
      },
      // 上拉更新比对key
      refresherKey: {
        type: String,
        default: 'id',
      },
      // 底部加载更多栏的MarginTop值
      loadmoreMarginTop: {
        type: Number,
        default: 0,
      },
      // 底部加载更多栏的MarginBottom值
      loadmoreMarginBottom: {
        type: Number,
        default: 0,
      },
      // 显示加载更多栏
      showLoadmore: {
        type: Boolean,
        default: true,
      },
      // 显示的状态栏
      showStatus: {
        type: Array,
        default: () => ['loading', 'nomore', 'loadmore'],
      },
      // 开启骨架屏
      openPageLoading: {
        type: Boolean,
        default: false,
      },
      // 骨架屏配置
      pageLoadingOptions: {
        type: Object,
        default: () => ({
          rows: 15,
          rowsHeight: 25,
          title: false,
          animate: true,
          rowsWidth: ['100%', '80%', '100%', '100%', '100%', '100%', '100%', '100%', '80%', '100%'],
        }),
      },
    },
    data() {
      return {
        loadList: [],
        load: {
          isLoading: true,
          status: 'loading',
          page: 1,
          size: this.loadSize,
          totalCount: 0,
          nomoreText: '没有更多了',
        },
        refresher: {
          isRefresher: false,
        },
        scrollViewTop: 0,
        pageLoading: this.openPageLoading,
      }
    },
    computed: {
      isLoadNomore() {
        return this.load.totalCount === this.loadList.length
      },
      showEmpty() {
        return this.showEmptyStatus && !this.load.isLoading && !this.loadList.length
      },
    },
    mounted() {
      if (this.isAutoSendRequest) this.proRequest()
    },
    methods: {
      refresherpulling() {
        this.refresher.isRefresher = true
      },
      refresherrefresh() {
        this.proRequest(true)
        this.refresher.isRefresher = false
      },
      refresherabort() {
        this.refresher.isRefresher = false
      },
      refresherrestore() {
        this.refresher.isRefresher = false
      },
      proRequest(isRefresher = false) {
        this.load.status = 'loading'
        let { page, size } = this.load
        if (isRefresher) {
          size = page * size
          page = 1
        }
        this.$emit('request', { page, size }, (list, totalCount, scrollToTop) =>
          this.handleRequest(list, totalCount, scrollToTop, isRefresher)
        )
      },
      /**
       * @description 处理数据状态
       * @param list 结果列表
       * @param totalCount 完整列表的全部条数
       * @param scrollToTop 是否在每一次加载后滑到最顶部
       * @param isRefresher 是否是上拉刷新(比较新旧值)
       * @returns 此时页面显示的所有列表数据
       */
      handleRequest(list, totalCount, scrollToTop = false, isRefresher = false) {
        if (scrollToTop) {
          setTimeout(() => {
            this.scrollViewTop = 0
          }, 50)
          this.scrollViewTop = 1
        }
        this.load.isLoading = true
        // uni.showLoading({
        //   title: '加载中',
        // })
        if (isRefresher) {
          this.loadList = this.diffList(this.loadList, list)
        } else {
          this.loadList.push(...list)
        }
        if (this.openPageLoading) this.pageLoading = false
        this.$nextTick(() => {
          this.load.isLoading = false
          // uni.hideLoading()
        })
        this.load.totalCount = totalCount

        this.upDateLoadstatus()
        return this.loadList
      },
      async handleScrolltolower() {
        this.$emit('beforeScrolltolower', this.loadList)
        if (this.isLoadNomore) return (this.load.status = 'nomore')
        this.load.status = 'loading'
        this.load.page++
        this.proRequest()
      },
      upDateLoadstatus() {
        if (this.isLoadNomore) {
          if (this.load.totalCount === 0) Object.assign(this.load, { nomoreText: '' })
          else Object.assign(this.load, { nomoreText: '没有更多了' })
          this.load.status = 'nomore'
        } else this.load.status = 'loadmore'
      },
      resetScrolltolower() {
        this.load.isLoading = true
        this.loadList = []
        Object.assign(this.load, {
          status: '',
          page: 1,
          size: this.loadSize,
          totalCount: 0,
        })
      },
      resetRequest() {
        this.resetScrolltolower()
        this.proRequest()
      },
      diffList(oldList, newList) {
        newList.forEach((n) => {
          const index = oldList.findIndex((o) => o[this.refresherKey] === n[this.refresherKey])
          if (index !== -1) {
            Object.assign(oldList[index], n)
          } else {
            oldList.unshift(n)
          }
        })

        oldList.forEach((o) => {
          const index = newList.findIndex((n) => o[this.refresherKey] === n[this.refresherKey])
          if (index === -1) {
            oldList = oldList.filter((item) => item[this.refresherKey] !== o[this.refresherKey])
          }
        })
        Object.assign(this.load, {
          status: '',
          page: 1,
          size: this.loadSize,
          totalCount: oldList.length,
        })
        return oldList
      },
    },
  }
</script>

<style lang="scss" scoped>
  .scroll-tolower {
    height: 100%;
    .skeleton {
      padding: 40rpx 40rpx !important;
    }

    .scroll-Y {
      height: 100%;
      .box-buttom {
        display: flex;
      }

      .empty-container {
        display: flex;
        flex-direction: column;
        margin: 60rpx;
        text-align: center;

        image {
          margin: auto;
        }
      }
    }
  }
</style>
