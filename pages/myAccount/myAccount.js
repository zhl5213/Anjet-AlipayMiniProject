Page({
  data: {
    bgColor: "#238CEE",
    phoneNumber:"",
    avarturRadius:80,
    cardGroup1:[{
      thumb : "/resources/myAccount/myChargeRecord.png",
      title : "我的充电订单"
    },
      {
        thumb : "/resources/myAccount/myCouple.png",
        title: "我的优惠券"
      }      
    ],
    cardGroup2: [{
      thumb: "/resources/myAccount/userProtocol.png",
      title: "用户协议"
    }],

    items1: [
      {
        thumb: "/resources/myAccount/myChargeRecord.png",
        title: "我的充电订单",
        arrow: true,
        align:"middle",
      },
      {
        thumb: "/resources/myAccount/myCouple.png",
        title: '我的优惠券',
        arrow: true,
        align: "middle",
      },
    ],

    items2: [
      {
        thumb: "/resources/myAccount/userProtocol.png",
        title: "用户协议",
        arrow: true,
        align: "middle",
      }
    ],
  },

  onLoad(options) {
    this.setData({
      phoneNumber: options.phoneNumber
    })
    my.setNavigationBar({
      backgroundColor:this.data.bgColor,
    })
  },

  // onCardClick(e){
  //   console.log("card click",e)
  // },

  onGroup1ItemClick(e){
    console.log("list item click", e)
    if (e.index === 0){
      my.navigateTo({ url:"/pages/myChargeRecord/myChargeRecord?record={}"});
    } else if (e.index === 1){
      my.navigateTo({ url: "/pages/coupon/coupon" });
    }
  },

  onGroup2ItemClick(e) {
    console.log("list item click", e)
    my.navigateTo({ url: "/pages/useProtocol/useProtocol" });
  }
});
