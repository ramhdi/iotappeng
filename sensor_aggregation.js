// Sensor Aggregation
// Rama Rahardi, 11/08/2022
// This program uses NodeJS
// To run: node 2_sensor-aggregation.js
// Then open browser localhost:8081

"use strict";

import sensor_data from './sensor_data.json' assert {type: 'json'}
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

console.log(Math.max(...room1_temperature))
console.log(Math.min(...room1_temperature))
console.log(median(room1_temperature))
console.log(average(room1_temperature))