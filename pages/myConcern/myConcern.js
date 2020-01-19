var { APIS } = require('../../const');
var { request } = require('../../libs/request');
var { checkAppLogin } = require('../../libs/user');

var footprintData = require('../../data/data-homeList.js')
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    myConcemList:[],
    pageNo: 1, // 当前页数
    pageSize: 5, //每页条数
    loadingTip: "正在玩命加载中...",
    loadingHidden: false, //控制提示文字的显示隐藏
    hasMore: true, //是否还有数据 true 有，false没有
    imgList: APIS.IMG_LIST,//列表图片地址
  },

//我的关注列表
  myConcemList: function (replace){
    let that = this;
    request({
      url: APIS.HOUSE_MYFOLLOWLIST,
      data: {
        status: 1,
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      // 获取最新房源列表数据
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (replace) {
          that.setData({
            myConcemList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            myConcemList: that.data.myConcemList.concat(resultData.dataList),
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        }

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
  // 跳转详情列表
  detailsList: function (event) {
    // id;
    // housetype;
    // rentable;
    // describes; //项目详情
    // intdetail; // 主力户型
    // baseservicer; // 楼盘动态
    let { id, housetype, rentable, describes, intdetail, baseservicer } = event.currentTarget.dataset
    if (housetype === 1 && rentable === '1') {//跳转写字楼租详情页
      wx.navigateTo({
        url: '../detailsPage/details/details?id=' + id + '&describes=' + describes + '&intdetail =' + intdetail,
      })
    } else if (housetype === 1 && rentable === '0') {//跳转写字楼售详情页
      wx.navigateTo({
        url: '../detailsPage/salesDetails/salesDetails?id=' + id + '&describes=' + describes + '&intdetail =' + intdetail + '&baseservicer' + baseservicer,
      })
    } else if (housetype === 2) {//跳转新房详情页
      wx.navigateTo({
        url: '../detailsPage/newHousDetails/newHousDetails?id=' + id + '&describes=' + describes + '&intdetail =' + intdetail + '&baseservicer' + baseservicer,
      })
    } else if (housetype === 3) {//跳转共享办公详情页
      wx.navigateTo({
        url: '../detailsPage/sharedDetails/sharedDetails?id=' + id,
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid = wx.getStorageSync('sid');
    checkAppLogin(sid, function () {
      this.myConcemList();
    }, this)
    this.setData({
      footprintData: footprintData.local_homeListdata
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
    let { pageNo, pageSize, myConcemList } = this.data;
    if ((myConcemList.length / pageNo) === pageSize) {
      this.setData({
        pageNo: this.data.pageNo + 1, //每次触发上拉事件，把searchPageNum+1  
      });
      this.myConcemList(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})