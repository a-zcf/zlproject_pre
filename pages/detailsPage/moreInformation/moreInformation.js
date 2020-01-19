var { APIS } = require('../../../const');
var { request } = require('../../../libs/request');
var WxParse = require('../../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let posId = options.id;//首页id
    request({
      url: APIS.HOUSE_DETAIL,
      data: {
        id: posId
      },
      method: 'POST',
      // 获取特价房源列表数据
      realSuccess: function (data) {
        let newHousDetails = data.data;
        let desc = JSON.parse(data.data.describes)
        // let { describes } = newHousDetails
        if (desc.lenght > 0){
          // WxParse.wxParse('describes', 'html', describes, that, 0);
          that.setData({
            desc: desc
          })
        } else {
          that.setData({
            tips: '暂时没有更多相关数据！'
          })
        }
        that.setData({
          newHousDetails: newHousDetails,
        });
      },
      //返回失败信息提示
      realFail: function (resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      },
      realComplete: function (resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      }
    }, false, that)
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