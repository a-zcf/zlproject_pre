var {APIS} = require('../../const');
var { request } = require('../../libs/request');
var homeData = require('../../data/data-home.js');
var homeListData = require('../../data/data-homeList.js');
var { checkAppLogin } = require('../../libs/user');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    specialsList:[],//特价房源
    newHousingList:[],//最新房源
    fuzzyQuery:[],//模糊查询
    dowQuery:[],//上拉
    inputShowed: true, // 搜索框状态
    viewShowed: false,//显示结果view的状态
    inputVal: "",// 搜索框值
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    //loadingHidden: false, //控制提示文字的显示隐藏
   // selectData: ['深圳', '龙华新区大浪', '大浪', '福田'],//下拉列表的数据
    qyName: '',//选择的下拉列表下标
    indexId:0,
    // quanbu:'全部',
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
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  //点击下拉列表
  optionTap(e) {
    let qyName = e.currentTarget.dataset.name;//获取点击的下拉列表的下标
    let index = e.currentTarget.dataset.id;//获取点击的下拉列表的下标
      this.setData({
        indexId: index,
        qyName: qyName,
        // quanbu: quanbu,
        show: !this.data.show
      });
  },
  //广告图
  adList(){
    let that = this;
    request({
      url: APIS.AD_LIST,
      data: {

      },
      method: 'POST',
      realSuccess: function (resultData) {
        let adList = resultData.dataList;
        that.setData({
          adList: adList,
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
   // 获取特价房源列表数据
  getSpecialsList(e) {
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        specifyes:'1'
      },
      method:'POST',
      // 获取特价房源列表数据
      realSuccess: function (resultData) {
        let specialsList = resultData.dataList;
        that.setData({
          specialsList:resultData.dataList,
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
   // 获取最新房源列表数据
  getNewhousingList() {
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        latest: '1',
      },
      method:'POST',
      // 获取最新房源列表数据
      realSuccess: function (resultData) {
        let newHousingList = resultData.dataList;
          that.setData({
            newHousingList: resultData.dataList,
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
   // 模糊查询
  fuzzyQuery:function(e) {
    let that = this;
    let formData = e.detail.value.inputVal; //获取表单所有name=id的值 
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        title: formData,
        village: that.data.qyName,
        pageSize:100
      },
      method:'POST',
      // 获取列表数据
      realSuccess: function (resultData) {
          that.setData({
            specialsList: resultData.dataList,
            newHousingList: resultData.dataList,
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
   // 获取下拉框数据
  dowQuery:function(e) {
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
      },
      method:'POST',
      // 获取列表数据
      realSuccess: function (resultData) {
        let dowQuery = resultData.dataList;
          that.setData({
            dowQuery: resultData.dataList
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
  // 跳转详情列表
  detailsList: function (event){
    let { id, housetype, rentable, describes, intdetail, baseservicer } = event.currentTarget.dataset
    if (housetype === 1 && rentable==='1'){//跳转写字楼租详情页
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
    this.setData({
      homeData: homeData.local_database,
      // homeListData: homeListData.local_homeListdata
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
    let sid = wx.getStorageSync('sid');
    checkAppLogin(sid, function () {
      this.getSpecialsList()
      this.getNewhousingList()
      this.dowQuery()
      this.adList()
    }, this)
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