import React, { Suspense, useState, useEffect, useRef } from "react";
import { renderRoutes } from "react-router-config";
import screenRoutes from "@@router/routesScreenConfig";
import zhCN from "antd/es/locale/zh_CN";
import Loading from "../Loading";
// import {Row, Col, Card, message} from 'antd';
// import { $Api } from '@@api'
import BarTop from '@@components/Visualscreen/BarTop';
import BarBottom from '@@components/Visualscreen/BarBottom';

import 'public/static/styles/components/overview.scss';
// import '@@assets/styles/components/overview.scss'

export default function LayoutScreen(props) {
  const { match } = props;

  // useEffect(() => {
  //   const oldClassName = document.body.className
  //   document.body.className = "overview"
  //   return () => {
  //     document.body.className = oldClassName
  //   }
  // }, [])

  return (
    <div className="fullview">
      <BarTop />
      <BarBottom />
      <div className="view-main">
        <Suspense fallback={<Loading isLoad="Loading..." />}>
          {renderRoutes(screenRoutes, match)}
        </Suspense>
      </div>
    </div>
  )
}