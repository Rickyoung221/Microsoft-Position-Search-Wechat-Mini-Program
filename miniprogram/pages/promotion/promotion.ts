// results.ts
Page({
  data: {
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    },
    PreViewImage(){
      wx.preViewImage({
        current: "https://neitui.blob.core.windows.net/map/Promotion.png?sp=r&st=2022-06-05T07:52:00Z&se=2024-04-13T15:52:00Z&sv=2020-08-04&sr=b&sig=CRWiWxZAiAYg4T7VPLQxws1f1atm1FGqpedmEpjkUlQ%3D",
        ruls: ["https://neitui.blob.core.windows.net/map/Promotion.png?sp=r&st=2022-06-05T07:52:00Z&se=2024-04-13T15:52:00Z&sv=2020-08-04&sr=b&sig=CRWiWxZAiAYg4T7VPLQxws1f1atm1FGqpedmEpjkUlQ%3D"]
      })
    }
  })
