# CSV to jQuery tablesorter

Display any CSV file as a searchable, filterable, pretty HTML table. Done in 100% JavaScript.

This project is alternative to [derekeder/csv-to-html-table](https://github.com/derekeder/csv-to-html-table) with substitutions:

  * [jquery-csv](https://github.com/evanplaice/jquery-csv/) -> [papaparse](https://github.com/mholt/PapaParse)
  * [datatables](https://datatables.net/) -> [tablesorter](https://mottie.github.io/tablesorter/docs/)

Check out the working demo: http://derekeder.github.io/csv-to-html-table/

In demo `<thead>` is predefined in html code but you can easily read it from csv file or add dynamically with js.

You can also rewrite `createTable()` function according your needs - e.g. for pretty output of links, images etc.

By default all dependencies are loaded from `cdnjs.cloudflare.com`
