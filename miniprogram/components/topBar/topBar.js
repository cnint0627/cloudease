// 获取应用实例
const app = getApp();
Component({
  properties: {
    topBarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {}
    },
  },
  data:{
    navHeight: app.globalData.navHeight, //导航栏高度
    navTop: app.globalData.navTop, //导航栏距顶部距离
    navObj: app.globalData.navObj, //胶囊的高度
    navObjWid: app.globalData.navObjWid, //胶囊宽度+距右距离
  },
  methods:{
  bindBack(){
    wx.navigateBack()
  },
  bindSetting(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  }
}

})