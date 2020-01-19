const app = getApp()
var { checkAppLogin } = require('../../libs/user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户个人信息
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    followImg: '../../images/icon/my/my_follow.png',
    followTitle:'我的关注',
    aboutImg: '../../images/icon/my/about_us.png',
    aboutTitle:'关于我们',
    releaseImg: '../../images/icon/my/my_release.png',
    releaseTitle:'我的发布'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid = wx.getStorageSync('sid');
    checkAppLogin(sid, function () {

    }, this)
    var that = this;
    // 获取用户信息
    wx.getUserInfo({
      success:function(res){
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName'
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })


  },
/* 跳转关注列表 */
  myConcem: function (event){
  wx.navigateTo({
    url: '../myConcern/myConcern',
  })
},
  aboutus: function (event){
  wx.navigateTo({
    url: '../aboutUs/aboutUs',
  })
},
myRelease: function (event) {
  wx.navigateTo({
    url: '../myRelease/myRelease',
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

  }
})