import React, { useState, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer';
import {Row, Col, Card, message} from 'antd';
import { RocketOutlined, GroupOutlined, GoldOutlined, TrademarkCircleOutlined, StarOutlined } from '@ant-design/icons';
import { $Api } from '@@api';

import { FetchVisitsRule, FetchCapacityRule } from '@@components/Charts/UseFetchsRule'
import VsTypeChart from '@@components/Charts/VsTypeChart'
import ComChart from '@@components/Charts/ComChart'
import WeatherList from '@@components/OlulLists/WeatherLi'
import TeamsMsgList from '@@components/OlulLists/TeamsMsgs'
import ActiveApps from '@@components/OlulLists/ActiveApps'

import LocalMap from './maps/index'

export default function MapBoard(props) {
  const IconArr = [ 
  //  <GroupOutlined /> , 
    <RocketOutlined />,
    <GoldOutlined />, 
    <TrademarkCircleOutlined />,
    <StarOutlined />
  ]

  const corArrs = [
    ['bg-blue-light', 'bg-blue-dark'],
    ['bg-purple-light', 'bg-purple-dark'],
    ['bg-cyan-light', 'bg-cyan-dark'],
    ['bg-white', 'bg-green-dark']
  ]

  const VisitorsOptions = {
    title: '访问量统计',
    field: 'visitors',
    defaultPeriod: 1*24*60*60
  }

  const CapacityOptions = {
    title: '源码容量占比',
    field: 'capacity'
  }

  const { visitsData } = FetchVisitsRule(VisitorsOptions)
  const { capacityData } = FetchCapacityRule(CapacityOptions)

 const exOptsLine = {
   type: 'line',
  // periodOpts: [{name:'1天', value:1*24*60*60}, {name:'7天', value:7*24*60*60}, {name:'30天', value:30*24*60*60}],
  //  dateFormatter: function (value) {
  //    return $Moment(value).format('YYYY/MM/DD')
  //  },
  otherChartOpts: {
    isUpdate: true,
    isMerge: false,
    legendEvent: false
  }
 }

 const exOptsRing = {
   type: 'semiring',
  //  periodOpts: [{
  //    name: '1天',
  //    value: 1 * 24 * 60 * 60
  //  }, {
  //    name: '7天',
  //    value: 7 * 24 * 60 * 60
  //  }, {
  //    name: '30天',
  //    value: 30 * 24 * 60 * 60
  //  }],
   otherChartOpts: {
     isUpdate: true,
     isMerge: false,
     legendEvent: false
   }
 }
 const [reqProps, setReqProps] = useState(null)

 useEffect(() => {
  const oldClassName = document.body.className
  document.body.className = 'overview'
  return () => {
      document.body.className = oldClassName
  }
}, [])
 
 useEffect(() => {
   loadDataFn()

   return () => {
    //  cleanup
   }
 }, [])

 async function loadDataFn() {
  const globalRes= await $Api.getGlobals() 
  // const errorCode = globalRes.statusCode > 200 ? globalRes.statusCode : false
  const weatherRes = await $Api.getWeathers()
  const teamsRes = await $Api.getTeamsMsg()
  const activitiesRes = await $Api.getActivities()

  // console.log('stars:', globalRes)
  setReqProps({ 
    globalData: globalRes.data, 
    weatherData: weatherRes.data,
    teamsData: {
      title: '社区评论',
      ...teamsRes
    },
    activitiesData: {
      title: '活跃应用',
      ...activitiesRes
    }
  })

 }

 return (<div class="view-con">
    <LocalMap/>
    <div className="vs-left">
      <VsTypeChart render={chartOpt => (<ComChart propChartOpt={chartOpt} />)} propData={visitsData} exOption={exOptsLine}/>
        {/* <CreateVsTrend />
        <NginxPortUsage /> */}
    </div>
    {/* <div className="vs-right">
        <div className="db-right-top">
            <FlowTrend />
        </div>
        <div className="db-right-bottom">
            <VsRsStatus />
            <VsRsCounts />
            <div>
                <HttpsSuccessRatio />
                <IpUsage />
            </div>
        </div>
    </div> */}
  </div>)
}