var functions = require('../functions.js')
var start = 0, pageSize = 20
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    loadMoreLoading: false
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  scroll: function(e){
    console.log(e)
  },
  onLoad: function () {
    var that = this
    functions.getCity(function(city){
      that.fetchData('https://api.douban.com/v2/movie/coming_soon?city=' + city, 0, pageSize, function(data){
        start = data.subjects.length
        that.setData({
          films: data.subjects,
          showLoading: false
        })
      })
    })
  },
  fetchData: function(url, start, count, cb){
    var that = this
    start = start || 0
    count = count || 20
    fetch(url + '&start=' + start + '&count=' + count).then(function(response){
      response.json().then(function(data){
        cb(data)
      })
    })
  },
  loadMore: function(){
    var that = this
    functions.getCity(function(city){
      that.setData({
        loadMoreLoading: true
      })
      that.fetchData('https://api.douban.com/v2/movie/coming_soon?city=' + city, start, pageSize, function(data){
        if(data.subjects.length === 0){
          that.setData({
            hasMore: false
          })
        }
        start += data.subjects.length
        that.setData({
          films: that.data.films.concat(data.subjects),
          loadMoreLoading: false
        })
      })
    })
  },
  viewDetail: functions.viewDetail
})
