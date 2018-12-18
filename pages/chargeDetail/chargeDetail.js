Page({
  data: {
    record:{},
    orderDetailTitle:[
      '购买套餐',
      '使用时间',
      '结束时间',
      '设备编码',
    ],
  },
  onLoad(options) {
    let recordStr = options.record;
    let recordObj = JSON.parse(recordStr);
    this.setData({
      record: recordObj
    })
    console.log('charge detail load options= recordStr= recordOBj=', options, recordStr, recordObj)
  },

  refundDetailTapped(){
    console.log('refundDetailTapped')
    my.navigateTo({
      url:"/pages/refundDetail/refundDetail"
    });
  }
});

