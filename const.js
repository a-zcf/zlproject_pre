var monthFormatList = [
  { arabic: 1, eng: 'January', simpleEng: 'Jan' },
  { arabic: 2, eng: 'February', simpleEng: 'Feb' },
  { arabic: 3, eng: 'March', simpleEng: 'Mar' },
  { arabic: 4, eng: 'April', simpleEng: 'Apr' },
  { arabic: 5, eng: 'May', simpleEng: 'May' },
  { arabic: 6, eng: 'June', simpleEng: 'Jun' },
  { arabic: 7, eng: 'July', simpleEng: 'Jul' },
  { arabic: 8, eng: 'August', simpleEng: 'Aug' },
  { arabic: 9, eng: 'September', simpleEng: 'Sep' },
  { arabic: 10, eng: 'October', simpleEng: 'Oct' },
  { arabic: 11, eng: 'November', simpleEng: 'Nov' },
  { arabic: 12, eng: 'December', simpleEng: 'Dec' },
];

var dayFormatList = [
  { chi: '星期天', eng: 'Sunday', simpleEng: 'Sun' },
  { chi: '星期一', eng: 'Monday', simpleEng: 'Mon' },
  { chi: '星期二', eng: 'Tuesday', simpleEng: 'Tues' },
  { chi: '星期三', eng: 'Wednesday', simpleEng: 'Wed' },
  { chi: '星期四', eng: 'Thursday', simpleEng: 'Thur' },
  { chi: '星期五', eng: 'Friday', simpleEng: 'Fri' },
  { chi: '星期六', eng: 'Saturday', simpleEng: 'Sat' }
];

// var reqHost = 'https://zl.haiyunzy.com/zlnewpro/xcxpath';
// //var reqImgHost = 'https://zl.haiyunzy.com/zlnewpro/imgs';
// var cdnHost = 'http://res.zhenlong.wang';//cdn地址
// var reqImgHost = 'http://res.zhenlong.wang/crowdweb';//目前显示图片地址， cdnPath+图片地址
//深圳经销商房源管理
var reqHousing = 'https://www.szxmyf.com.cn/house/xcxpath/';
var reqHouseImg = 'https://www.szxmyf.com.cn/house/'

var APIS = {
  // REQ_IMG_HOST:         reqImgHost,
  // LOGIN: 										reqHost + '/xcxUserLogin/wx/login',
  // CHECK_SESSION: 						reqHost + '/xcxUserLogin/wx/checkSession',
  // FILE_UPLOAD:              reqHost + '/fileUpload',//删除图片
  // GET_BANNER: 						reqHost + '/getBanner',//首页banner  
  // PRODUCT_LIST:             reqHost + '/xcxZlProduct/list',//产品列表
  // PRODUCT_DETAIL:           reqHost + '/xcxZlProduct/detail',//产品详情
  //深圳经销商房源管理
  IMG_LIST: reqHouseImg,//列表图片
  HOUSE_LOGIN: reqHousing + '/xcxUserLogin/wx/login', //授权登陆
  HOUSE_CHECK_SESSION: reqHousing + '/xcxUserLogin/wx/checkSession', //校验登陆
  HOUSE_USERINFO: reqHousing + '/xcxUserLogin/wx/userInfo', //活跃用户信息
  HOUSE_QUERY: reqHousing + '/houseQuery/list',//房源列表
  HOUSE_DETAIL: reqHousing + '/houseQuery/detail', //房源详情
  AD_LIST: reqHousing + '/ad/list', //首页广告图
  HOUSE_FOOTPRINT: reqHousing + '/userSpace/myStepList', //历史足迹
  HOUSE_FOLLOW: reqHousing + '/userSpace/follow', //关注、取消关注
  HOUSE_CHECKFOLLOW: reqHousing + '/userSpace/checkFollow', //关注、取消关注
  HOUSE_MYFOLLOWLIST: reqHousing + '/userSpace/myFollowList' //关注、取消关注
};

var QQ_MAP_KEY = 'PLWBZ-AGPWS-LWBOA-6BJYO-ZUYYZ-O7FKK';

module.exports = {
    monthFormatList: monthFormatList,
    dayFormatList: dayFormatList,
    APIS: APIS,
    QQ_MAP_KEY: QQ_MAP_KEY
};
