// pages/form/form.js
import * as util from "/../../utils/util.js"
import * as flight from "/../../utils/flightInfo.js"

//Debounce utility
const debounce = (fn, time) => {
  let timeout;
  return function() {
    const functionCall = () => fn.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPopup: false,
    timePickerText:"点击选择时间",
    form: {
      name: '',
      phone: '',
      weChat: '',
      flightInfo:{},
      flightTime: Date.now(),
      dateTime: new Date(),
    }
  },
  onPopupClose() {
    this.setData({
      ['showPopup']: false
    })
  },

  onPopupConfirm(event) {
    this.setData({['form.dateTime']:new Date(event.detail)})
    this.setData({ ['timePickerText']: this.data.form.dateTime.toString()})
    this.onPopupClose()
  },

  onClickPopup() {
    this.setData({
      ['showPopup']: true
    })
  },

  onFieldChange(event) {
    let that = this
    switch (event.currentTarget.dataset.id) {
      //switch using type of field id
      //then set respective data field
      case "name":
        that.setData({
          ["form.name"]: event.detail
        })
        break
      case "phone":
        that.setData({
          ["form.phone"]: event.detail
        })
        break
      case "weChat":
        that.setData({
          ["form.weChat"]: event.detail
        })
        break        
    }
  },

  onFlightEnter({detail}) {
    if (!(/(\w){2}(\d){1,}/g.test(detail))){
      return;
    }
    let that = this
    flight.getFlightInfo(detail).then(res => {
      if (res.hasOwnProperty('error')){
        //No response from server
        that.setData({['form.flightTime']: new Date(0)})
      } else {
        let eta = res.FlightInfoExResult.flights[0].estimatedarrivaltime
        that.setData({['form.flightInfo']: res.FlightInfoExResult.flights[0]})
          //TODO: Timezone correction, UTC to PDT
        that.setData({['form.flightTime']: new Date(eta*1000)})
        that.setData({['timePickerText']:that.data.form.flightTime.toString()})
      }
    }).catch(e => {
      //TODO: Network Error
      console.error(e)
    })
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})