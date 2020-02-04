# CSV to jQuery tablesorter

Display any CSV file as a searchable, filterable, pretty HTML table. Done in 100% JavaScript.

This project is alternative to [derekeder/csv-to-html-table](https://github.com/derekeder/csv-to-html-table) with substitutions:

  * [jquery-csv](https://github.com/evanplaice/jquery-csv/) -> [papaparse](https://github.com/mholt/PapaParse)
  * [datatables](https://datatables.net/) -> [tablesorter](https://mottie.github.io/tablesorter/docs/)

Check out the working demo: https://pavelsr.github.io/csv-to-tablesorter/

In demo `<thead>` is predefined in html code but you can easily read it from csv file or add dynamically with js.

You can also rewrite `createTable()` function according your needs - e.g. for pretty output of links, images etc.

By default all dependencies are loaded from `cdnjs.cloudflare.com`

<!--ts-->
   * [CSV to jQuery tablesorter](#csv-to-jquery-tablesorter)
   * [HOW TO](#how-to)
      * [Define thead is javascript](#define-thead-is-javascript)
      * [Get header from first row](#get-header-from-first-row)
      * [Create table in case if tableData is array of objects instead of array of arrays](#create-table-in-case-if-tabledata-is-array-of-objects-instead-of-array-of-arrays)
      * [Allow header word transfer](#allow-header-word-transfer)
      * [Get file change date](#get-file-change-date)
      * [Data formatting for filtering](#data-formatting-for-filtering)
      * [Host as JSON API](#host-as-json-api)
   * [Possible console errors](#possible-console-errors)
      * [XML Parsing Error: not well-formed](#xml-parsing-error-not-well-formed)
      * [TypeError: e is undefined on  jquery.tablesorter.widgets](#typeerror-e-is-undefined-on--jquerytablesorterwidgets)

<!-- Added by: pavel, at: Сб янв 11 13:31:50 MSK 2020 -->

<!--te-->

# HOW TO

## Define `thead` is javascript

You can redefine `createTable()` like that:

```javascript

function createTable(tableData, callback) {
    var table = $('table#jquery-table');
    
    table.empty();

    table.append(
        $('<thead>').append(
            $('<tr>').append(
                $('<th>').text("Col1 header"),
                $('<th>').text("Col2 header"),
                $('<th>').text("Col3 header"),
                ...
            )
        )
    );

    var tbody = $('<tbody>');
    $.each(tableData, function(x, row) {
        var tr = $('<tr>');
        $.each(row, function(y, col) {
            tr.append( $('<td>').text(col) );
        });
        tbody.append(tr);
    });

    table.append(tbody);
    
    callback();
}

```

or make `thead` more elegant:

```javascript
var header_columns = ["Header_1", "Header_2", "Header_3"];
var thead_tr = $('<tr>');
$.each(header_columns, function(x, hcol) {
    $('<td>').text(hcol).appendTo(thead_tr);
});
table.append( $('<thead>').append(thead_tr) );
```

## Get header from first row

You can set PapaParse `header` option to true and pass to `createTable()` `results.meta.fields` in addition to `results.data` (or just pass whole `results` object)

```javascript
var table = $('table#jquery-table');
var thead_tr = $('<tr>');
$.each(results.meta.fields, function(x, col_h) {
    $('<td>').text(col_h).appendTo(thead_tr);
});
table.append( $('<thead>').append(thead_tr) );	
```

## Change columns order other than it's defined in parsed CSV file

After particular

## Hide columns from result table 

You should excluse field from `thead` and `tbody` both:

```javascript
$.each(results.meta.fields, function(x, col_name) {
	if ( col_name == "Col_name_to_exclude" ) {
		return true;
	}
    $('<td>').text(col_name).appendTo(thead_tr);
...
$.each(results.data, function(x, row) {
    var tr = $('<tr>');
    $.each(row, function(col_name, col_value) {
        if ( col_name == "Col_name_to_exclude" ) { // не отображаем вообще
			return true;
		}
        tr.append( $('<td>').text(col_value) );

```


## Create table in case if `tableData` is array of objects instead of array of arrays

E.g. if you are reading data from JSON API following code example can be useful

```javascript
$.each(tableData, function(i, item) {
    $('<tr>').append(
        $('<td>').text(item.prop1),
        $('<td>').text( js_func_1( item.prop1, item.prop2 ) ),
        $('<td>').append( '<a href="' + item.prop3 + '" target="_blank">'+ js_func_2(item.prop4) + '</a>' ),
        ...
    ).appendTo( table.append( $('<tbody>') ) );
});
```

## Allow header word transfer

It's done automatically

## Get file change date

You can do it with jquery 

```javascript
$.get( csv_filename, function( data, textStatus, request ) {
	$("span#file_date").text( request.getResponseHeader("Last-Modified") );
	Papa.parse(data, { ...
```

## Dynamically add columns

You should add headers at `Papa.parse` `complete` callback, at `results.meta.fields` array.
Otherwise it will not tied properly

```javascript
Papa.parse(data, {
		complete: function(results) {
			results.meta.fields.push('New column header');
```

An you should fill dynamic columns values at `createTable()` row iterator

## Data formatting for filtering

Most good option is [formatter widget](https://mottie.github.io/tablesorter/docs/example-widget-formatter.html) - it allows
to save original cell text within the table cell data-attribute to maintain the sort order.

```javascript
widgetOptions: {
	formatter_column: {
        1 : function( text, data ) {
			console.log( "text in cell: " + text);
			console.log( "text in 2nd column: " + $(data.$cells[2]).text() );
			return _func( text, $(data.$cells[2]).text() );
		}
    },
    ...
```

Papa.parse parse all as string by default ( if you haven't set `dynamicTyping: true` )

You can use this construction for rounding numbers

```javascript
parseFloat( str.toString().replace(",", ".") ).toFixed(2)
```

## Host data as JSON API on Github

# Possible console errors

## XML Parsing Error: not well-formed

In console you can see that error. 

There is no problem if you see it locally and other code is working fine.

This error appears only because csv file has no `Content-type: text/csv` headers, inserted by server.

If you still annoyed by this you can run

```
python -m SimpleHTTPServer
```

and check your code on http://localhost:8000/

## TypeError: e is undefined on  jquery.tablesorter.widgets

It's a problem related to [select2](https://mottie.github.io/tablesorter/docs/example-widget-filter-formatter-select2.html) widget

Possible reason is empty field that's needed to be filtered ( e.g. it could be caused of trailing newline in end of csv file )

You can remove trailing newline in end of file with `perl -pi -e 'chomp if eof' demo.csv`

For exact debug please inspect array after `Parsing complete` message.

UPD: More elegant solution: set `skipEmptyLines: true` at `Papa.parse()`.

