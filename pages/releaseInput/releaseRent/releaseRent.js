const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
/* 封面上传 */
    uploaderList: [], // 已选择的图片临时路径数组
    uploaderNum: 0, // 已选择图片个数
    showUpload: true, // 用来判断是否可继续选择图片,当传至9张时不可继续上传
/* 其它上传 */
    uploaderListQt: [], // 已选择的图片临时路径数组
    uploaderNumQt: 0, // 已选择图片个数
    showUploadQt: true, // 用来判断是否可继续选择图片,当传至9张时不可继续上传
  },
  //封面展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //封面上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
  },
  // 封面删除图片
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },

  //其它展示图片
  showImgQt: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderListQt,
      current: that.data.uploaderListQt[e.currentTarget.dataset.index]
    })
  },
  //其它上传图片
  uploadQt: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNumQt, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderListQt = that.data.uploaderListQt.concat(tempFilePaths);
        if (uploaderListQt.length == 9) {
          that.setData({
            showUploadQt: false
          })
        }
        that.setData({
          uploaderListQt: uploaderListQt,
          uploaderNumQt: uploaderListQt.length,
        })
      }
    })
  },
  // 其它删除图片
  clearImgQt: function (e) {
    var nowList = [];//新数据
    var uploaderListQt = this.data.uploaderListQt;//原数据

    for (let i = 0; i < uploaderListQt.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderListQt[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNumQt - 1,
      uploaderListQt: nowList,
      showUploadQt: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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