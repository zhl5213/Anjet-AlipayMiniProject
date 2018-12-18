Page({
  data: {
    chooseAmount:0.5,
    leftButtonViewClassName:"buttonViewLeft",
    rightButtonViewClassName:"buttonViewRight",
    deviceNumber:""
    },

  onLoad(options) {
    if (options.deviceNumber) {
      this.setData({
        deviceNumber: options.deviceNumber
      })
    }
  },

  onShow(){
    console.log("scan to charge onshow,");

  },

  rightButtonTapped(){
    this.setData({
      leftButtonViewClassName: "buttonViewRight",
      rightButtonViewClassName: "buttonViewLeft", 
      chooseAmount:1,
    })
    },

  leftButtonTapped() {
    this.setData({
      leftButtonViewClassName: "buttonViewLeft",
      rightButtonViewClassName: "buttonViewRight",
      chooseAmount: 0.5,
    })
  },

  payButtonTapped(){
    if (this.data.deviceNumber.length < 1){
      my.showToast({
        content:"设备编号有误",
        success: (res) => {
        },
      });
      return
    }
    var auth_code = "";
    let macNumber = this.data.deviceNumber;
    my.getAuthCode({
      scopes: 'auth_base',
      success: (res) => {
        auth_code = res.authCode;
        my.showLoading({
          success: (res) => {
          },
        });
        // 开始根据授权码要求服务端发送交易订单
        my.httpRequest({
          url: 'http://192.168.0.196/api/xcx/alipay.php?',
          method: 'get',
          data: {
            uid: 693,
            terminal_type: 'alipayxcx',
            device_mac: macNumber,
            order_id: 1,
            sign: 10086,
            auth_code: auth_code,
          },
          dataType: 'json',
          success: function(res) {
            // my.alert({ content: 'success' });
            console.log("get tradeNo success,",res);
            if (res.data.data.tradeNoSUC === "1"){
              let tradeNo = res.data.data.tradeNo;
              my.tradePay({
                tradeNO: tradeNo,  
                success: (res) => {
                  console.log("trade success,res= macNumber=", JSON.stringify(res), macNumber);    
                  // 开始打开充电器              
                  my.httpRequest({
                    url: 'http://192.168.0.196/api/xcx/openDevice.php?', // 目标服务器url
                    data:{
                      mac: macNumber,
                      switch:1,
                      sign:10086,
                    },
                    success: (res) => {
                      
                    },
                    complete: function(res) {
                      console.log("open Device complete,res", res);   
                      let app = getApp();
                      app.openDeviceSuccess = true;
                      console.log("open Device success,app.openDeviceSuccess = ", app.openDeviceSuccess);  
                      app.macNumber = macNumber;             
                    },
                    fail: function(res) {
                      console.log("open Device fail,res", res); 
                    },
                  });
                },
              });
            }
          },
          fail: function(res) {
            my.alert({ content: '获取支付订单失败' });
            console.log("get tradeNo 失败,res", res);                  
          },
          complete: function(res) {
            // my.alert({ content: 'complete' });
            my.hideLoading();
            console.log("get tradeNo 完成,res", res);                  
          }
        });
      }
    });
  }
});
