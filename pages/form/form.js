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
    form:{
      name:'',
      phone:'',
      weChat:'',
      dateTime:new Date()
    }
  },
  onPopupClose(){
    this.setData({['showPopup']:false})
  },

  onPopupConfirm() {
    //TODO: Set current data to 'time' cell
  },

  onClickPopup(){
    this.setData({ ['showPopup']: true })
  },

  onFieldChange(event){
    let that = this
    switch(event.currentTarget.dataset.id){
      //switch using type of field id
      //then set respective data field
      case "name":
        that.setData({
          ["form.name"]:event.detail
        })
        break
      case "phone":
        that.setData({
          ["form.phone"]:event.detail
        })
        break
      case "weChat":
        that.setData({
          ["form.weChat"]:event.detail
        })
        break
      case "date":
        //TODO: cast date into Date() object 
        console.log(event.detail)
    }
  },

  onFlightEnter({detail}){
    //Test for invalid Flight number
    /(\w){2}{\d}{1,}/g.test(detail) && (() => {
      return;
    });
    flight.getFlightInfo(detail).then(res => {
      !!res.error? ()=>{
        //TODO: Exception Handling
      }:()=>{
        dateTime = new Date(res.FlightInfoExResult.flights[0].
          estimatedarrivaltime)
      }
    }).catch(e => {
      console.log(e)
    })
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
    this.onLoad()
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

  }
})