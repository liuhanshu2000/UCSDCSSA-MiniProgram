// pages/form/form.js
let auth = require('flightXMLAuth')
let app = getApp()
let username = auth.username;
let apiKey = auth.APIKey;
const fxml_url = `http://${username}:${apiKey}@flightxml.flightaware.com/json/FlightXML2/FlightInfoEx`;

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
    showFlightPopup: false,
    showHouseEnterPopup: false,
    showHouseEndPopup: false,
    showHostEnterPopup: false,
    showHostEndPopup: false,
    flightTimeText:"点击选择时间",
    houseEnterTimeText:"点击选择时间",
    houseEndTimeText:"点击选择时间",
    hostEnterTimeText:"点击选择时间",
    hostEndTimeText:"点击选择时间",
    isSharingRoom: false,
    isTicketFrom: false,
    valid:{
      phone:false,
      email:false,
      flightNum: false
    },
    visible:{
      flightInfo: true,
    },
    planData: [
      'simCard', 'bankCard', 'carPickUp', 'busPickUp', 'house', 'hostFamily'
    ],
    planName: [
      '手机卡代办', '银行卡代办', 'LA轿车接机', 'LA大巴接机','酒店住宿', '寄宿家庭'
    ],
    planResult: [],
    form: {
      name: '',
      phone: '',
      usPhone:'',
      weChat: '',
      email:'',
      flightInfo:{},
      flightTime: Date.now(),
      houseEnterTime: Date.now(),
      houseEndTime: Date.now(),
      hostEnterTime: Date.now(),
      hostEndTime: Date.now(),
      dateTime: new Date(0)
    },
    minDate: new Date().getTime(),
    endMinDate: new Date().getTime(),
  },

  /**
   * this function handles checkbox toggle events
   */
  onChange(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      planResult: event.detail,
    })
  },
  /**
   * this function handles checkbox cell click events
   */
  toggle(event) {
    const { name } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${name}`);
    checkbox.toggle();
  },
  noop() {},
  onFlightClickPopup() {
    this.setData({
      ['showFlightPopup']: true
    })
  },
  onFlightPopupConfirm(event) {
    this.setData({['form.dateTime']:new Date(event.detail)})
    this.setData({ ['flightTimeText']: this.data.form.dateTime.toString()})
    this.onFlightPopupClose()
  },
  onFlightPopupClose() {
    this.setData({
      ['showFlightPopup']: false
    })
  },

  onHouseEnterClickPopup() {
    this.setData({
      ['showHouseEnterPopup']: true
    })
  },
  onHouseEnterPopupConfirm(event) {
    this.setData({['form.houseEnterTime']:new Date(event.detail)})
    this.setData({ ['houseEnterTimeText']: this.data.form.houseEnterTime.toString()})
    this.setData({['endMinDate']: this.data.form.houseEnterTime.getTime()})
    this.onHouseEnterPopupClose()
  },
  onHouseEnterPopupClose() {
    this.setData({
      ['showHouseEnterPopup']: false
    })
  },
  onHouseEndClickPopup() {
    this.setData({
      ['showHouseEndPopup']: true
    })
  },
  onHouseEndPopupConfirm(event) {
    this.setData({['form.houseEndTime']:new Date(event.detail)})
    this.setData({ ['houseEndTimeText']: this.data.form.houseEndTime.toString()})
    this.onHouseEndPopupClose()
  },
  onHouseEndPopupClose() {
    this.setData({
      ['showHouseEndPopup']: false
    })
  },
  onHostEnterClickPopup() {
    this.setData({
      ['showHostEnterPopup']: true
    })
  },
  onHostEnterPopupConfirm(event) {
    this.setData({['form.hostEnterTime']:new Date(event.detail)})
    this.setData({ ['hostEnterTimeText']: this.data.form.hostEnterTime.toString()})
    this.setData({['endMinDate']: this.data.form.hostEnterTime.getTime()})
    this.onHostEnterPopupClose()
  },
  onHostEnterPopupClose() {
    this.setData({
      ['showHostEnterPopup']: false
    })
  },
  onHostEndClickPopup() {
    this.setData({
      ['showHostEndPopup']: true
    })
  },
  onHostEndPopupConfirm(event) {
    this.setData({['form.hostEndTime']:new Date(event.detail)})
    this.setData({ ['hostEndTimeText']: this.data.form.hostEndTime.toString()})
    this.onHostEndPopupClose()
  },
  onHostEndPopupClose() {
    this.setData({
      ['showHostEndPopup']: false
    })
  },
  onSharingChange ({ detail }) {
    this.setData({ isSharingRoom: detail });
  },
  onTicketChange ({ detail }) {
    this.setData({ isTicketFrom: detail });
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
          ["form.phone"]: event.detail,
          ["valid.phone"]:this.isValidPhone(event.detail)
        })
        break
      case "weChat":
        that.setData({
          ["form.weChat"]: event.detail
        })
        break  
      case "usPhone":
        that.setData({
          ["form.usPhone"]: event.detail,
          ["valid.usPhone"]: this.isValidUSPhone(event.detail)
        })  
        break    
      case "email":
        that.setData({
          ["form.email"]:event.detail,
          ["valid.email"]:this.isValidEmail(event.detail)
        })
        break
    }
    
  },

  onFlightEnter({detail}) {
    let that = this
    if (!(/(\w){2}(\d){1,}/g.test(detail))){
      that.setData({["valid.flightNum"]:false})
      return;
    }
    that.setData({ ["valid.flightNum"]: true })
    this.getFlightInfo(detail).then(res => {
      if (res.hasOwnProperty('error')){
        //No response from server
        that.setData({['form.flightTime']: new Date(0)})
      } else {
        let eta = res.FlightInfoExResult.flights[0].estimatedarrivaltime
        that.setData({['form.flightInfo']: res.FlightInfoExResult.flights[0]})
        that.setData({['form.flightTime']: new Date(eta*1000)})
        that.setData({['timePickerText']:that.data.form.flightTime.toString()})
      }
    }).catch(e => {
      //TODO: Network Error
      console.error(e)
    })
  },
  
  onSubmit: function(event){
    for(let k in this.data.valid){
      if (!this.data.valid[k]){
        console.log("There is Invalid Input")
        return
      }
    }
    let data = this.data.form
    console.log("Submitted " + JSON.stringify(data))
  },
  /**
   * Get flight information from
   * flightXML APi
   */
  getFlightInfo: function (flightNumer) {
    return new Promise((resolve, reject) => {
      app.requestGet(fxml_url, {
        ident: flightNumer,
        howMany: 1
      }).then(res => {
        resolve(res)
      })
    })
  },

  isValidPhone: function(num){
    return /1[34578]\d{9}/.test(num)
  },

  isValidUSPhone: function(num){
    return /\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})/.test(num)
  },

  isValidEmail: function(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]      {1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
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