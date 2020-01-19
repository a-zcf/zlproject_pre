var { APIS } = require('../../../const');
var { request } = require('../../../libs/request');
var { checkAppLogin } = require('../../../libs/user');
var homeData = require('../../../data/data-home.js');
Page({
  data: {
    sharedOfficeList: [],//共享办公列表
    pageNo: 1, // 当前页数
    pageSize: 5, //每页条数
    loadingTip: "正在玩命加载中...",
    loadingHidden: false, //控制提示文字的显示隐藏
    hasMore: true, //是否还有数据 true 有，false没有
    imgList : APIS.IMG_LIST,//列表图片地址
    zjId: 0,
    viewShowed: false,//显示结果view的状态
    formData: "",// 搜索框值
    // 下拉菜单 
    first: '区域',
    thirds: '总价', 
    fours: '更多',
    // 全部
    mianji: [
      { mjName: '0-1000元/工位/月', minTotalPriceEnd:1000 },
      { mjName: '1000-2000元/工位/月', minTotalPriceStart: 1000, minTotalPriceEnd:2000 },
      { mjName: '2000-3000元/工位/月', minTotalPriceStart: 2000, minTotalPriceEnd: 3000 },
      { mjName: '3000元/工位/月以上', minTotalPriceStart:3000},
    ],
    //更多
    leixing: [
      { name: 'QB', value: '全部', checked: 'true', officeType:'' },
      { name: 'PTBG', value: '普通办公',officeType:'0' },
      { name: 'GXBG', value: '共享办公', officeType: '1' },
      { name: 'CYYQ', value: '创意园区',  officeType: '2' }
    ],
    zhuangxiu: [
      { name: 'QB', value: '全部', checked: 'true', fitup:'' },
      { name: 'HHZX', value: '豪华装修', fitup:0},
      { name: 'JZX', value: '精装修', fitup: 1 },
      { name: 'MP', value: '毛坯', fitup: 2 }
    ],
    ts: [
      { name: 'BX', value: '不限', checked: 'true' },
      { name: 'KZC', value: '可注册' },
      { name: 'ZD', value: '整栋' },
      { name: 'DTSFZ', value: '地铁10分钟' }
    ],
    qyid: 0,
    isShow: true,
    currentTab: 0,
  },
  // 下拉切换
  hideNav: function () {
    this.setData({
      displays: "none"
    })
  },
  // 区域
  tabNav: function (e) {
    this.setData({
      displays: "block"
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  qiehuanqy: function (e) {
    let id = e.currentTarget.dataset.id; //获取自定义的ID值
    this.setData({
      qyid: id,
      // village: village,
      displays: "none"
    });
    this.conditionalQuery(e);
  },
  catchTouchMove: function (res) {
    return false
  },

  // 共享办公列表
  sharedOfficeList: function (replace = true) {
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 3,
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (replace) {
          that.setData({
            sharedOfficeList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          }) 
        } else {
          that.setData({
            sharedOfficeList: that.data.sharedOfficeList.concat(resultData.dataList),
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        }
      },
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
  // 清除搜索框值
  clearInput: function () {
    this.setData({
      formData: ''
    });
  },
  // 模糊查询
  sharedOfficeQuery: function (e) {
    let that = this;
    let formData = e.detail.value.inputVal; //获取表单所有name=id的值 
    that.setData({
      formData: formData
    })
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        title: formData,
        houseType: 3,
        // pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      // 获取列表数据
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            sharedOfficeList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            sharedOfficeList: that.data.sharedOfficeList.concat(resultData.dataList),
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        }
        // that.setData({
        //   sharedOfficeList: resultData.dataList,
        // });
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
  // 条件查询
  conditionalQuery: function (e) {
    let that = this;
    let { village, totastart, totalend} = e.currentTarget.dataset
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 3,
        // pageNo: that.data.pageNo,
        pageSize: that.data.pageSize,
        village: village, // 区域列表
        fitup:that.data.val,
        officeType:that.data.val,
        minTotalPriceStart: totastart, //总价最小值
        minTotalPriceEnd: totalend, //总价最大值
      },

      method: 'POST',
      // 获取列表数据
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            sharedOfficeList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            sharedOfficeList: that.data.sharedOfficeList.concat(resultData.dataList),
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
  //总价
  zongjia: function (e) {
    let that = this
    let zjId = e.currentTarget.dataset.index;
    that.setData({
      zjId: zjId
    })
    that.conditionalQuery(e);
  },
  //跳转共享办公详情
  sharedDetail:function(e){
    let { id, baseservicer, entservicer, describes, intdetail} = e.currentTarget.dataset
   wx.navigateTo({
     url: '../../detailsPage/sharedDetails/sharedDetails?id=' + id + '&baseservicer=' + baseservicer + '&entservicer=' + entservicer + '&describes=' + describes + '&intdetail =' + intdetail,})
  },
  radioChange: function (e) {
    let val = e.detail.value
    this.setData({
      val:val,
    });
    this.conditionalQuery(e);
  },
  //确定
  quding: function (e) {
    this.setData({
      displays: "none"
    })
  },
  // 重置
  chongzhi: function (e) {
    let leixing = this.data.leixing
    let zhuangxiu = this.data.zhuangxiu
    // 遍历类型
    for (let i = 0; i< leixing.length; i++){
         if(leixing[i].value=='全部'){
             leixing[i].checked=true
         }else{
           leixing[i].checked = false
         }
      }
    // 遍历装修
    for (let i = 0; i < zhuangxiu.length; i++){
      if (zhuangxiu[i].value=='全部'){
        zhuangxiu[i].checked=true
         }else{
        zhuangxiu[i].checked = false
         }
      }
    this.setData({
      zjId: 0,
      leixing: leixing,
      zhuangxiu: zhuangxiu,
    });
    this.sharedOfficeList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid = wx.getStorageSync('sid');
    checkAppLogin(sid, function () {
      this.sharedOfficeList();
    }, this)
    this.setData({
      homeData: homeData.local_database,
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
    let { pageNo, pageSize, sharedOfficeList} = this.data;
    if ((sharedOfficeList.length / pageNo) === pageSize ) {
      this.setData({
        pageNo: this.data.pageNo + 1, //每次触发上拉事件，把searchPageNum+1  
      });
      this.sharedOfficeList(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})