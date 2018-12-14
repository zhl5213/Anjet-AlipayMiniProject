Page({
  selectMarkerWidth: 40,
  selectedMarkerHeight: 50,
  selectedIconPath: "/resources/HomeMap/shopIconSelected.png",
  unSelectedIconPath: "/resources/HomeMap/shopIconUnselected.png",

  sacnViewWidth: 158,
  sacnViewHeight: 85,
  bottomViewCenterSpacing: 25 + 43/2,

  data: {
    myLocation: { longitude: "114.053394", latitude: "22.520438",},
    centerLocation: { longitude: "114.053394", latitude: "22.520438", },
    scale : 14,
    controls: [],
    showButtom:false,
    markers: [],
  },


  onLoad() {
    this.setData({
    markers: [{
      iconPath: this.unSelectedIconPath,
      id: 1,
      shop_address: "测试地点",
      shop_name: "安杰特充电基地",
      latitude: 22.520438,
      longitude: 114.053394,
      width: 40,
      height: 50,
    }, {
      iconPath: this.unSelectedIconPath,
      id: 2,
      shop_address: "锦绣商务大厦517",
      shop_name:"安杰特充电基地",
      latitude: 22.816690,
      longitude: 113.796990,
      width: 40,
      height: 50,
    }],
    })
    console.log('home page map on load markers=', this.data);
  },

  onReady(){
    var that = this;
    this.mapCtx = my.createMapContext('map');
    this.mapCtx.showsCompass({ isShowsCompass: 0 });
    this.mapCtx.showsScale({ isShowsScale: 0 });
    my.showLoading();

    my.getLocation({
      success(res) {
        console.log('success to get location ',res);
        my.hideLoading();
        that.setData({
          myLocation: { longitude: res.longitude, latitude: res.latitude, },
          centerLocation: { longitude: res.longitude, latitude: res.latitude, },
        })
      },
      fail(){
        console.log('failto get location',res);
        my.hideLoading();
      },
    });

    my.httpRequest({
      url: 'http://192.168.0.196/api/xcx/shopListApi.php?shid=0&sign=10086',
      method: 'get',
      dataType: 'json',
      success: function(res) {
        // my.alert({ content: 'success' });
        let dataList = res['data']['data']['list'];
        console.log(' before get store info success markers', that.data.markers);
        var tempMarkers = that.data.markers;
        var tempId = tempMarkers.length + 1;
        for (let dic of dataList) {
          // console.log('for iteror ', dic);
          var dicData = {
            iconPath: that.unSelectedIconPath,
            id: tempId,
            latitude: dic['latitiude'],
            longitude: dic['longitude'],
            width: 40,
            height: 50,
            shop_name: dic['shop_address'],
            shop_address: dic['shop_address'],
            phone: dic['phone'],
          };
          tempMarkers.push(dicData);
          tempId++;
        };
        that.setData({
          markers: tempMarkers,
        });
        console.log('httpRequest  get store info success markers', that.data.markers);
      },
      fail: function(res) {
        my.alert({ content: '获取商铺信息失败' });
      },
      complete: function(res) {
        my.hideLoading();
        // my.alert({ content: 'complete' });
      }
    });
    
    my.getSystemInfo({
      success: (res) => {
        console.log('get system info', res);
        this.setData({
          controls: [{
            id: 1,
            iconPath: "/resources/HomeMap/myInfo.png",
            position: {
              left: 25,
              top: 25,
              width: 42,
              height: 43,
            },
            clickable: true,
          },
          {
            id: 2,
            iconPath: "/resources/HomeMap/appQuestion.png",
            position: {
              left: 25,
              top: res.windowHeight - 45/2 - this.bottomViewCenterSpacing,
              width: 45,
              height: 45,
            },
            clickable: true,
          },
          {
            id: 3,
            iconPath: "/resources/HomeMap/scanToCharge.png",
            position: {
              left: res.windowWidth / 2 - this.sacnViewWidth / 2,
              top: res.windowHeight - this.sacnViewHeight/2 - this.bottomViewCenterSpacing,
              width: this.sacnViewWidth,
              height: this.sacnViewHeight,
            },
            clickable: true,
          },
          {
            id: 4,
            iconPath: "/resources/HomeMap/currentLocation.png",
            position: {
              left: res.windowWidth - 45 - 25,
              top: res.windowHeight - 45/2 - this.bottomViewCenterSpacing,
              width: 45,
              height: 45,
            },
            clickable: true,
          }
          ],
        });
      },
      fail: (res) => {
        my.alert({ title: '获取手机系统消息错误' });
      }
    });
    
  },

  controlIsTapped(e){
    console.log('control is Tapped',e);
    if (e.type === "controlTap") {
      if (e.controlId === 1) {
       
        let res = my.getStorageSync({ key: 'userID' });
        console.log('userID Store info',res);
        if (res.data !== null){
          // my.removeStorageSync({
          //   key: 'userID', // 缓存数据的key
          // });
          console.log('userID has stored');
          my.navigateTo({ url: '/pages/myAccount/myAccount?phoneNumber=12345678' });
        }else{
          my.navigateTo({ url: '/pages/login/login' });
        }
      } else if(e.controlId === 2) {
        console.log('question button is tapped');
        my.navigateTo({ url: '/pages/commonUserQuestions/commonUserQuestions' });
      } else if (e.controlId === 3) {
        console.log(' scan quardcode is tapeed');
        my.scan({
          type: 'qr',
          success: (res) => {
            // my.alert({ title: res.code });
            let prefixStr = "https://anjet-tech.com/ezchargeAppDownload.php?no=";
            let prefixStrForG2 = "https://anjet-tech.com/ezchargeAppDownload.php?g2=";
            var arr = [];
            if (res.code.startsWith(prefixStr)) {
              arr = res.code.split(prefixStr); 
            } else if (res.code.startsWith(prefixStrForG2)){
              arr = res.code.split(prefixStrForG2); 
            };
            if (arr.length>1){
              if (arr[1].length > 1) {
                my.navigateTo({ url: '/pages/PayToCharge/PayToCharge' });
              }
            }
          },
          fail: (res) => {
            // my.alert({ title: '获取二维码失败' });
            console.log(' scan quardcode fail ,res', res);
          }
        });
      } else if (e.controlId === 4) {
        console.log('current location is tapped');
        this.mapCtx.moveToLocation();
      }
    }
  },


  markerIsTapped(e) {
    // my.alert({ title: this.data.markers.length, content: this.data.markers.length });
    var tempMarkers = this.data.markers;
    var tapindex = e.markerId - 1;
    var tapmark = tempMarkers[tapindex];
   
    tempMarkers[tapindex].iconPath = this.selectedIconPath;

    this.mapCtx.getCenterLocation({
      success: (res) => {
        this.setData({
          markers: tempMarkers,
          centerLocation: { longitude: res.longitude, latitude: res.latitude,},
          scale:res.scale
        });
      },
    });
    console.log('markerIsTapped e tapindex= tapmark=',tapindex, tapmark, this.data.markers);


    var address = tapmark.shop_address;
    my.showActionSheet({
      items: [address, '易利充：空闲设备5台，总数12台', '开放时间：00:00-23:59', "导航去"+ address +""],
      cancelButtonText: '取消',
      success: (res) => {

        if (res.index === 4){
         my.alert({
          title: `导航吧`
        });
        } else if (res.index === 3) {
          // this.mapCtx.showRoute({
          //   startLat: this.data.myLocation.latitude,              // 起点纬度
          //   startLng: this.data.myLocation.longitude,             // 起点经度
          //   endLat: tapmark.latitude,                // 终点纬度
          //   endLng: tapmark.longitude,               // 重点经度
          //   routeColor: 'blue',            // 路线颜色
          //   iconWidth: 10,                    // 纹理宽度  10.1.35
          //   routeWidth: 10,                   // 路线宽度  
          //   zIndex: 4                         // 覆盖物 Z 轴坐标  10.1.35
          // });
          my.openLocation({
            longitude: tapmark.longitude,
            latitude: tapmark.latitude,
            name: tapmark.shop_name,
            address: address,
          })
        }
      },
      complete: (res) => {
        tempMarkers[tapindex].iconPath = this.unSelectedIconPath;
        // var key = "markers["+tapindex+"]"
        this.setData({
          markers: tempMarkers,
        });
        // console.log('sheet is completed tapmark= ,key= ,markers', tapmark, key,this.data.markers);
      }
    });

  }
  
});
