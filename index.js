function createTable(tableData, callback) {
	
	// https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
	// var table = document.createElement('table');
	var table = document.getElementById('jquery-table');
	var tableBody = document.createElement('tbody');

	tableData.forEach(function(rowData) {
		var row = document.createElement('tr');

		rowData.forEach(function(cellData) {
			var cell = document.createElement('td');
			cell.appendChild(document.createTextNode(cellData));
			row.appendChild(cell);
		});

		tableBody.appendChild(row);
	});

	table.appendChild(tableBody);
	// document.body.appendChild(table);
	console.log("createTable finished");
	callback();
}

function TableSort() {
	$("#jquery-table").tablesorter({
		theme: 'blue',
		widthFixed: true,
		widgets: ['zebra', 'stickyHeaders', 'filter'],
		showProcessing: true,
		widgetOptions: {
			filter_formatter: {
				1: function($cell, indx) {
					return $.tablesorter.filterFormatter.select2($cell, indx, {
						match: false
					});
				},
				2: function($cell, indx) {
					return $.tablesorter.filterFormatter.select2($cell, indx, {
						match: false
					});
				},
			}
		}
	});
	console.log("tablesorter finished");
}

Papa.parse('demo.csv', {
	download: true,
	// quoteChar: '"',
	complete: function(results) {
		console.log("Parsing complete:", results.data);
		createTable(results.data, TableSort);
	}
});