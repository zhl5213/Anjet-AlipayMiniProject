App({
    windowWidth: 375,
    windowHeight: 667,
    screenRatio: 1,
    isIphoneXSerial:false,
    openDeviceSuccess:false,
    macNumber:"",

  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    var that = this;
    console.info('App onLaunch', that.windowWidth);
    my.getSystemInfo({
      success: (res) => {
        console.log('get system info', res);
        that.windowWidth = res.windowWidth;
        that.screenRatio = 750 / that.windowWidth ;
        that.windowHeight = res.windowHeight;
        console.info('getSystemInfo', that.windowWidth, that.windowHeight);
        },
        fail: (res) => {
          my.alert({ title: '获取手机系统消息错误' });
        }
    });
  },

  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },

});
