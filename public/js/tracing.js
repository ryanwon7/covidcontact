function addRow() {
	let table = document.getElementById("contacttrace");
	let rows = table.rows.length
	let row = table.insertRow(rows);
	let cell1 = row.insertCell(0);
	let cell2 = row.insertCell(1);
	cell2.innerHTML = "Date: <input type='date' id='datepick" + rows + "'>";
	updateRowIndex(rows);
}

function updateRowIndex(rows) {
	html = ""
	$.get("api/locations", {}, function(data) {
		let html = ""
		for(var i = 0; i < data.locations.length; i++) {
			let location = data.locations[i].location;
			html += "<option value='1'>" + String(location) + "</option>";
		}
		var table = document.getElementById("contacttrace");
		let row = table.rows[rows];
		var cell = row.cells[0];
		cell.innerHTML = "Location: <select name='activity' id='activity" + rows + "'><option value='0' disabled selected>--Select--</option>" + html + "</select>";
	});
}

function updateTableOp() {
	$.get("api/locations", {}, function(data) {
		let html = ""
		for(var i = 0; i < data.locations.length; i++) {
			let location = data.locations[i].location;
			html += "<option value='1'>" + String(location) + "</option>";
		}
		var table = document.getElementById("contacttrace");
		for (var i = 1, row; row = table.rows[i]; i++) {
			var cell = row.cells[0];
			cell.innerHTML = "Location: <select name='activity' id='activity" + i + "'><option value='0' disabled selected>--Select--</option>" + html + "</select>";
		}
	});
}

function addLocation() {
	var location = prompt("Please enter your new location:");
	$.get("api/addlocation", {location: location}, function (data) {
		let html = ""
		for(var i = 0; i < data.locations.length; i++) {
			let location = data.locations[i].location;
			html += "<option value='1'>" + String(location) + "</option>";
		}
		var table = document.getElementById("contacttrace");
		for (var i = 1, row; row = table.rows[i]; i++) {
			var cell = row.cells[0];
			cell.innerHTML = "Location: <select name='activity' id='activity" + i + "'><option value='0' disabled selected>--Select--</option>" + html + "</select>";
		}
	})
}

function submit() {
	fname = document.getElementById("fname").value;
	lname = document.getElementById("lname").value;
	if (fname == null || fname == "" || lname == null || lname == "") {
		alert("Please enter your first and last name to submit your testing data.");
	} else {
		var filled = true;
		var table = document.getElementById("contacttrace");
		for (var i = 1, row; row = table.rows[i]; i++) {
			var loc_status = document.getElementById("activity"+i).value;
			var date_val = document.getElementById("datepick"+i).value;
			if ((loc_status == 1 && date_val == "") || (loc_status == 0 && date_val != "")) {
				alert("Please enter both the location and the date for Location " + i + ".");
				filled = false;
				break;
			}
		}
		if (filled == true) {
			var contact = [];
			for (var i = 1, row; row = table.rows[i]; i++) {
				var loc_status = document.getElementById("activity"+i);
				var date_val = document.getElementById("datepick"+i).value;
				if (loc_status.value == 1 && date_val != "") {
					$.get("api/newentry", {fname: fname, lname: lname, location: loc_status.options[loc_status.selectedIndex].text, positive: "no", date: date_val}, 
						function (data) {
							if (data.total != 0) {
								for(var i = 0; i < data.tracedata.length; i++) {
									let fname = data.tracedata[i].fname;
									let lname = data.tracedata[i].lname;
									let location = data.tracedata[i].location;
									let date = data.tracedata[i].date;
									contact.push([fname, lname, location, date])
								}
							}
  					setTimeout(rewritePage(contact),600);
					})
				}
			}
		}
	}
}

function upload() {
	fname = document.getElementById("fname").value;
	lname = document.getElementById("lname").value;
	if (fname == null || fname == "" || lname == null || lname == "") {
		alert("Please enter your first and last name to submit your testing data.");
	} else {
		var filled = true;
		var table = document.getElementById("contacttrace");
		for (var i = 1, row; row = table.rows[i]; i++) {
			var loc_status = document.getElementById("activity"+i).value;
			var date_val = document.getElementById("datepick"+i).value;
			if ((loc_status == 1 && date_val == "") || (loc_status == 0 && date_val != "")) {
				alert("Please enter both the location and the date for Location " + i + ".");
				filled = false;
				break;
			}
		}
		var contact = [];
		if (filled = true) {
			for (var i = 1, row; row = table.rows[i]; i++) {
				var loc_status = document.getElementById("activity"+i);
				var date_val = document.getElementById("datepick"+i).value;
				if (loc_status.value == 1 && date_val != "") {
					$.get("api/newentry", {fname: fname, lname: lname, location: loc_status.options[loc_status.selectedIndex].text, positive: "yes", date: date_val}, 
						function (data) {
					})
				}
			}
			setTimeout(rewriteUploadStatus(), 600);
		}
	}
}

function rewritePage(contact) {
	let html = "<h2>Contact Tracing Results</h2>";
	if (contact.length == 0) {
		html += "<p>Based on the places you have visited and the dates you visited them, you have not been in contact with anyone diagnosed with COVID-19."
		html += "<br>For more information on COVID-19, visit our COVID-19 Information page here: <a href='/about'>COVID-19 INFORMATION</a>."
		html += "<br>If you believe you have any symptoms or if you are not sure if you have the coronavirus, take our symptom analyzer here: <a href='/analysis'>SYMPTOM ANALYSIS</a>. This will help guide you towards the correct steps of action based on your current symptoms.</p>"
	} else {
		html += "<p>Based on the places you have visited and the dates you visited them, you have may been in contact with the following people who have tested positive for COVID-19:</p>"
		html += "<table><tr><th>First Name</th><th>Last Name</th><th>Contact Location</th><th>Contact Date</th></tr>"
		for(let i=0; i < contact.length; i++) {
			html += "<tr><td>" + contact[i][0] + "</td><td>" + contact[i][1] + "</td><td>" + contact[i][2] + "</td><td>" + contact[i][3] + "</td></tr>";
		}
		html += "<br>For more information on COVID-19, visit our COVID-19 Information page here: <a href='/about'>COVID-19 INFORMATION</a>."
		html += "<br>If you believe you have any symptoms or if you are not sure if you have the coronavirus, take our symptom analyzer here: <a href='/analysis?#'>SYMPTOM ANALYSIS</a>. This will help guide you towards the correct steps of action based on your current symptoms.</p>"
		html += "</table>"
	}
	document.getElementById("traceadd").style.display = "none";
	document.getElementById("result").innerHTML = html;
	document.getElementById("result").style.display = "block";
}

function rewriteUploadStatus() {
	document.getElementById("traceadd").style.display = "none";
	document.getElementById("result").style.display = "block";
}

$(document).ready(function() {
    updateTableOp()
});