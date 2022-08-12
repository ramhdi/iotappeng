// math functions
const median = arr => {
	const mid = Math.floor(arr.length / 2),
		nums = [...arr].sort((a, b) => a - b);
	return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

// get sensor data json
var sensor_data = $.ajax({
	url: "https://ramhdi.github.io/json/sensor_data.json",
	async: false,
	dataType: 'json'
}).responseJSON;
const data_len = sensor_data.array.length

// convert ms timestamp to date
for (var i = 0; i < data_len; i++) {
	sensor_data.array[i].time = (new Date(sensor_data.array[i].timestamp)).toJSON();
}
console.log(sensor_data)

// group by date
// define group by date function
const groups = sensor_data.array.reduce((groups, measurements) => {
	const date = measurements.time.split('T')[0];
	if (!groups[date]) {
		groups[date] = [];
	}
	groups[date].push(measurements);
	return groups;
}, {});

// create object grouped by date
const sensor_data_date = Object.keys(groups).map((date) => {
	return {
		date,
		measurements: groups[date]
	};
});

console.log(sensor_data_date);

// create drop-down menu to choose date from
var select = document.createElement("select");
select.name = "date";
select.id = "dateselector"

for (var i = 0; i < sensor_data_date.length; i++) {
	var option = document.createElement("option");
	option.value = i;
	option.text = sensor_data_date[i].date;
	select.appendChild(option);
}
document.getElementById("dateselect").appendChild(select);

// generate table
function generateTable(table, tableid, stat) {
	// create table header
	var tr = table.insertRow(-1);

	// create data to show (including headers and information)
	col = ['Statistics', 'Room 1', 'Room 2', 'Room 3']
	col1 = ['Max', 'Min', 'Median', 'Average']

	// create table header
	for (var i = 0; i < col.length; i++) {
		var th = document.createElement("th");
		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	// add json data to each rows of the table
	for (var i = 0; i < col1.length; i++) {
		tr = table.insertRow(-1);
		for (var j = 0; j < col.length; j++) {
			var tabCell = tr.insertCell(-1);
			if (j == 0) {
				tabCell.innerHTML = col1[i];
			} else {
				tabCell.innerHTML = stat[j - 1][i];
			}
		}
	}

	// add the table to a container
	var divContainer = document.getElementById(tableid);
	divContainer.innerHTML = "";
	divContainer.appendChild(table);

}

// on button click, display statistics on the selected date
// selected date index
dateIdx = 0;
function chooseDate() {
	dateselector = document.getElementById("dateselector");
	dateIdx = dateselector.selectedIndex;
	//console.log(selectedDate);
	console.log(dateIdx)

	// process sensor data statistics, group by rooms
	var room1_temperature = []
	var room1_humidity = []
	var room2_temperature = []
	var room2_humidity = []
	var room3_temperature = []
	var room3_humidity = []

	for (var i = 0; i < sensor_data_date[dateIdx].measurements.length; i++) {
		switch (sensor_data_date[dateIdx].measurements[i].roomArea) {
			case "roomArea1":
				room1_temperature.push(sensor_data_date[dateIdx].measurements[i].temperature)
				room1_humidity.push(sensor_data_date[dateIdx].measurements[i].humidity)
				break;

			case "roomArea2":
				room2_temperature.push(sensor_data_date[dateIdx].measurements[i].temperature)
				room2_humidity.push(sensor_data_date[dateIdx].measurements[i].humidity)
				break;

			case "roomArea3":
				room3_temperature.push(sensor_data_date[dateIdx].measurements[i].temperature)
				room3_humidity.push(sensor_data_date[dateIdx].measurements[i].humidity)
				break;
		}
	}

	// compute statistics
	var statistics_temp = [
		[Math.max(...room1_temperature).toFixed(2), Math.min(...room1_temperature).toFixed(2), median(room1_temperature).toFixed(2), average(room1_temperature).toFixed(2)],
		[Math.max(...room2_temperature).toFixed(2), Math.min(...room2_temperature).toFixed(2), median(room2_temperature).toFixed(2), average(room2_temperature).toFixed(2)],
		[Math.max(...room3_temperature).toFixed(2), Math.min(...room3_temperature).toFixed(2), median(room3_temperature).toFixed(2), average(room3_temperature).toFixed(2)]
	]

	var statistics_humidity = [
		[Math.max(...room1_humidity).toFixed(2), Math.min(...room1_humidity).toFixed(2), median(room1_humidity).toFixed(2), average(room1_humidity).toFixed(2)],
		[Math.max(...room2_humidity).toFixed(2), Math.min(...room2_humidity).toFixed(2), median(room2_humidity).toFixed(2), average(room2_humidity).toFixed(2)],
		[Math.max(...room3_humidity).toFixed(2), Math.min(...room3_humidity).toFixed(2), median(room3_humidity).toFixed(2), average(room3_humidity).toFixed(2)]
	]

	// create dynamic table temperature
	var table_temp = document.createElement("table");
	var table_hum = document.createElement("table");

	generateTable(table_temp, "showDataTemp", statistics_temp);
	generateTable(table_hum, "showDataHumidity", statistics_humidity);
}