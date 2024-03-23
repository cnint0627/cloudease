// components/custom-tab-bar/custom-tab-bar.js
const app=getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showRedDot:0,
    layer: 0, // 选择层级
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
    selected:0,
    color: "#888BA8",
    selectedColor: " #6269A4",
    backgroundColor: "#FFFFFF",
    byPass:"hust",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/tab-index.png",
        selectedIconPath: "/images/tab-index-selected.png",
        iconSize: 48,
      },
      {
        pagePath: "/pages/calendar/calendar",
        text: "心情日历",
        iconPath: "/images/tab-calendar.png",
        selectedIconPath: "/images/tab-calendar-selected.png",
        iconSize: 48,
      },
      {
        pagePath: "/pages/select/select",
        iconPath: "/images/tab-function.png",
        selectedIconPath: "/images/tab-function-selected.png",
        iconSize: 48,
        text: "功能"
        //bulge:true
      },
      {
        pagePath: "/pages/community/community",
        iconPath: "/images/tab-community.png",
        selectedIconPath: "/images/tab-community-selected.png",
        iconSize: 48,
        text: "社区"
      },
      {
        pagePath: "/pages/setting/setting",
        text: "我的",
        iconPath: "/images/tab-me.png",
        selectedIconPath: "/images/tab-me-selected.png",
        iconSize: 48,
      }
    ]
  },
  ready: function() {
    this.setData({
      selected: app.globalData.selected,
      index:app.globalData.selected,
      showRedDot:app.globalData.showRedDot,
      byPass:app.globalData.byPass,
      list: [
        {
          pagePath: "/pages/index/index",
          text: "首页",
          iconPath: "/images/tab-index.png",
          selectedIconPath: "/images/tab-index-selected.png",
          iconSize: 48,
        },
        {
          pagePath: "/pages/calendar/calendar",
          text: "心情日历",
          iconPath: "/images/tab-calendar.png",
          selectedIconPath: "/images/tab-calendar-selected.png",
          iconSize: 48,
        },
        {
          pagePath: "/pages/select/select",
          iconPath: "/images/tab-function.png",
          selectedIconPath: "/images/tab-function-selected.png",
          iconSize: 48,
          text: "功能"
          //bulge:true
        },
        {
          pagePath: "/pages/community/community",
          iconPath: "/images/tab-community.png",
          selectedIconPath: "/images/tab-community-selected.png",
          iconSize: 48,
          text: app.globalData.byPass=="hust"?"社区":"关于我们"
        },
        {
          pagePath: "/pages/setting/setting",
          text: "我的",
          iconPath: "/images/tab-me.png",
          selectedIconPath: "/images/tab-me-selected.png",
          iconSize: 48,
        }
      ]
    })
    console.log(this.data.byPass)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e){
      const data = e.currentTarget.dataset;
      const url = data.path;
      if(data.index==2){
        this.showPopup()
        return;
      }
      if(this.data.click){
        this.showPopup()
      }
      app.globalData.selected=data.index
      wx.switchTab({url})
    },

     // 用户点击显示弹窗
  showPopup: function() {
    let _that = this;
    if (!_that.data.click) {
      _that.setData({
        click: true,
      })
    }

    if (_that.data.option) {
      _that.setData({
        option: false,
      })

      // 关闭显示弹窗动画的内容，不设置的话会出现：点击任何地方都会出现弹窗，就不是指定位置点击出现弹窗了
      setTimeout(() => {
        _that.setData({
          click: false,
          layer:0
        })
      }, 200)


    } else {
      _that.setData({
        option: true
      })
    }
  },

  // 选择AI聊天对话模式
  bindSelectChatMode(){
    this.setData({
      layer:1
    })
  }

  }
})