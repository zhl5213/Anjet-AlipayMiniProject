Page({
  data: {
    couponInfo:{},
    marginLeft:207
  },
  
  onLoad() {
    console.log("couponInfo.length=",this.data.couponInfo)
    var app = getApp();
    this.setData({
      marginLeft:app.windowWidth/2-180/2
    })
  },
});
