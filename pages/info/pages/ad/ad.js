Page({
  data: {
    zhanghao: '',
    mima: '',
  },


  //获取账号
  getzhanghao(event) {
    this.setData({
      zhanghao: event.detail.value
    })
  },
  //获取密码
  getmima(event) {
    this.setData({
      mima: event.detail.value
    })

  },
  //点击事件
  login(event) {
    let zhanghao = this.data.zhanghao
    let mima = this.data.mima

    //登录
    wx.cloud.database().collection('notifier').where({
      zhanghao: zhanghao
    }).get({
      success(res) {
        let notifier = res.data[0]
        console.log("notifier", notifier)
        if (mima == notifier.mima) {
          wx.showToast({
            title: '登录成功',
          })
          wx.navigateTo({
            url: "../ad/fabu1/fabu1"
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '账号或密码错误',
          })
        }
      }
    })

  }


})