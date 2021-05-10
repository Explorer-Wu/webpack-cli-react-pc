const Mock = require('mockjs');
const Random = Mock.Random;

const getWeathers = () => {
  const weatherData = []
  let weatherArr = ["暴雪", "暴雨", "大雾", "台风", "霾", "雷电", "高温", "冰雹"]
  for (let i = 0; i < 8; i++) {
    weatherData.push(Mock.mock({
      "name": weatherArr[i],
      "value": Random.integer(1, 100),
    }));
  }
  return weatherData;
}

const radarData = [{
  scope: '本地',
  data: getWeathers()
},{
  scope: '全国',
  data: getWeathers()
}]

let capacityData = Mock.mock([{
  "name": "已用量",
  "value": Random.integer(1, 10000),
}, {
  "name": "剩余量",
  "value": Random.integer(1, 1000),
}])

let visitsData = [];
let weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
for (var i = 0; i < 7; i++) {
  visitsData.push(Mock.mock({
    'weeks': weeks[i],
    'visits': [{
      "name": "React",
      "value": Random.integer(1000, 1000000),
    },{
      "name": "Vue",
      "value": Random.integer(1000, 1000000),
    },{
      "name": "Angular",
      "value": Random.integer(1000, 1000000),
    }] 
  }));

  // visitorsData.push(Mock.mock({
  //   id: '@increment',
  //   "date": '@date(T)', //'@datetime("yyyy-MM-dd HH H hh h mm m ss s SS S A a T")'
  //   "value": Random.integer(1, 100000),
  // }));
}

module.exports = {
  getVisits: {
    total: 7,
    data: visitsData
  },
  getCapacityRatio: capacityData,
  getRadarData: radarData
}