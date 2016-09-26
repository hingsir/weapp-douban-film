var store = require('./store.js')
var config = require('./config.js')
module.exports = {
  viewDetail: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title
    })
  },
  getLocation: function(cb){
    var location = store.location 
    if(location){
      cb(location)
      return;
    }
    wx.getLocation({
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude
        fetch('https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1').then(function(response){
          response.json().then(function(data){
            store.location = data.result
            cb(data.result)
          })
        })
      }
    })
  },
  getCity: function(cb){
    this.getLocation(function(location){
      cb(location.addressComponent.city.replace('市', ''))
    })
  }
}