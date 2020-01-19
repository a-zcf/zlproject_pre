var { APIS } = require('../../../const');
var { request } = require('../../../libs/request');
var { checkAppLogin } = require('../../../libs/user');
var WxParse = require('../../../wxParse/wxParse.js');
var markers = []; // 地图标记点
var callout = []; // 地图标记点的气泡
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newHousDetails:[],//新房源详情
    latitude: '', // 纬度
    longitude: '', // 经度
    imgList: APIS.IMG_LIST,//列表图片地址
    imgUrls: [
      '/images/switch_img01.png',
      '/images/switch_img02.png',
      '/images/switch_img03.png'
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'white',
    indicatorActivecolor: '#1E90FF',
  },
  // 地图
  navigate() {
    //使用微信内置地图查看标记点位置，并进行导航
    wx.openLocation({
      latitude: this.data.latitude, //要去的纬度-地址
      longitude: this.data.longitude, //要去的经度-地址
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid = wx.getStorageSync('sid');
    checkAppLogin(sid, function () {
      this.getHouseDetail(options)
    }, this)
    let that = this;
    let posId = options.id;//首页id
    let describes = options.describes;
    let intdetail = options.intdetail;
    let baseservicer = options.baseservicer;
   that.setData({
     posId: posId
   })
    that.guanZhu();
  },
  getHouseDetail({id}) {
    let that = this;
    request({
      url: APIS.HOUSE_DETAIL,
      data: {
        id: id
      },
      method: 'POST',
      // 获取特价房源列表数据
      realSuccess: function (data) {
        let newHousDetails = data.data;
        let { phone, addesses } = data.data
        let desc = JSON.parse(data.data.describes)
        if (desc.length > 0) {
          that.setData({
            desc: desc
          })
        } else {
          that.setData({
            tips: '暂时没有更多相关数据！'
          })
        }
        if (addesses === null) {
          addesses = '暂无详细地址'
        } else {
          addesses = addesses
        }
        if (phone === null) {
          phone = '暂无号码'
        } else {
          phone = phone
        }
        let {introductionDetail, baseServicer, title, lat, lng} = newHousDetails
        // if (describes != ''){
        //   WxParse.wxParse('describes', 'html', describes, that, 0);
        // } else {
        // }
        if (introductionDetail != ''){
          WxParse.wxParse('intdetail', 'html', introductionDetail, that, 9);
        } else {
        }
        if (baseServicer != null){
          WxParse.wxParse('baseservicer', 'html', baseServicer, that, 0);
        }else{
        }
        
        that.setData({
          newHousDetails: newHousDetails,
        });
        that.setData({
          // 地图
          //设置标记点
          markers: [{
            iconPath: "../../../images/ljx.png",
            id: id,
            callout: {
              content: '地址:' + addesses + '\r\n' + '电话:' + phone,
              bgColor: "#fff",
              padding: 5,
              borderRadius: 8,
              borderColor: "red",
              display: 'ALWAYS'
            },
            latitude: lat, // 纬度
            longitude: lng, // 经度
            width: 50,
            height: 50
          }],
          latitude: lat, // 纬度
          longitude: lng, // 经度
        });
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            that.setData({
              latitude: lat, // 纬度
              longitude: lng, // 经度
            })
          }
        })
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
  //楼盘信息
  moreInformation: function (e) {
    // let newHousesId = e.currentTarget.dataset.id;
    // let describes = e.currentTarget.dataset.describes;
    let { id, describes} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../moreInformation/moreInformation?id=' + id + '&describes=' + describes})
  },
  //楼盘动态信息
  floorDynamic: function (e) {
    // let newHousesId = e.currentTarget.dataset.id;
    // let baseservicer = e.currentTarget.dataset.baseservicer;
    let { id, baseservicer } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../floorDynamic/floorDynamic?id=' + id + '&baseservicer=' + baseservicer})
  },
  // 关注、取消关注
  follow: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let status = that.data.status == 0 ? 1 : 0
    request({
      url: APIS.HOUSE_FOLLOW,
      data: {
        id: id,
        status: status,
      },
      method: 'POST',
      realSuccess: function (data) {
        // let status = !that.data.status
        that.setData({
          status: status
        })
        //提示用户
        wx.showToast({
          title: status ? '关注成功' : '取消关注',
          icon: 'success'
        })
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
  // 校验是否关注
  guanZhu: function () {
    let that = this;
    request({
      url: APIS.HOUSE_CHECKFOLLOW,
      data: {
        id: that.data.posId,
        status: 1
      },
      method: 'POST',
      realSuccess: function (data) {
        let status = data.status
        that.setData({
          status: status
        })
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

  //免费电话
  tollTelephone: function (e) {
    let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
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
  onShareAppMessage: function (e) {
    let fxId = e.target.dataset.id
    return {
      title: '分享',
      path: 'pages/detailsPage/newHousDetails/newHousDetails?id=' + fxId,
      //imageUrl: '',  //用户分享出去的自定义图片大小为5:4,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 分享失败
        wx.showToast({
          title: "失败",
        })
      },
    }
  }
})