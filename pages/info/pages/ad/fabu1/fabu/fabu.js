let ID = ''

Page({
  data: {
    detail: '',
    tonzhi: [],
    content: ''
  },
  onLoad(options) {
    ID = options.id
    console.log("详情接收的id", ID)
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

  },


  getContent(event) {
    this.setData({
      content: event.detail.value
    })
    //console.log("获取成功", content)
  },
  //发表
  fabiao() {
    let content = this.data.content
    if (content == 0) {
      wx.showToast({
        icon: "none",
        title: '请输入文字',
      })
      return
    }
    let tonzhiItem = {}
    tonzhiItem.tz = content
    let tonzhiArr = this.data.tonzhi
    tonzhiArr.push(tonzhiItem)
    console.log("添加后的通知", tonzhiArr)

    wx.showLoading({
      title: '发表中···',
    })

    wx.cloud.callFunction({
      name: "tonzhi",
      data: {
        id: ID,
        tonzhi: tonzhiArr
      }
    }).then(res => {
      console.log("发表成功", res)
      this.setData({
        tonzhi: tonzhiArr,
        content: ''
      })
      wx.hideLoading()
    }).catch(res => {
      console.log("发表失败", res)
      wx.hideLoading()
    })
  }
})