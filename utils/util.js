const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getData: getData,
  getIndex: getIndex,
  getNext: getNext
}

var myIndex = require('../data/data_index.js');
var my_index_next = require('../data/data_index_next.js');

//获取网络数据
function getData(url) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: {},
      header: {

      },
      succcess: function(res) {
        console.log("success");
        resolve(res);
      },
      fail: function(res) {
        reject(res);
        console.log("failed");
      }
    })
  })
}

//获取首页数据
function getIndex() {
  return myIndex.index;
}

function getNext() {
  return my_index_next.next;
}