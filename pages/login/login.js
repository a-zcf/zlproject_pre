const app = getApp();
var { APIS } = require('../../const');
var { request } = require('../../libs/request');
var { login, checkAuthor, checkAppLogin } = require('../../libs/user');

Page({
  data: {
    //用户个人信息
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    var that = this;
    // 获取用户信息
    wx.getUserInfo({
      success: function (res) {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName'
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
    // 查看是否授权 
    let sid = wx.getStorageSync('sid');
    checkAppLogin(sid, function () {
      wx.switchTab({url:'/pages/home/home'});
    });
  },
  bindGetUserInfo:function(e){
    // 用户按了允许授权按钮
    if (e.detail.userInfo){  
      login(function () {
        wx.switchTab({url:'/pages/home/home'}) 
      }, this)
    }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      }) 
    }
  },

})