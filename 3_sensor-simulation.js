/*
	Sensor Aggregation Simulation

	Generate random data points with similar format
	to sensor_data.json for each sensor and room
	every two seconds and plot the data

	Feature restrictions: due to CORS restriction,
	the browser isn't able to write the data to local JSON file,
	instead, the JSON data will be printed to the page
	to represent the data writing feature

	Rama Rahardi, 12/08/2022
	rahardi6699@gmail.com
*/

// define math functions
// median of an array
const median = arr => {
	const mid = Math.floor(arr.length / 2),
		nums = [...arr].sort((a, b) => a - b);
	return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

// average (arithmetic mean) of an array
const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

var id = []
var time = []

var room1_temp = []
var room1_hum = []
var room2_temp = []
var room2_hum = []
var room3_temp = []
var room3_hum = []

const period = 2000; // 2 seconds period
var generate = null;
var i = 0;

// generate temperature chart room 1
temp_charts1 = document.getElementById("showTemp1");
temp_chart1 = new Chart(temp_charts1, {
	type: 'line', // line chart
	data: {
		labels: time, // x-axis data
		datasets: [{
			label: "Temperature",
			data: room1_temp, // y-axis data 
			borderColor: 'rgb(192, 75, 75)',
		}]
	},
	options: {
		responsive: true,
		legend: { display: false },
		scales: {
			y: {
				display: true,
				min: 0,
				max: 100
			}
		}
	}
});

// generate temperature chart room 2
temp_charts2 = document.getElementById("showTemp2");
temp_chart2 = new Chart(temp_charts2, {
	type: 'line', // line chart
	data: {
		labels: time, // x-axis data
		datasets: [{
			label: "Temperature",
			data: room2_temp, // y-axis data 
			borderColor: 'rgb(192, 75, 75)',
		}]
	},
	options: {
		responsive: true,
		legend: { display: false },
		scales: {
			y: {
				display: true,
				min: 0,
				max: 100
			}
		}
	}
});

// generate temperature chart room 3
temp_charts3 = document.getElementById("showTemp3");
temp_chart3 = new Chart(temp_charts3, {
	type: 'line', // line chart
	data: {
		labels: time, // x-axis data
		datasets: [{
			label: "Temperature",
			data: room3_temp, // y-axis data 
			borderColor: 'rgb(192, 75, 75)',
		}]
	},
	options: {
		responsive: true,
		legend: { display: false },
		scales: {
			y: {
				display: true,
				min: 0,
				max: 100
			}
		}
	}
});

// generate humidity chart room 1
hum_charts1 = document.getElementById("showHum1");
hum_chart1 = new Chart(hum_charts1, {
	type: 'line', // line chart
	data: {
		labels: time, // x-axis data
		datasets: [{
			label: "Humidity",
			data: room1_hum, // y-axis data 
			borderColor: 'rgb(75, 192, 192)',
		}]
	},
	options: {
		responsive: true,
		legend: { display: false },
		scales: {
			y: {
				display: true,
				min: 0,
				max: 100
			}
		}
	}
});

// generate humidity chart room 2
hum_charts2 = document.getElementById("showHum2");
hum_chart2 = new Chart(hum_charts2, {
	type: 'line', // line chart
	data: {
		labels: time, // x-axis data
		datasets: [{
			label: "Humidity",
			data: room2_hum, // y-axis data 
			borderColor: 'rgb(75, 192, 192)',
		}]
	},
	options: {
		responsive: true,
		legend: { display: false },
		scales: {
			y: {
				display: true,
				min: 0,
				max: 100
			}
		}
	}
});

// generate humidity chart room 3
hum_charts3 = document.getElementById("showHum3")
hum_chart3 = new Chart(hum_charts3, {
	type: 'line', // line chart
	data: {
		labels: time, // x-axis data
		datasets: [{
			label: "Humidity",
			data: room3_hum, // y-axis data 
			borderColor: 'rgb(75, 192, 192)',
		}]
	},
	options: {
		responsive: true,
		legend: { display: false },
		scales: {
			y: {
				display: true,
				min: 0,
				max: 100
			}
		}
	}
});

// generate random
function generateRandom() {
	time_n = Date.now();
	timedate_n = (new Date(time_n)).toLocaleTimeString();

	// generate data room 1
	room1_id_n = i;
	room1_temp_n = Math.random() * 100;
	room1_hum_n = Math.random() * 100;

	// print json
	var room1_msg = {
		"temperature": room1_temp_n,
		"humidity": room1_hum_n,
		"roomArea": "roomArea1",
		"id": room1_id_n,
		"timestamp": time_n
	}
	document.getElementById("room1json").innerHTML = JSON.stringify(room1_msg);
	i++;

	// generate data room 2
	room2_id_n = i;
	room2_temp_n = Math.random() * 100;
	room2_hum_n = Math.random() * 100;

	// print json
	var room2_msg = {
		"temperature": room2_temp_n,
		"humidity": room2_hum_n,
		"roomArea": "roomArea2",
		"id": room2_id_n,
		"timestamp": time_n
	}
	document.getElementById("room2json").innerHTML = JSON.stringify(room2_msg);
	i++;

	// generate data room 3
	room3_id_n = i;
	room3_temp_n = Math.random() * 100;
	room3_hum_n = Math.random() * 100;

	// print json
	var room3_msg = {
		"temperature": room3_temp_n,
		"humidity": room3_hum_n,
		"roomArea": "roomArea3",
		"id": room3_id_n,
		"timestamp": time_n
	}
	document.getElementById("room3json").innerHTML = JSON.stringify(room3_msg);
	i++;

	// update temperature chart room 1
	temp_chart1.data.labels.push(timedate_n);
	temp_chart1.data.datasets.forEach((dataset) => {
		dataset.data.push(room1_temp_n);
	});
	temp_chart1.update();

	// update temperature statistics room 1
	document.getElementById("room1tempmax").innerHTML = "<b>Max: </b>" + Math.max(...room1_temp).toFixed(2);
	document.getElementById("room1tempmin").innerHTML = "<b>Min: </b>" + Math.min(...room1_temp).toFixed(2);
	document.getElementById("room1tempmed").innerHTML = "<b>Med: </b>" + median(room1_temp).toFixed(2);
	document.getElementById("room1tempavg").innerHTML = "<b>Avg: </b>" + average(room1_temp).toFixed(2);

	// update temperature chart room 2
	temp_chart2.data.datasets.forEach((dataset) => {
		dataset.data.push(room2_temp_n);
	});
	temp_chart2.update();

	// update temperature statistics room 2
	document.getElementById("room2tempmax").innerHTML = "<b>Max: </b>" + Math.max(...room2_temp).toFixed(2);
	document.getElementById("room2tempmin").innerHTML = "<b>Min: </b>" + Math.min(...room2_temp).toFixed(2);
	document.getElementById("room2tempmed").innerHTML = "<b>Med: </b>" + median(room2_temp).toFixed(2);
	document.getElementById("room2tempavg").innerHTML = "<b>Avg: </b>" + average(room2_temp).toFixed(2);

	// update temperature chart room 3
	temp_chart3.data.datasets.forEach((dataset) => {
		dataset.data.push(room3_temp_n);
	});
	temp_chart3.update();

	// update temperature statistics room 3
	document.getElementById("room3tempmax").innerHTML = "<b>Max: </b>" + Math.max(...room3_temp).toFixed(2);
	document.getElementById("room3tempmin").innerHTML = "<b>Min: </b>" + Math.min(...room3_temp).toFixed(2);
	document.getElementById("room3tempmed").innerHTML = "<b>Med: </b>" + median(room3_temp).toFixed(2);
	document.getElementById("room3tempavg").innerHTML = "<b>Avg: </b>" + average(room3_temp).toFixed(2);

	// update humidity chart room 1
	hum_chart1.data.datasets.forEach((dataset) => {
		dataset.data.push(room1_hum_n);
	});
	hum_chart1.update();

	// update temperature statistics room 1
	document.getElementById("room1hummax").innerHTML = "<b>Max: </b>" + Math.max(...room1_hum).toFixed(2);
	document.getElementById("room1hummin").innerHTML = "<b>Min: </b>" + Math.min(...room1_hum).toFixed(2);
	document.getElementById("room1hummed").innerHTML = "<b>Med: </b>" + median(room1_hum).toFixed(2);
	document.getElementById("room1humavg").innerHTML = "<b>Avg: </b>" + average(room1_hum).toFixed(2);

	// update humidity chart room 2
	hum_chart2.data.datasets.forEach((dataset) => {
		dataset.data.push(room2_hum_n);
	});
	hum_chart2.update();

	// update temperature statistics room 1
	document.getElementById("room2hummax").innerHTML = "<b>Max: </b>" + Math.max(...room2_hum).toFixed(2);
	document.getElementById("room2hummin").innerHTML = "<b>Min: </b>" + Math.min(...room2_hum).toFixed(2);
	document.getElementById("room2hummed").innerHTML = "<b>Med: </b>" + median(room2_hum).toFixed(2);
	document.getElementById("room2humavg").innerHTML = "<b>Avg: </b>" + average(room2_hum).toFixed(2);

	// update humidity chart room 3
	hum_chart3.data.datasets.forEach((dataset) => {
		dataset.data.push(room3_hum_n);
	});
	hum_chart3.update();

	// update temperature statistics room 1
	document.getElementById("room3hummax").innerHTML = "<b>Max: </b>" + Math.max(...room3_hum).toFixed(2);
	document.getElementById("room3hummin").innerHTML = "<b>Min: </b>" + Math.min(...room3_hum).toFixed(2);
	document.getElementById("room3hummed").innerHTML = "<b>Med: </b>" + median(room3_hum).toFixed(2);
	document.getElementById("room3humavg").innerHTML = "<b>Avg: </b>" + average(room3_hum).toFixed(2);
}

// start generate random data
function startGenerate() {
	if (generate == null) {
		generate = setInterval(generateRandom, period);
	}
}

// stop generate random data
function stopGenerate() {
	clearInterval(generate);
	generate = null;
}