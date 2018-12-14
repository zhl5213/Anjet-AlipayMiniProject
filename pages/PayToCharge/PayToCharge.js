Page({
  data: {
    chooseAmount:0.5,
    leftButtonViewClassName:"buttonViewLeft",
    rightButtonViewClassName:"buttonViewRight",
  },

  onLoad() {},

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
  }
});
