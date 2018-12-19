Page({
  data: {
    marginLeft:100,
    bottomViewMarginTop:100,
  },
  onLoad() {
    var app = getApp();
    this.setData({
      marginLeft: app.windowWidth/2-100/2,
      bottomViewMarginTop: app.windowHeight-44-135-37.5-45-50,
    })
  },

  loginWithAccount(){
    my.getAuthCode({
      scopes: 'auth_base',
      success: (res) => {
        console.log(' getAuthCode success', res)
        // my.httpRequest({
        //   url: 'http://192.168.1.19/api/xcx/userRegisterOpenIDApi.php?', // 目标服务器url
        //   data:{
        //     openid: res.authCode,
        //     opentpye:"alipay",
        //     sign:10086,
        //   },
        //   success: (res) => {
            
        //   },
        //   complete: (res) => {

        //   },
        // });
        my.setStorageSync({
          key: 'userID', // 缓存数据的key
          data: '2090', // 要缓存的数据
        });
        my.navigateBack({});
      },
    });
  },

  bottomViewIsTapped(){
    console.info("bottom view is tapped");
    my.navigateTo({ url: '/pages/useProtocol/useProtocol' });
  }
});
