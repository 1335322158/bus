Page({
  data: {
    datelist: []
  },

  onLoad() {
    wx.cloud.database().collection('inform')
      .get()
      .then(res => {
        console.log("获取成功", res)
        this.setData({
          datalist: res.data
        })
      })
      .catch(res => {
        console.log("获取失败", res)
      })
  },

  //跳转
  getDetail(event) {
    wx.navigateTo({
      url: "../fabu1/fabu/fabu?id=" + event.currentTarget.dataset.item._id,
    })
  }

})