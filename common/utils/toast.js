export default class toast {
  static success(message, duration = 2000) {
    uni.showToast({
      title: message,
      icon: isShowIcon(message) ? 'success' : 'none',
      duration,
    })
  }

  static error(message, duration = 2000) {
    uni.showToast({
      title: message,
      icon: isShowIcon(message) ? 'error' : 'none',
      duration,
    })
  }

  static loading(message, duration = 2000) {
    uni.showToast({
      title: message,
      icon: isShowIcon(message) ? 'loading' : 'none',
      duration,
    })
  }
}

function isShowIcon(message) {
  if (message) {
    return message && message.length < 8
  }
  return true
}
