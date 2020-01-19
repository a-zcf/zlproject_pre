var { APIS } = require('../const');

function login(cb, ctx, needCheckSession) {

  if (needCheckSession) {
    var sid = wx.getStorageSync('sid');
    // 如果有sid，执行逻辑
    if (sid) {
      // typeof cb == "function" && cb.call(ctx);
      checkAppLogin(sid, cb, ctx);
      // 如果没有sid，重新wx登录
    } else {
      rawLogin(cb, ctx);
    }
  } else {
    rawLogin(cb, ctx);
  }
}

// wx登录
function rawLogin(cb, ctx) {
  wx.login({
    success: function (res) {
      if (res.code) {
        var code = res.code
        wx.getUserInfo({
          success: function (res) {
            var d = {
              code: code,
              user_raw: res.userInfo,
              signature: res.signature,
              encryptedData: res.encryptedData,
              rawData: res.rawData,
              iv: res.iv
            }
            console.log(d);
            wx.setStorageSync('userInfo', res.userInfo);
            doAppLogin(d, cb, ctx);
          },
          fail: function (res) {
            wx.showToast({
              title: '请刷新授权！'
            });
          }
        });
      } else {
        wx.showToast({
          title: '登录失败！'
        });
      }
    },
    fail: function () {
      wx.showToast({
        title: '登录失败！'
      });
    }
  });
}

// app检查sid的有效性
function checkAppLogin(sid, cb, ctx) {
  wx.request({
    url: APIS.HOUSE_CHECK_SESSION,
    data: {
      sid: sid
    },
    method: 'POST',
    success: function (res) {
      var d = res.data;
      // console.log(sid)
      if (d.errCode == '0000') {//  如果sid有效
        // var sid = d.sid;
        // wx.setStorageSync('sid', sid);
        typeof cb == "function" && cb.call(ctx);
      } else {// 如果sid无效
        rawLogin(cb, ctx);
        // wx.switchTab({
        //   url: '/pages/login/login'
        // })
        // wx.navigateTo({
        //   url: '/pages/login/login'
        // })
      }
    },
    fail: function (res) {
      // fail
      rawLogin(cb, ctx);
      // wx.switchTab({ url:'/pages/login/login'});
    }
  })
}

// app的登录
function doAppLogin(data, cb, ctx) {
  wx.request({
    url: APIS.HOUSE_LOGIN,
    data: data,
    method: 'POST',
    success: function (res) {
      var d = res.data;
      if (d.errCode == '0000' && d.sid) {
        var sid = d.sid;
        wx.setStorageSync('sid', sid);
        typeof cb == "function" && cb.call(ctx);
      } else {
        wx.showToast({
          icon: 'none',
          title: '登录失败！' + d.resultMsg,
          duration: 1500
        });
      }
    },
    fail: function (res) {
      // fail
      wx.showToast({
        title: '登录失败！'
      });
    }
  })
}


function checkAuthor() {
  // 查看是否授权
  var flag = false;
  wx.getSetting({
    success: function (res) {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
          success: function (res) {
            flag = true;
          }
        })
      }
    }
  });
  return flag;
}

module.exports = {
  login: login,
  checkAuthor: checkAuthor,
  checkAppLogin: checkAppLogin,

}