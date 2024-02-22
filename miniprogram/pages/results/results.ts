// results.ts
Page({
  data: {
    query: "",
    locationArray: ['All', 'Shanghai', 'Beijing', 'Suzhou', 'Wuxi', 'Guangzhou', 'Shenzhen'],
    locationIndex: 0,
    professionArray: ['All', 'Engineering', 'Others'],
    professionIndex: 0,
    roleTypeArray: ['All', 'Individual Contributor', 'People Manager'],
    roleTypeIndex: 0,
    employmentTypeArray: ['All', 'Full-Time', 'Internship'],
    employmentTypeIndex: 0,
    sortByArray: ['Relevance', 'New to old', 'Old to new'],
    sortByIndex: 0,
    jobResults: [],
    originalResults:[],
    noResults: false,
    baseUrl: "https://azuresearchformsrefer.search.windows.net/indexes/cosmosdb-index/docs?api-version=2021-04-30-Preview"
  },
  getResult:function()
    {
      wx.showLoading({
        title: 'Loading',
      });
      var body = {
        "search": this.data.query,
        "$top": 1000
      };
      wx.request(
        {
          url: this.data.baseUrl,
          method: "GET",
          data: body,
          header: {
            'api-key': "BDA13BEEE797D2238D53667B47CC813C",
          },
          success: (result) =>
          {
            this.setData(
              {
                jobResults: result.data.value
              }
            );
            console.log(result.data);
            console.log(result.data.value);
            console.log(this.data.jobResults);
            result.data.value.forEach(ele => {
              if(ele.Content != null && ele.Content.length > 150)
              {
                ele.Content = ele.Content.substring(0, 200) + ".....";
              }

              ele.DatePosted = ele.DatePosted.substring(0, 10);
            });
  
            console.log(result.data.value);
            this.setData(
              {
                originalResults: result.data.value
              }
            );

            this.filterResult();
            wx.hideLoading();
          }
        })
    },
    filterResult:function()
    {
         var data = this.data.originalResults;
         if(this.data.locationIndex != 0)
         {
          data = data.filter( item => item.Location.includes(this.data.locationArray[this.data.locationIndex]));
         }

         if(this.data.professionIndex != 0)
         {
           if(this.data.professionIndex == 1)
           {
            data = data.filter(item => item.Profession == "Engineering");
           }
           else
           {
             data = data.filter(item => !(item.Profession == "Engineering"));
           }
         }

         if(this.data.roleTypeIndex != 0)
         {
           data = data.filter( item => item.RoleType.includes(this.data.roleTypeArray[this.data.roleTypeIndex]));
         }

         if(this.data.employmentTypeIndex != 0)
         {
           data = data.filter(item => item.EmploymeneType.includes(this.data.employmentTypeArray[this.data.employmentTypeIndex]));
         }

        if(this.data.sortByIndex == 2)
        {
          data = data.sort((a, b) => a.DatePosted > b.DatePosted ? 1: -1);
        }

        if(this.data.sortByIndex == 1)
        {
          data = data.sort((a, b) => a.DatePosted < b.DatePosted ? 1: -1);
        }
         console.log("Index = " + this.data.sortByIndex);

         this.setData(
          {
            jobResults: data
          }
        );

        if(data.length <= 0)
        {
          this.setData(
            {
              noResults: true
            }
          );
        }
        else
        {
          this.setData(
            {
              noResults: false
            }
          );
        }
    },
  onLoad() {
    this.setData({
      query: this.options.query
    });
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    this.getResult();
    },
    itemClicked(e){
      let id = e.target.id;
      console.log("Id=" + id);
      var url = "/pages/details/details?id=" + id;
      wx.navigateTo({url: url}) 
    },
    bindLocationPickerChange: function(e) {
      console.log('Location携带值为', e.detail.value)
      this.setData({
        locationIndex: e.detail.value
      });
      this.filterResult();
    },
    bindProfessionPickerChange: function(e) {
      console.log('Profession携带值为', e.detail.value)
      this.setData({
        professionIndex: e.detail.value
      });
      this.filterResult();
    },
    bindRoleTypeIndexPickerChange: function(e) {
      console.log('RoleType携带值为', e.detail.value)
      this.setData({
        roleTypeIndex: e.detail.value
      });
      this.filterResult();
    },
    bindSortByPickerChange: function(e) {
      console.log('SortBy携带值为', e.detail.value)
      this.setData({
        sortByIndex: e.detail.value
      });
      this.filterResult();
    },
    bindEmploymentTypePickerChange: function(e) {
      console.log('EmploymentType携带值为', e.detail.value)
      this.setData({
        employmentTypeIndex: e.detail.value
      });
      this.filterResult();
    },
  })
