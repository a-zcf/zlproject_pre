Page({

  /**
   * 页面的初始数据
   */
  data: {
     
  },

  xzlz: function (event){
  wx.navigateTo({
    url: '../releaseInput/releaseRent/releaseRent',
  })
},
  xzls: function (event){
  wx.navigateTo({
    url: '../releaseInput/releaseSale/releaseSale',
  })
},
  newfang: function (event){
  wx.navigateTo({
    url: '../releaseInput/releaseHouse/releaseHouse',
  })
},
  gxbg: function (event){
  wx.navigateTo({
    url: '../releaseInput/releaseShared/releaseShared',
  })
},
  navOfficerent: function (event){
  wx.navigateTo({
    url: '../releaseNav/navOfficerent/navOfficerent',
  })
},
  navOfficerental: function (event){
  wx.navigateTo({
    url: '../releaseNav/navOfficerental/navOfficerental',
  })
},
  newBuil: function (event){
  wx.navigateTo({
    url: '../releaseNav/newBuil/newBuil',
  })
},
  sharedOffice: function (event){
  wx.navigateTo({
    url: '../releaseNav/sharedOffice/sharedOffice',
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