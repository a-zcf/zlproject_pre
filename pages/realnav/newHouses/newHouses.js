var { APIS } = require('../../../const');
var { request } = require('../../../libs/request');
var { checkAppLogin } = require('../../../libs/user');
var homeData = require('../../../data/data-home.js');
Page({
  data: {
    newHouseList: [],//新楼列表
    pageNo: 1, // 当前页数
    pageSize: 5, //每页条数
    loadingTip: "正在玩命加载中...",
    loadingHidden: false, //控制提示文字的显示隐藏
    hasMore: true, //是否还有数据 true 有，false没有
    imgList: APIS.IMG_LIST,//列表图片地址
    flxId:0,
    wylxId:0,
    bqId:0,
    jgqjId:0,
    pxId:0,
    gdName:'',//物业类型
    viewShowed: false,//显示结果view的状态
    formData: "",// 搜索框值
    // 下拉菜单
    first: '区域',
    second: '总价',
    thirds: '房型',
    fours: '更多',
    houseImg: 'https://www.scrol.top/house/',
    //总价
    zongjia: [
      { zjName: '50万以下', minTotalPriceEnd:50 },
      { zjName: '50-100万', minTotalPriceStart: 50, minTotalPriceEnd:100},
      { zjName: '100-200万', minTotalPriceStart: 100, minTotalPriceEnd: 200},
      { zjName: '200-300万', minTotalPriceStart: 200, minTotalPriceEnd: 300 },
      { zjName: '300-500万', minTotalPriceStart: 300, minTotalPriceEnd: 500 },
      { zjName: '500-700万', minTotalPriceStart: 500, minTotalPriceEnd: 700 },
      { zjName: '700-1000万', minTotalPriceStart: 700, minTotalPriceEnd: 1000 },
      { zjName: '1000万以上', minTotalPriceStart: 1000 },
    ],
    // 房源选择
    mianji: [
      { mjName: '1卧', houseClasss:1 },
      { mjName: '2卧', houseClasss: 2},
      { mjName: '3卧', houseClasss: 3},
      { mjName: '4卧', houseClasss: 4},
      { mjName: '5卧以上', houseClasss: 5}
    ],
    //物业类型
    gengduo: [{
      gdName: '公寓'
    }, {
      gdName: '独栋别墅'
    }, {
      gdName: '联排别墅'
    },
    {
      gdName: '土地'
    }
    ],
    zhuangxiu: [
      { zxName: '移民房', isSelected: false}, 
      { zxName: '自住房', isSelected: false}, 
      { zxName: '度假房', isSelected: false},
      { zxName: '户型方正', isSelected: false},
      { zxName: '带花园', isSelected: false},
      { zxName: '核心地段', isSelected: false},
      { zxName: '交通便利', isSelected: false},
      { zxName: 'VR看房', isSelected: false},
      { zxName: '不限购', isSelected: false},
    ],
    //筛选
    shaixuan: [
      { sxName: '默认', houseType: 2}, 
      { sxName: '最新', latest:'1'}, 
      { sxName: '总价从高到底', minTotalPriceSort: 'desc'}, 
      { sxName: '总价从低到高', minTotalPriceSort: 'asc'}, 
      { sxName: '单价从高到底', minUnitPriceSort: 'desc'}, 
      { sxName: '单价从低到高', minUnitPriceSort: 'asc'},
      { sxName: '开盘时间降序', openDateSort: 'desc'},
      { sxName: '开盘时间升序', openDateSort: 'asc'}
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
      displays: "none"
    });
    this.conditionalQuery(e);
  },
  catchTouchMove: function (res) {
    return false
  },
  // 新房列表
  newHouseList:function(replace = true){
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType:2,
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (replace) {
          that.setData({
            newHouseList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          }) 
        } else {
          that.setData({
            newHouseList: that.data.newHouseList.concat(resultData.dataList),
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
  newHouseQuery: function (e) {
    let that = this;
    let formData = e.detail.value.inputVal; //获取表单所有name=id的值 
    that.setData({
      formData: formData
    })
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        title: formData,
        houseType: 2,
        // pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      // 获取列表数据
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            newHouseList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            newHouseList: that.data.newHouseList.concat(resultData.dataList),
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        }
        // that.setData({
        //   newHouseList: resultData.dataList,
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
    let { village, totastart, totaend, housetype, latest, totasort, unitsort, datasort} = e.currentTarget.dataset
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 2,
        // pageNo: that.data.pageNo,
        pageSize: that.data.pageSize,
        village: village, // 区域列表
        houseClasss: that.data.houseClasss,//房型选择
        minTotalPriceStart: totastart, //总价最小值
        minTotalPriceEnd: totaend, //总价最大值
        latest: latest,//最新排序
        minTotalPriceSort: totasort, // 总价高低排序
        minUnitPriceSort: unitsort, // 单价排序
        describes: that.data.gdName,//物业类型
        openDateSort: datasort,//开盘时间排序
      },

      method: 'POST',
      // 获取列表数据
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            newHouseList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            newHouseList: that.data.newHouseList.concat(resultData.dataList),
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
  //房源类型选择
  fangxingxuanze:function(e){
    let flxId = e.currentTarget.dataset.index;
    let houseClasss = e.currentTarget.dataset.houseclasss;
    this.setData({
      flxId:flxId,
      houseClasss: houseClasss,
    });
    this.conditionalQuery(e);
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
  //标签
  biaoqian:function(e){
    let that = this
    let bqId = e.currentTarget.dataset.index;
    let gdName = e.currentTarget.dataset.bqname;
    // let bqList = that.data.zhuangxiu[bqId];
    // bqList.isSelected = !bqList.isSelected;
    that.setData({
      bqId: bqId,
      gdName: gdName
    })
    that.conditionalQuery(e);
  },
  //总价范围查询
  zongjia: function (e) {
    let that = this
    let zjId = e.currentTarget.dataset.index;
    let zongjiaList = that.data.zongjia[zjId];
    zongjiaList.isSelected = !zongjiaList.isSelected;
    that.setData({
      zongjia: that.data.zongjia
    })
    that.conditionalQuery(e);
  },
  jgqj:function(e){
    let jgqjId = e.currentTarget.dataset.index;
    this.setData({
      jgqjId: jgqjId
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
  //最近开盘
  zuijinkaipen:function(e){
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 2,
        newhouseType:0,
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            newHouseList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            newHouseList: that.data.newHouseList.concat(resultData.dataList),
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
  //优惠楼盘
  youHuiLouPan:function(e){
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 2,
        newhouseType:1,
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            newHouseList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            newHouseList: that.data.newHouseList.concat(resultData.dataList),
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
  //优选房源
  youXuanFangYuan:function(e){
    let that = this;
    request({
      url: APIS.HOUSE_QUERY,
      data: {
        houseType: 2,
        newhouseType:2,
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      method: 'POST',
      realSuccess: function (resultData) {
        let tips = resultData.hasMore ? '正在玩命加载中...' : '无更多数据';
        if (e) {
          that.setData({
            newHouseList: resultData.dataList,
            hasMore: resultData.hasMore,
            loadingTip: tips,
          })
        } else {
          that.setData({
            newHouseList: that.data.newHouseList.concat(resultData.dataList),
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
  //确定
  quding: function (e) {
    this.setData({
      displays: "none"
    })
  },
  // 重置
  chongzhi: function () {
    this.setData({
      flxId: 0,
      wylxId: 0,
      bqId: 0,
      jgqjId: 0,
      pxId: 0,
      gdName: '',//物业类型
    });
    this.newHouseList();
  },
  //跳转新房列表
  newHousesDetail:function(e){
    let { id, describes, intdetail, baseservicer} = e.currentTarget.dataset
     wx.navigateTo({
       url: '../../detailsPage/newHousDetails/newHousDetails?id=' + id + '&describes=' + describes + '&intdetail =' + intdetail + '&baseservicer' + baseservicer,
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid = wx.getStorageSync('sid');
    checkAppLogin(sid, function () {
      this.newHouseList();
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
    let { pageNo, pageSize, newHouseList} = this.data;
    if ((newHouseList.length / pageNo) === pageSize ) {
      this.setData({
        pageNo: this.data.pageNo + 1, //每次触发上拉事件，把searchPageNum+1  
      });
      this.newHouseList(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})