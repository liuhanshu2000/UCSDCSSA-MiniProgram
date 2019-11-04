//app.js
App({
  onLaunch: function() {
    let that = this
    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     traceUser: true,
    //   })
    // }
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.isiPhoneX = /iphone x/i.test(res.model) ||
          /iphone11/i.test(res.model);
      },
    })
    // console.log(that.globalData.isiPhoneX)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

      }
    })
  },

  /**
   * Encapsulate wx.request()
   */
  requestGet(url, query) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: query
      , success(res){
        resolve(res.data)
      }, fail(e){
        reject(e)
      }})
    })
  },

  globalData: {
    userInfo: null,
    formTitle: "新生接机注册",
    isiPhoneX: false
  }
})
