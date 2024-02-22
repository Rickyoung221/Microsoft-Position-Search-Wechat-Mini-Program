// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
let globalInput: string;

Page({
  data: {
    inputValue: "",
    pictures: [
      'https://neitui.blob.core.windows.net/map/MSSearch.png?sp=r&st=2022-06-05T03:22:34Z&se=2026-01-08T11:22:34Z&sv=2020-08-04&sr=b&sig=wiLWzLvpYnynPGy9vwU46e90PGcMqyIdoMIXWk1KzZI%3D'
    ]
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    globalInput = e.detail.value;
    console.log(this.data.inputValue);
  },
  bindSearch:function(data){    
    console.log(data.detail.value.inputValue);
    let globalInput = data.detail.value.userInput;
    this.setData({
      inputValue:globalInput
    })
    console.log(this.data.inputValue);
    if(globalInput.length <1 || globalInput.replace(" ", "").length < 1)
    {
          wx.showToast
          (
          {
                title: "Query cannot be empty",
                duration: 1500,
                icon: "none",
                mask: true,
          }
          )
    }
    else
    {
      var url = "/pages/results/results?query=" + globalInput;
      wx.navigateTo({url: url})
    }    
},
  joinItemClicked(e)
{
  var url = "/pages/promotion/promotion";
  wx.navigateTo({url: url});
},
  onLoad() {
    // @ts-ignore
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  }
})

