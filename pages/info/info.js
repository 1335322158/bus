// pages/info/info.js
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
    console.log("点击", event.currentTarget.dataset.item._id)
    wx.navigateTo({
      url: "pages/tonzhi/tonzhi?id=" + event.currentTarget.dataset.item._id,
    })
  }
})