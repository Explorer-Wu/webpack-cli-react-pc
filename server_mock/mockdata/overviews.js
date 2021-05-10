const Mock = require('mockjs');
const Random = Mock.Random;

//流量统计数据
const FlowStatsInfo = () => Mock.mock({
  id: '@increment',
  place: Random.cword(2, 6),
  'enter|0-10000': 1,
  'leave|0-10000': 1,
})
const FlowStatsLi = {
  total: 5,
  data: []
}

const StatusInfo = () => Mock.mock({
  id: '@id',
  region: Random.cword(2, 6),
  datetime: '@datetime("MM-dd hh:mm:ss")',
  'status|1-3': 1,
})
const RoadStatsLi = {
  total: 20,
  data: []
}

const Top5FlowInfo = () => Mock.mock({
  'name': '@city',
  'value': Random.integer(10, 1000000),
})
const Top5FlowData = {
  total: 5,
  data: []
}
// Top5FlowData.data = [];
// Top5FlowData.orders = [];
let period = ["Today", "Week", "Month"];

for (let i = 0; i < 5; i++) {
  // Top5FlowData.orders.push('0'+i);
  Top5FlowData.data.push(Top5FlowInfo());
  FlowStatsLi.data.push(FlowStatsInfo());
}
for (let i = 0; i < 20; i++) {
  RoadStatsLi.data.push(StatusInfo());
}
module.exports = {
  getFlowStats: FlowStatsLi,
  getRoadStats: RoadStatsLi,
  getTop5Flows: Top5FlowData
}