var { APIS } = require('../../../const');
var { request } = require('../../../libs/request');
const { checkAppLogin } = require('../../../libs/user');
var homeData = require('../../../data/data-home.js');

Page({
  data: {
    officeSalesList: [], //写字楼售列表
    pageNo: 1, // 当前页数
    pageSize: 5, //每页条数
    loadingTip: "正在玩命加载中...",
    loadingHidden: false, //控制提示文字的显示隐藏
    hasMore: true, //是否还有数据 true 有，false没有
    imgList: APIS.IMG_LIST,//列表图片地址
    indexId:0,
    mjId:0,
    wylxId:0,
    zxId:0,
    tsId:0,
    pxId:0,
    gdName:'',
    viewShowed: false, //显示结果view的状态
    formData: "", // 搜索框值
    // 下拉菜单
    first: '区域',
    second: '售价',
    thirds: '面积',
    fours: '更多',
    //售价
    shoujia: [{
        zjName: '200万以下',
        'minUnitPriceEnd': 200,
      },
      {
        zjName: '200-300万',
        minUnitPriceStart: 200,
        minUnitPriceEnd: 300,
      },
      {
        zjName: '300-500万',
        minUnitPriceStart: 300,
        minUnitPriceEnd: 500,
      },
      {
        zjName: '500-800万',
        minUnitPriceStart: 500,
        minUnitPriceEnd: 800,
      },
      {
        zjName: '800-1200万',
        minUnitPriceStart: 800,
        minUnitPriceEnd: 1200,
      },
      {
        zjName: '1200-2000万',
        minUnitPriceStart: 1200,
        minUnitPriceEnd: 2000,
      },
      {
        zjName: '2000-5000万',
        minUnitPriceStart: 2000,
        minUnitPriceEnd: 5000,
      },
      {
        zjName: '5000万以上',
        minUnitPriceStart: 5000,
      },
    ],
    zongjia: [{
        zjName: '0.5万元/月 以下'
      },
      {
        zjName: '0.5-1万/月'
      },
      {
        zjName: '1-2万/月'
      },
      {
        zjName: '2-3万/月'
      },
      {
        zjName: '3-5万/月'
      },
      {
        zjName: '5-10万/月'
      },
      {
        zjName: '10万/月以上'
      }
    ],
    // 面积选择
    mianji: [{
        mjName: '50㎡以下',
      minHouseAreaEnd: 50
      },
      {
        mjName: '50-100㎡',
        minHouseAreaStart:50,
        minHouseAreaEnd:100
      },
      {
        mjName: '100-150㎡',
        minHouseAreaStart: 100,
        minHouseAreaEnd: 150
      },
      {
        mjName: '150-200㎡',
        minHouseAreaStart: 150,
        minHouseAreaEnd: 200
      },
      {
        mjName: '200-300㎡',
        minHouseAreaStart: 200,
        minHouseAreaEnd: 300
      },
      {
        mjName: '300-500㎡',
        minHouseAreaStart: 300,
        minHouseAreaEnd: 500
      },
      {
        mjName: '500-1000㎡',
        minHouseAreaStart: 500,
        minHouseAreaEnd: 1000
      },
      {
        mjName: '1000以上㎡',
        minHouseAreaStart: 1000,
      }
    ],
    //物业类型
    gengduo: [{
      gdName: '甲级写字楼'
    }, {
      gdName: '普通写字楼'
    }, {
      gdName: '商住两用'
    }],
    zhuangxiu: [{
      zxName: '毛坯'
    }, {
      zxName: '简装'
    }, {
      zxName: '精装'
    }],
    tese: [{
      tsName: '近地铁'
    }, {
      tsName: '整栋'
    }, {
      tsName: '整层'
    }, {
      tsName: '新上'
    }],
    //筛选
    shaixuan: [{
      sxName: '默认'
    }, {
      sxName: '新上房源在前',
        latestSort: 'desc'
    }, {
      sxName: '总价从低到高',
        minTotalPriceSort: 'asc'
    }, {
      sxName: '总价从高到底',
        minTotalPriceSort: 'desc'
    }, {
      sxName: '面积从小到大',
        minHouseAreaSort: 'asc'
    }, {
      sxName: '面积从大到小',
        minHouseAreaSort: 'desc'
    }],
    qyid: 0,
    isShow: true,
    currentTab: 0,
  },
  // 下拉切换
  hideNav: function() {
    this.setData({
      displays: "none"
    })
  },
  // 区域
  tabNav: function(e) {
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
  qiehuanqy: function(e) {
    let id = e.currentTarget.dataset.id; //获取自定义的ID值
    this.setData({
      qyid: id,
      displays: "none"
    });
    this.conditionalQuery(e);
  },

  // 禁止滑动
  catchTouchMove: function(res) {
    return false
  },
  // 写字楼售列表
  officeSalesList: function(replace = true) {
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 1,
        rentable: "0",
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      realSuccess: function(resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (replace) {
          that.setData({
            officeSalesList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          }) 
        } else {
          that.setData({
            officeSalesList: that.data.officeSalesList.concat(resultData.dataList),
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        }
      },
      realFail: function(resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      },
      realComplete: function(resultMsg) {
        
        wx.showToast({
          title: resultMsg
        });
      }
    }, false, that)
  },
  // 清除搜索框值
  clearInput: function() {
    this.setData({
      formData: ''
    });
  },
  // 模糊查询
  salesQueryList: function(e) {
    let that = this;
    let formData = e.detail.value.inputVal; //获取表单所有name=id的值 
    that.setData({
      formData: formData
    })
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        title: formData,
        houseType: 1,
        rentable: "0",
        // pageNo: that.data.pageNo,
        pageSize: that.data.pageSize,
      },
      method: 'POST',
      // 获取列表数据
      realSuccess: function(resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            officeSalesList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            officeSalesList: that.data.officeSalesList.concat(resultData.dataList),
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        }
      },
      //返回失败信息提示
      realFail: function(resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      },
      realComplete: function(resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      }
    }, false, that)
  },
  // 条件查询
  conditionalQuery: function(e) {
    let that = this;
    let { village, unitstart, unitend, housestart, houserend, latestdesc, totalsort, housesort} = e.currentTarget.dataset
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 1,
        rentable: "0",
        // pageNo: that.data.pageNo,
        pageSize: that.data.pageSize,
        village: village, // 区域列表
        minUnitPriceStart: unitstart, // 单价最小值
        minUnitPriceEnd: unitend, //单价最大值
        minHouseAreaStart: housestart, //面积最小值
        minHouseAreaEnd: houserend, //面积最大值
        describes: that.data.gdName,//物业类型
        latestSort: latestdesc, //新房源在前
        totalSort: totalsort, // 总价高低排序
        minHouseAreaSort: housesort, // 面积高低排序
      },

      method: 'POST',
      // 获取列表数据
      realSuccess: function(resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            officeSalesList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            officeSalesList: that.data.officeSalesList.concat(resultData.dataList),
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        }
        // that.setData({
        //   officeSalesList: resultData.dataList,
        // });
      },
      //返回失败信息提示
      realFail: function(resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      },
      realComplete: function(resultMsg) {
        wx.showToast({
          title: resultMsg
        });
      }
    }, false, that)
  },
  // 售价区间查询
  shoujia: function (e) {
    let that = this
    let indexId = e.currentTarget.dataset.index;
    that.setData({
      indexId: indexId
    })
    that.conditionalQuery(e);
  },
  // 面积选择
  mianji: function (e) {
    let that = this
    let mjId = e.currentTarget.dataset.index;
    that.setData({
      mjId: mjId
    })
    that.conditionalQuery(e);
  },
  //物业类型
  wylx: function (e) {
    let wylxId = e.currentTarget.dataset.index;
    let gdName = e.currentTarget.dataset.gdname;//物业类型
    this.setData({
      wylxId: wylxId,
      gdName: gdName,
    });
    this.conditionalQuery(e);
  },
  //装修
  zhuangxiu: function (e) {
    let zxId = e.currentTarget.dataset.index;
    let gdName = e.currentTarget.dataset.zxname;
    this.setData({
      zxId: zxId,
      gdName: gdName,
    });
    this.conditionalQuery(e);
  },
  //特色
  tese: function (e) {
    let tsId = e.currentTarget.dataset.index;
    let gdName = e.currentTarget.dataset.tsname;
    this.setData({
      tsId: tsId,
      gdName: gdName,
    });
    this.conditionalQuery(e);
  },
  // 排序
  paixu: function (e) {
    let pxId = e.currentTarget.dataset.index;
    this.setData({
      pxId: pxId,
      // latestDesc: latestDesc,
      // unitSort: unitSort,
      // houseSort: houseSort,
      displays: "none"
    });
    this.conditionalQuery(e)
  },
  //确定
  quding: function (e) {
    this.setData({
      displays: "none"
    })
  },
  // 重置
  chongzhi: function () {
    this.setData({
      indexId: 0,// 清空售价值
      mjId: 0,//清空面积值
      wylxId: 0,
      zxId: 0,
      tsId: 0,
      pxId: 0,
      gdName: '',
    });
    this.officeSalesList();
  },
  //跳转写字楼售
  salesDetails: function(e) {
    let { id, describes, intdetail, baseservicer} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../../detailsPage/salesDetails/salesDetails?id=' + id + '&describes=' + describes + '&intdetail =' + intdetail + '&baseservicer' + baseservicer,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let sid = wx.getStorageSync('sid');
    checkAppLogin(sid, function () {
      this.officeSalesList()
    }, this)
    this.setData({
      homeData: homeData.local_database,
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let { pageNo, pageSize, officeSalesList} = this.data;
    if ((officeSalesList.length / pageNo) === pageSize ) {
      this.setData({
        pageNo: this.data.pageNo + 1, //每次触发上拉事件，把searchPageNum+1  
      });
      this.officeSalesList(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})