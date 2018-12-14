Page({
  data: {
    record:{},
    marginLeft: 207
  },
  onLoad(options) {
    var app = getApp();

    this.setData(
      {
        record: options.record,
        marginLeft: app.windowWidth / 2 - 180 / 2
      }
    )
  },
});
