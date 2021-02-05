var mapChart4;
$(function () {
   
    mapChart4={
        amap:function(){
            echarts.registerMap('china', chinaMap);
            echarts.registerMap('chinaMapOutline', chinaMapOutline);
            var chinaGeoCoordMap = data4
            var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';
        
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = chinaGeoCoordMap[dataItem[0].name];
                    var toCoord = [121.4648, 31.2891];
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: toCoord,
                        }, {
                            coord: fromCoord,
                            value: dataItem[0].value
                        }]);
                    }
                }
                return res;
            };
            var planePathc = 'circle'
        
            var imageDom = document.createElement('img'); // 使用 DOM HTMLImageElement
            // imageDom.src = 'http://39.106.255.75/siteimg/e195b1cbd888b6b983397c013047e3c.png';
            imageDom.src = './img/s.png';
            imageDom.width = 800;
            imageDom.height = 600;
            var color = ['#FF1818','#FF6CCD', '#FF8F28', "#FFE86F", "#48EFC0","#61C6FF"];
            
            var series = [{
                type: 'map',
                map: 'china',
                aspectScale: 0.75,
                zoom: 1.7,
                top: "28%",
                left: '18%',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: {
                            image: imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                            repeat: 'repeat-y', // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
                        },
                        // areaColor: "#061E3D",
                        borderColor: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#576B7B' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#2C414F' // 100% 处的颜色
                            }],
                        },
                        borderWidth: 1,
                        borderRadius: 30,
                    },
                    emphasis: {
                        areaColor:{
                            image: imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                            repeat: 'repeat-y', // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
                        },
                        borderColor: 'rgba(37,127,229)',
                    }
                },
            },

        ];
            [
                ['全部', datavalue4],
            ].forEach(function (item, i) {
                series.push({
                    name: item[0],
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 8,
                        trailLength: 0.5,
                        symbolSize: 3,
                        symbol: 'rect',
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            curveness: -0.2
                        }
                    },
                    data: convertData(item[1])
                }, {
                    name: item[0],
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 15
                    },
        
                    symbolRotate: 180,
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 1,
                            opacity: 0.4,
                            curveness: -0.2
                        }
                    },
                    data: convertData(item[1])
                }, {
                    name: item[0],
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: { //涟漪特效
                        period: 4, //动画时间，值越小速度越快
                        brushType: 'stroke', //波纹绘制方式 stroke, fill
                        scale: 4 //波纹圆环最大限制，值越大波纹越大
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'left', //显示位置
                            offset: [5, 0], //偏移设置
                            formatter: function (params) { //圆环显示文字
                                return params.data.name;
                            },
                            fontSize: 8,
                            fontFamily: "PingFang HK",
                            fontStyle: "normal",
                            fontWeight: 200
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    symbol: planePathc,
                    symbolSize: function (val) {
                        return 5 + val[2] * 10; //圆环大小
                    },
                    itemStyle: {
                        normal: {
                            color: color[i]
                        },
                    },
                    data: item[1].map(function (dataItem) {
                        return {
                            name: dataItem[0].name,
                            value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                        };
                    }),
                }, {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    showEffectOn: 'render',
                    rippleEffect: {
                        period: 5,
                        scale: 6,
                        brushType: 'fill'
                    },
                    hoverAnimation: true,
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        offset: [10, 0],
                        color: '#1E78FF',
                        show: true
                    },
                    itemStyle: {
                        normal:{
                            color: "#1E78FF",
                            shadowBlur: 10,
                            shadowColor: '#36B7FF',
                            opacity: 0.75
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            opacity: 0, //线条宽度
                        }
                    },
                    data: [{
                        name: '上海',
                        value: [121.4648, 31.2891]
                    }]
        
                });
            });
        
            option = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor:"transparent",
                    border:0,
                    formatter:  params =>  {
                        if (params.data && params.data.name) {
                            if(params.data.name !=='上海'){
                                var str = `<div class="toop"><div class="bg"><p>${ params.data.value[2]}</p><p style="color:${params.color}">${params.data.name}</p></div></div>`;
                                return str;
                            }
                        }
                    }
                },
                visualMap: { //图例值控制
                    min: 0,
                    max: 1,
                    calculable: true,
                    show: true,
                    top: '40%',
                    right: '0%',
                    color: color,
                    textStyle: {
                        color: '#fff'
                    }
                },
                color: ['#4ab2e5'],
                geo: [{
                    map: 'china',
                    show: true,
                    roam: false,
                    label: {
                        emphasis: {
                            show: true
                        }
                    },
                    zoom: 1.7,
                    top: "28%",
                    left: '18%',
                    layoutSize: "100%",
                    itemStyle: {
                        normal: {
                            areaColor: "transparent",
                            // shadowColor: '#4ab2e5', //外发光
                            borderColor: {
                                x: 0,
                                y: 4,
                                x2: 0,
                                y2: 0,
                                colorStops: [{
                                    offset: 0,
                                    color: '#e4edff' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#e4edff' // 100% 处的颜色
                                }],
                            },
                            borderWidth: 3,
                            shadowBlur: 20,
                            shadowColor: 'rgba(29,119,255,0.6)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 10,
                            // borderColor: '#0177ff'
                        },
                        emphasis: {
                            areaColor: 'transparent', //悬浮区背景
                        }
                    }
                }, {
                    map: 'chinaMapOutline',
                    show: true,
                    roam: false,
                    zlevel: -1,
                    label: {
                        emphasis: {
                            show: true
                        }
                    },
                    zoom: 1.11,
                    top: "6.5%",
                    left: '4.4%',
                    layoutSize: "100%",
                    itemStyle: {
                        normal: {
                            areaColor: "transparent",
                            // opacity:0.4,
                            // shadowColor: '#4ab2e5', //外发光
                            borderColor: '#4771db',
                            borderWidth: 1,
                            shadowBlur: 20,
                            shadowColor: 'rgba(9,32,67,1)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 10,
                            // borderColor: '#0177ff'
                        },
                        emphasis: {
                            areaColor: 'transparent', //悬浮区背景
                        }
                    }
                }],
                series: series
            }
            
        }
    }
})