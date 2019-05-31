import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    isSubmiting: false
  },
  onFieldChange: function (event) {
    this.setData({
      password: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onSubmit: function (event) {
    this.setData({
      isSubmiting: !this.data.isSubmiting,
    });
    const db = wx.cloud.database();
    db.collection('cssa-managers').get({
      success: (res) => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        if (this.data.password == res.data[0].password) {
          wx.redirectTo({
            url: '../result/result',
          })
        }
        else {
          Notify({
            text: '密码错误！',
            duration: 1000,
            selector: '#van-notify',
            backgroundColor: '#FF4444'
          });
        }
        this.setData({ isSubmiting: false })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})