// Sensor Aggregation
// Rama Rahardi, 11/08/2022
// This program uses NodeJS
// To run: node 2_sensor-aggregation.js
// Then open browser localhost:8081

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

var fs = require('fs')
var sensor_data = JSON.parse(fs.readFileSync('./sensor_data.json', 'utf-8'))
const data_len = sensor_data.array.length
console.log(data_len)

var room1_temperature = []
var room1_humidity = []
var room1_time = []
var room2_temperature = []
var room2_humidity = []
var room2_time = []
var room3_temperature = []
var room3_humidity = []
var room3_time = []

for (var i = 0; i < data_len; i++) {
  switch (sensor_data.array[i].roomArea) {
    case "roomArea1":
      room1_temperature.push(sensor_data.array[i].temperature)
      room1_humidity.push(sensor_data.array[i].humidity)
      room1_time.push(sensor_data.array[i].timestamp)
      break;

    case "roomArea2":
      room2_temperature.push(sensor_data.array[i].temperature)
      room2_humidity.push(sensor_data.array[i].humidity)
      room2_time.push(sensor_data.array[i].timestamp)
      break;

    case "roomArea3":
      room3_temperature.push(sensor_data.array[i].temperature)
      room3_humidity.push(sensor_data.array[i].humidity)
      room3_time.push(sensor_data.array[i].timestamp)
      break;
  }
}

//console.log(Math.max(...room1_temperature))
//console.log(Math.min(...room1_temperature))
//console.log(median(room1_temperature))
//console.log(average(room1_temperature))

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("<h2>Sensor Aggregation</h2>")
  res.write("\
  <table>\
  <tr>\
  <th>Statistics</th>\
  <th>Room 1</th>\
  <th>Room 2</th>\
  <th>Room 3</th>\
  </tr>\
  <tr>\
  <td>Max</td>\
  <td>" + Math.max(...room1_temperature).toFixed(2) + "</td>\
  <td>" + Math.max(...room2_temperature).toFixed(2) + "</td>\
  <td>" + Math.max(...room3_temperature).toFixed(2) + "</td>\
  </tr>\
  <tr>\
  <td>Min</td>\
  <td>" + Math.min(...room1_temperature).toFixed(2) + "</td>\
  <td>" + Math.min(...room2_temperature).toFixed(2) + "</td>\
  <td>" + Math.min(...room3_temperature).toFixed(2) + "</td>\
  </tr>\
  <tr>\
  <td>Median</td>\
  <td>" + median(room1_temperature).toFixed(2) + "</td>\
  <td>" + median(room2_temperature).toFixed(2) + "</td>\
  <td>" + median(room3_temperature).toFixed(2) + "</td>\
  </tr>\
  <tr>\
  <td>Average</td>\
  <td>" + average(room1_temperature).toFixed(2) + "</td>\
  <td>" + average(room2_temperature).toFixed(2) + "</td>\
  <td>" + average(room3_temperature).toFixed(2) + "</td>\
  </tr>\
  </table>\
  ")
  res.end();
}).listen(8081);