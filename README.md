# CSV to jQuery tablesorter

Display any CSV file as a searchable, filterable, pretty HTML table. Done in 100% JavaScript.

This project is alternative to [derekeder/csv-to-html-table](https://github.com/derekeder/csv-to-html-table) with substitutions:

  * [jquery-csv](https://github.com/evanplaice/jquery-csv/) -> [papaparse](https://github.com/mholt/PapaParse)
  * [datatables](https://datatables.net/) -> [tablesorter](https://mottie.github.io/tablesorter/docs/)

Check out the working demo: https://pavelsr.github.io/csv-to-tablesorter/

In demo `<thead>` is predefined in html code but you can easily read it from csv file or add dynamically with js.

You can also rewrite `createTable()` function according your needs - e.g. for pretty output of links, images etc.

By default all dependencies are loaded from `cdnjs.cloudflare.com`

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
