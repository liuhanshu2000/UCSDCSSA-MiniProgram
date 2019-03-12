//app.js
App({
  onLaunch: function() {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.isiPhoneX = /iphone x/i.test(res.model) ||
          /iphone11/i.test(res.model);
      },
    })
    console.log(that.globalData.isiPhoneX)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  
  globalData: {
    userInfo: null,
    formTitle: "新生接机注册",
    isiPhoneX: false
  }
})