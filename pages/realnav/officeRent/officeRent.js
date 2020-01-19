var { APIS } = require('../../../const');
var { request } = require('../../../libs/request');
const { checkAppLogin } = require('../../../libs/user');
var homeData = require('../../../data/data-home.js');
Page({
  data: {
    officeRentList: [], //写字楼租列表
    pageNo: 1, // 当前页数
    pageSize: 5, //每页条数
    loadingTip: "正在玩命加载中...",
    loadingHidden: false, //控制提示文字的显示隐藏
    hasMore: true, //是否还有数据 true 有，false没有
    imgList: APIS.IMG_LIST,//列表图片地址
    offList: [],
    indexId: 0, // 单价
    zjId: 0, //总价下标
    mianjiId: 0, //面积
    wylxId: 0, //物业类型
    zxId: 0, //装修
    tsId: 0, //特色
    gdName: '',
    inputVal: "", // 搜索框值
    // 下拉菜单
    first: '区域',
    second: '租金',
    thirds: '面积',
    fours: '更多',
    //租金
    zujin: [{
      'indexId': 1,
      'text': '50元/㎡ 以下',
      'minUnitPriceEnd': 50,
      isSelected: false
    },
    {
      'indexId': 2,
      'text': '50-80/㎡',
      'minUnitPriceStart': 50,
      'minUnitPriceEnd': 80,
      isSelected: false
    },
    {
      'indexId': 3,
      'text': '80-120/㎡',
      'minUnitPriceStart': 80,
      'minUnitPriceEnd': 120,
      isSelected: false
    },
    {
      'indexId': 4,
      'text': '120-160/㎡',
      'minUnitPriceStart': 120,
      'minUnitPriceEnd': 160,
      isSelected: false
    },
    {
      'indexId': 5,
      'text': '160-200/㎡',
      'minUnitPriceStart': 160,
      'minUnitPriceEnd': 200,
      isSelected: false
    },
    {
      'indexId': 6,
      'text': '200/㎡ 以上',
      'minUnitPriceStart': 200,
      isSelected: false
    },
    ],
    zongjia: [{
      'zjId': 1,
      'text': '0.5万元/月以下',
      'minTotalPriceEnd': 0.5,
      isSelected: false
    },
    {
      'zjId': 2,
      'text': '0.5-1万/月',
      'minTotalPriceStart': 0.5,
      'minTotalPriceEnd': 1,
      isSelected: false
    },
    {
      'zjId': 3,
      'text': '1-2万/月',
      'minTotalPriceStart': 1,
      'minTotalPriceEnd': 2,
      isSelected: false
    },
    {
      'zjId': 4,
      'text': '2-3万/月',
      'minTotalPriceStart': 2,
      'minTotalPriceEnd': 3,
      isSelected: false
    },
    {
      'zjId': 5,
      'text': '3-5万/月',
      'minTotalPriceStart': 3,
      'minTotalPriceEnd': 5,
      isSelected: false
    },
    {
      'zjId': 6,
      'text': '5-10万/月',
      'minTotalPriceStart': 5,
      'minTotalPriceEnd': 10,
      isSelected: false
    },
    {
      'zjId': 7,
      'text': '10万/月以上',
      'minTotalPriceStart': 10,
      isSelected: false
    },
    ],
    // 面积选择
    mianji: [{
      'mjName': '50㎡以上',
      'minHouseAreaEnd': 50
    },
    {
      'mjName': '50-100㎡',
      'minHouseAreaStart': 50,
      'minHouseAreaEnd': 100
    },
    {
      'mjName': '100-150㎡',
      'minHouseAreaStart': 100,
      'minHouseAreaEnd': 150
    },
    {
      'mjName': '150-200㎡',
      'minHouseAreaStart': 150,
      'minHouseAreaEnd': 200
    },
    {
      'mjName': '200-300㎡',
      'minHouseAreaStart': 200,
      'minHouseAreaEnd': 300
    },
    {
      'mjName': '300-500㎡',
      'minHouseAreaStart': 300,
      'minHouseAreaEnd': 500
    },
    {
      'mjName': '500-1000㎡',
      'minHouseAreaStart': 500,
      'minHouseAreaEnd': 1000
    },
    {
      'mjName': '1000以上㎡',
      'minHouseAreaStart': 1000,
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
      latestSort: 'desc',
    }, {
      sxName: '租金从低到高',
      minUnitPriceSort: 'asc'
    }, {
      sxName: '租金从高到底',
      minUnitPriceSort: 'desc'
    }, {
      sxName: '面积从小到大',
      minHouseAreaSort: 'asc'
    }, {
      sxName: '面积从大到小',
      minHouseAreaSort: 'desc'
    }],
    qyid: 0,
    pxId: 0,
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
    var id = e.currentTarget.dataset.id; //获取自定义的ID值
    this.setData({
      qyid: id,
      displays: "none"
    })
    this.conditionalQuery(e)
  },
  //禁止滑动
  catchTouchMove: function (res) {
    return false
  },
  // 写字楼租
  officeRentList: function (replace) {
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 1,
        rentable: "1",
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize,
      },
      method: 'POST',
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (replace) {
          that.setData({
            officeRentList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          }) 
        } else {
          that.setData({
            officeRentList: that.data.officeRentList.concat(resultData.dataList),
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

  // 模糊查询
  fuzzyQuery: function (e) {
    let that = this;
    let formData = e.detail.value.inputVal; //获取表单所有name=id的值 
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        title: formData,
        houseType: 1,
        rentable: "1",
        pageSize: that.data.pageSize
      },
      method: 'POST',
      // 获取列表数据
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            officeRentList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            officeRentList: that.data.officeRentList.concat(resultData.dataList),
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
  // 单价范围查询
  danjia: function (e) {
    let that = this
    let indexId = e.currentTarget.dataset.indexid;
    that.setData({
      indexId: indexId
    })
    that.conditionalQuery(e);
  },
  //总价范围查询
  zongjia: function (e) {
    let that = this
    let zjId = e.currentTarget.dataset.index;
    that.setData({
      zjId: zjId
    })
    that.conditionalQuery(e);
  },
  //面积
  mianji: function (e) {
    let mianjiId = e.currentTarget.dataset.index;
    this.setData({
      mianjiId: mianjiId,
    });
    this.conditionalQuery(e)
  },
  //物业类型
  wylx: function (e) {
    let wylxId = e.currentTarget.dataset.index;
    let gdName = e.currentTarget.dataset.gdname; //物业类型
    this.setData({
      wylxId: wylxId,
      gdName: gdName,
    });
    this.conditionalQuery(e);
  },
  //装修
  zhuangxiu: function (e) {
    let zxId = e.currentTarget.dataset.index;
    let gdName = e.currentTarget.dataset.zxname; //物业类型
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
      indexId: 0, // 单价
      zjId: 0, //总价下标
      mianjiId: 0, //面积
      wylxId: 0, //物业类型
      zxId: 0, //装修
      tsId: 0, //特色
      gdName: '',
    });
    this.officeRentList();
  },
  // 条件查询
  conditionalQuery: function (e) {
    let that = this;
    let { vill, unitstart, unitend, totalstart, totalend, areastart, areaend, latestdesc, unitsort, housesort} = e.currentTarget.dataset
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 1,
        rentable: "1",
        // pageNo: that.data.pageNo,
        pageSize: that.data.pageSize,
        village: vill, // 区域列表
        minUnitPriceStart: unitstart, // 单价最小值
        minUnitPriceEnd: unitend, //单价最大值
        minTotalPriceStart: totalstart, // 总价最小值
        minTotalPriceEnd: totalend, // 总价最大值
        minHouseAreaStart: areastart, //面积最小值
        minHouseAreaEnd: areaend, //面积最大值
        describes: that.data.gdName, //物业类型
        latestSort: latestdesc, //新房源在前
        minUnitPriceSort: unitsort, // 租金大排序
        minHouseAreaSort: housesort, // 面积大小排序
      },

      method: 'POST',
      // 获取列表数据
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            officeRentList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            officeRentList: that.data.officeRentList.concat(resultData.dataList),
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
  //跳转详情
  officeRentDetails: function (e) {
    let {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../../detailsPage/rentDetails/rentDetails?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid = wx.getStorageSync('sid');
      checkAppLogin(sid, function () {
        this.officeRentList();
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
    let { pageNo, pageSize, officeRentList} = this.data;
    if ((officeRentList.length / pageNo) === pageSize ) {
      this.setData({
        pageNo: this.data.pageNo + 1, //每次触发上拉事件，把searchPageNum+1  
      });
      this.officeRentList(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})