// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [''],
    studentsData: []
  },
  onChange(event) {
    // console.log(event)
    this.setData({
      activeNames: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // const db = wx.cloud.database();
    // db.collection('students-2023').get({
    //   success: function (res) {
    //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //     // console.log(res.data)
    //   }
    // })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getall',
      // 传给云函数的参数
      data: {
      },
      success: (res) => {
        this.setData({
          studentsData: res.result.data
        })
        console.log(res.result.data) // 3
      },
      fail: console.error
    })
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