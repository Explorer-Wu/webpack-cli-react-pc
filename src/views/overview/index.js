import React, { useState, useEffect, useRef } from "react"
import { useImmer } from "use-immer";
import {Row, Col, Card, message} from 'antd';
import { RocketOutlined, GroupOutlined, GoldOutlined, TrademarkCircleOutlined, StarOutlined } from '@ant-design/icons';
import { $Api } from '@@api';

import BoxCard from '@@components/BoxCard/index'
// import ChartTop5 from './chartTop5'

export default function OverView(props) {
  const IconArr = [ 
  //  <GroupOutlined />,
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
  const chartToptitle = '横向柱状图Top5';
  const ChartTop5Comp = props => <div>横向柱状图ChartTop5</div>

 return (
    <>
      <div className="vs-left">
        <BoxCard title={chartToptitle} SlotCon={<ChartTop5Comp/>}/>
        {/* <VsTypeChart render={chartOpt => (<ComChart propChartOpt={chartOpt} />)} propData={visitsData} exOption={exOptsLine}/> */}
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
    </>
  )
}
