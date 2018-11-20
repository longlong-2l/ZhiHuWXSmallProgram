//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()

Page({
  data: {
    feed: [],
    feed_length: 0
  },
  //事件处理函数,跳转到回答页
  bindItemTap: function() {
    wx.navigateTo({
      //url: '../answer/answer'
      url: ""
    })
  },

  //事件处理函数,跳转到问题页
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },

  onLoad: function() {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    this.getData();
  },

  // //页面加载完后会调用这个方法，可以进行一些初始化操作
  // onLoad: function() {
  //   //如果在程序打开时就已经获取到用户信息
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },

  upper: function() {
    wx.showNavigationBarLoading();
    this.refresh();
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh()
    }, 2000);
  },

  lower: function(e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      that.nextLoad();
    }, 1000);
  },

  refresh0: function() {
    var index_api = '';
    util.getData(index_api).then(function(data) {
      console.log(data);
    })
  },

  getData: function() {
    var feed = util.getIndex();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },

  //刷新数据
  refresh: function() {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getIndex();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function() {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000);
  },

  nextLoad: function() {
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 4000
    })
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function() {
      wx.showToast({
        title: '加载成功',
        icon: "succcess",
        duration: 2000
      })
    }, 3000);
  }
})