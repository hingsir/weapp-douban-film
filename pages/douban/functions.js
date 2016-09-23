module.exports={
  viewDetail: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
    url: '../detail/detail?id=' + ds.id + '&title=' + ds.title
    })
  }
}