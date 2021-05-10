import { lazy } from "react";
// const RootScreen = lazy(() => import("@@components/Visualscreen/LayoutScreen.js"));
const DashBoard = lazy(() => import("@@views/Overview/index"));
const MapBoard = lazy(() => import("@@views/Overview/mapboard"));
const Error = lazy(() => import("@@views/error"));

const screenRoutes =
  // [
  //   {
  //     component: RootScreen,
  //     routes:
  [
    {
      path: "/screenfull",
      exact: true,
      component: DashBoard,
    },
    {
      path: '/screenfull/mapview',
      component: MapBoard,
    },
    {
      // path: '/error',
      // name: '404',
      path: "*",
      component: Error,
    },
  ];
//   },
// ];

export default screenRoutes;
