var util = require('../../../utils/util.js')
Page({
  data: {
    film: {}
  },
  onLoad: function (options) {
    var that = this
    var id = options.id

    wx.setNavigationBarTitle({
      title: options.title
    })

    fetch('https://api.douban.com/v2/movie/subject/' + id).then(function(response){
      if(response.status !== 200){
          console.log("error："+ response.status);
          return;
      }
      response.json().then(function(data){
          that.setData({
            film: data
          })
      });
    }) 
  }
})
