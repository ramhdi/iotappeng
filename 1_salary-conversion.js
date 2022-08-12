// get salary data json
var salary_data = $.ajax({
	url: "https://ramhdi.github.io/json/salary_data.json",
	async: false,
	dataType: 'json'
}).responseJSON;

// get user data json
const users_data = $.ajax({
	url: "http://jsonplaceholder.typicode.com/users",
	async: false,
	dataType: 'json'
}).responseJSON;

// get idr-usd rate
const rate = $.ajax({
	url: "https://api.exchangerate-api.com/v4/latest/IDR",
	async: false,
	dataType: 'json'
}).responseJSON;

const rate_idr_usd = rate.rates.USD;
console.log(rate_idr_usd);

// add usd salary to salary_data
for (var i = 0; i < salary_data.array.length; i++) {
	salary_data.array[i].salaryInUSD = salary_data.array[i].salaryInIDR * rate_idr_usd;
	//console.log(salary_data.array[i].salaryInIDR * rate_idr_usd);
}
console.log(salary_data);

// merge salary_data to users_data
const mergeById = (a1, a2) =>
	a1.map((itm) => ({
		...itm,
		...a2.find((item) => item.id === itm.id && item),
	}));
users_data_usd = mergeById(users_data, salary_data.array);

// display json table users_data
// extract table headers
// id, name, username, email, address, phone
var col = [];
for (var i = 0; i < users_data_usd.length; i++) {
	for (var key in users_data_usd[i]) {
		if (col.indexOf(key) === -1 && key != 'website' && key != 'company') {
			col.push(key);
		}
	}
}
console.log(col)

// create dynamic table
var table = document.createElement("table");

// create table header
var tr = table.insertRow(-1);

for (var i = 0; i < col.length; i++) {
	var th = document.createElement("th");
	th.innerHTML = col[i];
	tr.appendChild(th);
}

// add json data to each rows of the table
for (var i = 0; i < users_data_usd.length; i++) {
	tr = table.insertRow(-1);
	for (var j = 0; j < col.length; j++) {
		var tabCell = tr.insertCell(-1);

		switch (j) {
			case 4:
				addr = users_data_usd[i].address.street + ", "
					+ users_data_usd[i].address.suite + ", "
					+ users_data_usd[i].address.city + ", "
					+ users_data_usd[i].address.zipcode;
				tabCell.innerHTML = addr;
				break;

			case 6:
				tabCell.innerHTML = users_data_usd[i][col[j]].toFixed(2);
				break;

			case 7:
				tabCell.innerHTML = users_data_usd[i][col[j]].toFixed(2);
				break;

			default:
				tabCell.innerHTML = users_data_usd[i][col[j]];
		}
	}
}

// add the table to a container
var divContainer = document.getElementById("showData");
divContainer.innerHTML = "";
divContainer.appendChild(table);