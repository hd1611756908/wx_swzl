// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   * current ： 
   * 0->寻人启事
   * 1->寻物启事
   * 2->寻宠启事
   * 3->失物招领
   */
  data: {
    current:0,
    windowHeight:0,
    windowWidth:0,
    page: {
      "hasnext": true,
      "pageno": 1,
      "pagesize": 5,
      "items": [
        {
          "itemId": 1001,
          "title": "学府路丢失银白色笔记本电脑一台",
          "user": {
            "id": 2001,
            "name": "李雷",
            "email": "hd1611756908@163.com"
          },
          "category": "电脑",
          "itemtype": {
            "id": 4001,
            "name": "寻物启事"
          },
          "province": "哈尔滨市-南岗区",
          "address": "黑龙江省哈尔滨市南岗区学府路550号哈尔滨理工大学一号楼3层301",
          "createtime": "2018-12-12 22:22:22",
          "losetime": "2018-12-12",
          "imgs": ["https://img.alicdn.com/imgextra/i2/773923628/O1CN014Iksgf1cffOvVHWVP_!!773923628.jpg", "https://img.alicdn.com/imgextra/i4/773923628/O1CN011cffNakLNEENTAW_!!773923628.jpg",
            "https://img.alicdn.com/imgextra/i2/773923628/O1CN011cffOMOJ9OHUzGT_!!773923628.jpg"
          ],
          "detaildesc": "在女人街kfc到成龙影院中间丢失2000年1月16日男性身份证一张，没有其他附加品，身份证为320121开头，本人为应届高考生希望能快点拿到，可支付一定酬劳"
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var current = that.data.current;
    //获取系统高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight - 45,
          windowWidth: res.windowWidth
        });
      },
    });
    //获取数据列表 第1页 每页显示5个项目
    var typeName = "寻物启事";
    if (current == 0) {
      typeName = "寻物启事";
    } else if (current == 1) {
      typeName = "寻人启事";
    } else if (current == 2) {
      typeName = "寻宠启事";
    } else if (current == 3) {
      typeName = "失物招领";
    }
    //获取数据
    wx.request({
      url: 'http://localhost:8080/getPageItems',
      method: 'GET',
      dataType: 'json',
      data: {
        'pageNo': 1,
        'pageSize': 5,
        'typeName': typeName
      },
      success(res) {
        that.setData({
          page: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var current = that.data.current;

    // 显示加载图标
    wx.showLoading({
      title: '加载下一页'
    });
    // 图标延时
    setTimeout(function () {
      wx.hideLoading()
    }, 1000);

    //加载下一页数据
    var hasnext = that.data.page.hasnext;
    if(hasnext){
      //获取当前页
      var pageNo = that.data.page.pageno+1;
      var pageSize = that.data.page.pagesize;
      var typeName = "寻物启事";
      if (current == 0) {
        typeName = "寻物启事";
      } else if (current == 1) {
        typeName = "寻人启事";
      } else if (current == 2) {
        typeName = "寻宠启事";
      } else if (current == 3) {
        typeName = "失物招领";
      }

      //获取数据
      wx.request({
        url: 'http://localhost:8080/getPageItems',
        method: 'GET',
        dataType: 'json',
        data: {
          'pageNo': pageNo,
          'pageSize': pageSize,
          'typeName': typeName
        },
        success(res) {
          // console.log("数据列表:", res.data);
          // console.log("元数据：",that.data.page.items);
          var items_n = that.data.page.items.concat(res.data.items);
          //console.log("数据列表new:", items_n);
          var result = res.data;
          result.items = items_n;
          that.setData({
            page: result
          });
        }
      })


    }else{
      //不加载，提示已经是最后一页
      wx.showLoading({
        title: '最后一页'
      });
      // 图标延时
      setTimeout(function () {
        wx.hideLoading()
      }, 500);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击顶部选项卡事件
   */
  click_nav:function(e){
    var that = this;
    //获取选项卡点击事件触发后传送过来的参数
    var nav = e.currentTarget.dataset.current;
    //将参数赋值给前端选项卡控制样式显示
    that.setData({
      current:nav
    });
    var typeName="寻物启事";
    if(nav==0){
      typeName = "寻物启事";
    } else if (nav == 1){
      typeName = "寻人启事";
    } else if (nav == 2){
      typeName = "寻宠启事";
    } else if (nav == 3){
      typeName = "失物招领";
    }
    //获取数据
    wx.request({
      url: 'http://localhost:8080/getPageItems',
      method:'GET',
      dataType:'json',
      data:{
        'pageNo':1,
        'pageSize':5,
        'typeName': typeName
      },
      success(res){
        //console.log("数据列表:", res.data);
        that.setData({
          page: res.data
        });
      }
    })
  },
  /**
   * 左右滑动滑块触发事件
   */
  bindchange:function(e){
    var that = this;
    var current = e.detail.current;
    this.setData({
      current: current
    });

    var typeName = "寻物启事";
    if (current == 0) {
      typeName = "寻物启事";
    } else if (current == 1) {
      typeName = "寻人启事";
    } else if (current == 2) {
      typeName = "寻宠启事";
    } else if (current == 3) {
      typeName = "失物招领";
    }
    //获取数据
    wx.request({
      url: 'http://localhost:8080/getPageItems',
      method: 'GET',
      dataType: 'json',
      data: {
        'pageNo': 1,
        'pageSize': 5,
        'typeName': typeName
      },
      success(res) {
        //console.log("数据列表:", res.data);
        that.setData({
          page: res.data
        });
      }
    })
  }

})