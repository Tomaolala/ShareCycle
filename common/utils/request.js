import qs from 'qs'
import config from '@/config/index.js'

const baseUrl = config.baseUrl || ''

const request = (opts) => {
  if (opts.params) {
    opts.params = Object.keys(opts.params).length >= 1 ? opts.params : ''
  }
  uni.onNetworkStatusChange(function (res) {
    if (!res.isConnected) {
      uni.showToast({
        title: '网络连接不可用！',
        icon: 'error',
      })
    }
    return false
  })
  const httpDefaultOpts = {
    url: baseUrl + opts.url + (opts.params ? '?' + qs.stringify(opts.params) : ''),
    data: opts.data,
    method: opts.method,
    header:
      opts.method == 'get'
        ? {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        : {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=UTF-8',
          },
    dataType: 'json',
  }
  httpDefaultOpts.header = Object.assign(httpDefaultOpts.header, opts.headers)
  return new Promise(function (resolve, reject) {
    /* 有些请求不loading */
    if (!opts.noLoading) {
      uni.showLoading({
        mask: true,
        title: '加载中...',
      })
    }
    uni
      .request(httpDefaultOpts)
      .then((res) => {
        uni.hideLoading()
        if (res[1].statusCode != 200) {
          return reject(res[0])
        }
        if (res[0]) {
          return reject(res[0])
        }
        resolve(res[1].data)
      })
      .catch((response) => {
        uni.hideLoading()
        if (!opts.noLoading) {
          uni.showToast({
            title: '请求失败',
            icon: 'error',
          })
        }
        reject(response)
      })
  })
}

export default request
