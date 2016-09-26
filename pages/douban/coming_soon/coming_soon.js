var functions = require('../functions.js')
Page({
  data: {
    films: [],
    showLoading: true
  },
  onLoad: function () {
      var that = this
      functions.getCity(function(city){
        fetch('https://api.douban.com/v2/movie/coming_soon?city=' + city).then(function(response){
          if(response.status !== 200){
              console.log("error："+response.status);
              return;
          }
          response.json().then(function(data){
              that.setData({
                films: data.subjects,
                showLoading: false
              })
          });
        })
      }
    )
  },
  viewDetail: functions.viewDetail
})
