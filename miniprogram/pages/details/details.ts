// results.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

Page({
  data: {
    id: "",
    jobResults: [],
    baseUrl: "https://azuresearchformsrefer.search.windows.net/indexes/cosmosdb-index/docs?api-version=2021-04-30-Preview&search=*$filter=id eq "
  },
  joinItemClicked(e)
  {
    var url = "/pages/promotion/promotion";
    wx.navigateTo({url: url});
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    this.setData({
      id: this.options.id
    });

    console.log("Id=" + this.data.id);
    wx.request(
      {
        url: this.data.baseUrl + this.data.id,
        method: "GET",
        header: {
          'api-key': "BDA13BEEE797D2238D53667B47CC813C",
        },
        success: (result) =>
        {
          result.data.value.forEach(ele => {
            ele.DatePosted = ele.DatePosted.substring(0, 10);
          });
          this.setData(
            {
              jobResults: result.data.value.slice(0, 1)
            }
          );       
        }
      })
    },

    itemClicked(e){
      let id = e.target.id;
    }
  })
