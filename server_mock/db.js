//引入mockjs文件
// import Mock from 'mockjs'
// import { param2Obj } from '@utils/index'
const Mock = require('mockjs');
const LoginReg = require('./mockdata/logreg');
const OverViewData = require('./mockdata/overviews');
const globalData = require('./mockdata/globals');
const weatherData = require('./mockdata/weather');
const mixChartsData = require('./mockdata/mixcharts');
const contentsData = require('./mockdata/contents');
const appMesData = require('./mockdata/appmessage');

module.exports = function () {
  return {
  // msg: '成功获取数据',
    // login: LoginReg.authlogin,
    logout: LoginReg.authlogout,
    flowstats: OverViewData.getFlowStats,
    roadstats: OverViewData.getRoadStats,
    top5flow: OverViewData.getTop5Flows,
    radarweather: mixChartsData.getRadarData,
    global: globalData.getGlobals,
    visits: mixChartsData.getVisits,
    capacity: mixChartsData.getCapacityRatio,
    weathers: weatherData.getWeatherData,
    appmes: appMesData.getAppMesData,
    teams: contentsData.getTeamMesData,
    activities: contentsData.getActiveData,
    articles: contentsData.getArticlesData,
    article: contentsData.getArticleInfo,
    articledel: contentsData.delArticle,
    users: contentsData.getUsersData,
    // adduser: contentsData.addUserData, 
    // addMesData: {
    //   msg: "添加成功！"
    // },
    // editAlarmData: {
    //   msg: "编辑成功！"
    // },
    // delAlarmData: {
    //   msg: "删除成功！"
    // },  
  }
}