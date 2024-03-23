import * as echarts from '../ec-canvas/echarts';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      // onInit: initChart,
      lazyLoad: true, // 懒加载
    }
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.initchart(this.data.data)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.initchart(this.data.data)
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
  /**
   * 数据监听器
   */
  observers: {
    'data': function(val){
      this.initchart(val)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadchart(data){
      // 绑定组件（ec-canvas标签的id）
      let ec_canvas = this.selectComponent('#mychart-dom-radar');
      ec_canvas.init((canvas,width,height,dpr)=>{
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // 解决模糊显示的问题
        })
        // echart表格的内容配置
        var option = {
          backgroundColor: "#ffffff",
          xAxis: {
            show: false
          },
          yAxis: {
            show: false
          },
          radar: {
            // 雷达图每个指示器名称的配置项。
            axisName: {
              color: 'rgba(102, 102, 102, 1)',
              fontSize: 14,
              fontFamily: 'PingFangSC-Regular, PingFang SC',
              fontWeight: 400,
            },
            // 指示器名称和指示器轴的距离
            nameGap: 8,
            // 指示器轴的分割段数
            splitNumber: 5,
            // 坐标轴轴线
            axisLine: {
              lineStyle: {
                color: 'rgba(234, 234, 234, 1)',
                width: 1.5
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(234, 234, 234, 1)',
                width: 1.5
              }
            },
            splitArea: {
              areaStyle: {
                color: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']
              }
            },
            // 雷达器的指示器
            indicator: [{
              name: '幸福',
              max: 4,
            },
            {
              name: '悲伤',
              max: 4,
            },
            {
              name: '恐惧',
              max: 4,
            },
            {
              name: '厌恶',
              max: 4,
            },
            {
              name: '愤怒',
              max: 4,
            },
            {
              name: '惊讶',
              max: 4,
            }
            ]
          },
          series: [{
            type: 'radar',
            symbol: 'none',
            data: [
              {
                value: data,
                lineStyle: {
                  color: "rgba(209, 189, 128, 1)",
                  width: 2,
                },
                areaStyle: {
                  color: "rgba(209, 189, 128, 0.3)"
                }
              }
            ]
          }]
        };
        chart.setOption(option);
        return chart;
      })
    },
    initchart(data){
      // 传递后台数据到图表中，进行懒加载图表
      this.loadchart(data);
    },
  }
})
