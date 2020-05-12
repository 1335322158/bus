let ID = ''

Page({
  data: {
    detail: '',
    tonzhi: [],
    content: ''
  },
  onLoad(options) {
    ID = options.id
    wx.cloud.database().collection("inform")
      .doc(ID)
      .get()
      .then(res => {
        console.log("成功", res)
        this.setData({
          detail: res.data,
          tonzhi: res.data.tonzhi
        })
      })
      .catch(res => {
        console.log("失败", res)
      })
  }
})