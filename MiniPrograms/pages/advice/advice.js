// pages/advice/advice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advice: ''
  },

  backup(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  bindinput(e){
    this.setData({
      advice: e.detail.value
    })
  },
  submit(){
    wx.request({
      url: `${app.globalData.baseUrl}/addAdvice`,
      method: 'POST',
      data:{
        openid: app.globalData.openid,
        advice: this.data.advice
      },
      success: res => {
        this.setData({
          advice: ''
        })
        wx.redirectTo({
          url: '../index/index',
        })
        wx.showToast({
          title: '提交成功',
          duration: 1500
        })
      },
      error: res => {
        wx.showToast({
          title: '提交失败，请稍后再试',
          duration: 1500
        })
      }
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