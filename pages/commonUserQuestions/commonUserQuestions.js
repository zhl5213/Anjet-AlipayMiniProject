Page({
  data: {
    items: [
      {
        thumb: '/resources/commonUserQuestions/questionMark.png',
        title: '支付成功后，无法进行充电？',
        brief: '请致电客服，说明情况，申请退款',
        multipleLine:true,
        wrap:true,
        arrow: false,
        align: "top",
      },
      {
        thumb: '/resources/commonUserQuestions/questionMark.png',
        title: '提前结束充电，能否退款？',
        brief: '自己提前结束充电，不进行退款，使用权限也随之停止。',
        multipleLine: true,
        wrap: true,
        arrow: false,
        align:"top",
      },
      {
        thumb: '/resources/commonUserQuestions/questionMark.png',
        title: '申请退款后，多久能到账？退回哪里？',
        brief: '申请退款后，一天左右能够到账，退回到支付宝账户',
        multipleLine: true,
        wrap: true,
        arrow: false,
        align: "top",
      },
      {
        thumb: '/resources/commonUserQuestions/questionMark.png',
        title: '设备被损坏，无法扫码充电怎么办？',
        brief: '拨打售后电话',
        multipleLine: true,
        wrap: true,
        arrow: false,
        align: "top",
      },
    ],
  },
  onLoad() {
    
  },

  contactPhoneIsTapped(){
    my.makePhoneCall({ number:'700-8569-2324'})
  }
});
