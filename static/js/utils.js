var timeTable = require("timetable.js").data;
var location = require("location.js").data;
var pyName = require("pyname.js").data;

const formatTime = date => {
  // const year = date.getFullYear()
  // const month = date.getMonth() + 1
  // const day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  // var second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDayofweek() {
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date();
  let day = date.getDay();
  let week = show_day[day];
  return week;
}

function compare(s1, s2) {
  for (let i = 0; i < 5; i++) {
    if (s1[i] > s2[i]){
      return 1
    } else if (s1[i] < s2[i]) {
      return 0
    }
  }

  return 0
}

function update_next(timeList) {
  let time = formatTime(new Date());
  let departTime = "无";
  let destinTime = "无";

  if (timeList == undefined) {
    return {
      departTime: departTime
    }
  }
  if (!timeList.hasOwnProperty("length")) {
    return {
      departTime: departTime
    }
  }

  for (let i = 0; i < timeList.length; i++) {
    if (timeList[i]["site"] != "" && compare(timeList[i]["site"], time)) {
      departTime = timeList[i]["site"];
      break;
    }
  }

  return {
    departTime: departTime
  }
}

function place2number(place) {
  let f = {
    "市区": 0,
    "小和山": 1,
    "安吉": 2
  };

  return f[place];
}

function setDepart(multiIndex, multiArray, destination) {
  switch (multiIndex[0]) {
    case 0:
      multiArray[2] = ['小和山'];
      multiIndex[2] = 0;
      break;
    case 1:
      multiArray[2] = ['市区', '安吉'];
      if (destination == '市区') { multiIndex[2] = 0; }
      else { multiIndex[2] = 1; }
      break;
    case 2:
      multiArray[2] = ['小和山'];
      multiIndex[2] = 0;
      break;
  }
  switch (multiIndex[1]) {
    case 0:
      multiArray[2] = ['小和山'];
      multiIndex[2] = 0;
      break;
    case 1:
      multiArray[2] = ['市区'];
      multiIndex[2] = 0;
      break;
  }
  switch (multiIndex[2]) {
    case 0:
      multiArray[2] = ['小和山'];
      multiIndex[2] = 0;
      break;
    case 1:
      multiArray[2] = ['市区'];
      multiIndex[2] = 0;
      break;
  }
  switch (multiIndex[3]) {
    case 0:
      multiArray[2] = ['小和山'];
      multiIndex[2] = 0;
      break;
    case 1:
      multiArray[2] = ['安吉'];
      multiIndex[2] = 0;
      break;
  }

  return {
    multiIndex: multiIndex,
    multiArray: multiArray
  }
}




function get_route_data(mythis, myres) {
  var data = {
    week: mythis.data.week,
    departure: myres.result.data[0].departure,
    destination: myres.result.data[0].destination,

    pickerWeek: mythis.data.pickerWeek,
    pickerDepart: myres.result.data[0].departure,
    pickerDestin: myres.result.data[0].destination,

    timeList: [],
    currentLoca: {},

    departTime: "",


    multiArray: mythis.data.multiArray,
    multiIndex: mythis.data.multiIndex
  };

  data.multiIndex[1] = place2number(data.departure);
  let setdepartResult = setDepart(data.multiIndex, data.multiArray, data.destination);
  data.multiIndex = setdepartResult.multiIndex;
  data.multiArray = setdepartResult.multiArray;

  // update timelist
  data.timeList = timeTable[pyName[data.pickerWeek]][pyName[data.pickerDepart]][pyName[data.pickerDestin]];

  let result = update_next(data.timeList);
  data.departTime = result.departTime;




  return data;
}

module.exports = {
  formatTime: formatTime,
  getDayofweek: getDayofweek,
  compare: compare,
  update_next: update_next,
  place2number: place2number,
  setDepart: setDepart,
  get_route_data: get_route_data
}