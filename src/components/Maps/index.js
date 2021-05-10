import React, { useState, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer';
import BMapGL from 'BaiduMapGL';

export default function OnlineBdMap(props) {
  const { mapStyle, mapParam, pointData } = props;
  //初始化地图，这个id和下面的id相对应，之所以将初始化的地图放到this对象上，是方便其他方法调用map对象
  const refmap = new BMapGL.Map("mapLayer"); // new window.BMap.Map("mapLayer");

  useEffect(() => {
    initMap();
    return () => {
      refmap.setTrafficOff(); // 移除地图图层
    }
  }, [])

  //初始化地图的方法
  const initMap = () => {
    let point = new BMapGL.Point(mapParam.lng, mapParam.lat);  // 创建点坐标
    refmap.centerAndZoom(point, mapParam.defaultZoom);   // 初始化地图，设置中心点坐标和地图级别
    let zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
    refmap.addControl(zoomCtrl);
    refmap.addControl(new BMapGL.NavigationControl());
    refmap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    refmap.setMaxZoom(mapParam.maxZoom);
    refmap.setMinZoom(mapParam.minZoom);
    refmap.setMapStyleV2({styleJson: mapStyle});
  }

  /** 路线绘制 **/
  function addPolyLine (pts) {
    let typePoints = pts.data.map(pt => new BMapGL.Point(...pt))
    let polyline = new BMapGL.Polyline(typePoints, pts.polyLineOptions)
    this.refmap.addOverlay(polyline);
  }

  function addMarker(latLongs, typeIcon) {
    // console.log("marker:", latLongs, type)
    // 创建标注对象并添加到地图
    let pt = new BMapGL.Point(...latLongs);
    let marker = new BMapGL.Marker(pt, {
      icon: typeIcon
    });
    marker.disableMassClear();
    this.refmap.addOverlay(marker);              // 将标注添加到地图中
  }

  return (<div id="mapLayer"></div>);
}