function createTable(tableData, callback) {
	
	var table = $('table#jquery-table');

	table.empty();
	
	var header_columns = ["Header_1", "Header_2", "Header_3", "B", "C"];
	var thead_tr = $('<tr>');
	$.each(header_columns, function(x, hcol) {
		$('<td>').text(hcol).appendTo(thead_tr);
 	});
	table.append( $('<thead>').append(thead_tr) );

	var tbody = $('<tbody>');
	$.each(tableData.data, function(x, row) {
	    var tr = $('<tr>');
	    $.each(row, function(y, col) {
	        tr.append( $('<td>').text(col) );
	    });
	    tbody.append(tr);
	});

	table.append(tbody);
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
					console.log("1 tablesorter.filterFormatter.select2 start");
					return $.tablesorter.filterFormatter.select2($cell, indx, {
						match: false
					});
				},
				2: function($cell, indx) {
					console.log("2 tablesorter.filterFormatter.select2 start");
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
	header: true,
	// quoteChar: '"',
	complete: function(results) {
		// console.log(results.meta.fields);
		console.log("Parsing complete:", results.data);
		createTable(results, TableSort);
	}
});
