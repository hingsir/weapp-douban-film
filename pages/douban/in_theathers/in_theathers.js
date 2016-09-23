var util = require('../../../utils/util.js')
var functions = require('../functions.js')
Page({
  data: {
    films: []
  },
  onLoad: function () {
      var that = this
      fetch('https://api.douban.com/v2/movie/in_theaters?city=%E4%B8%8A%E6%B5%B7').then(function(response){
        if(response.status !== 200){
            console.log("error："+response.status);
            return;
        }
        response.json().then(function(data){
            that.setData({
              films: data.subjects
            })
        });
      })
  },
  viewDetail: functions.viewDetail
})
