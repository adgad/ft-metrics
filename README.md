```
var ftMetrics = require('ft-metrics');

//count something
ftMetrics.count('some-key', 'units');

//manually track a process
var process = ftMetrics.createProcess('blah');
process.start();
process.end();

//use as middleware for a route
server.get('/v1/getAuthors/:id', ftMetrics.monitor(), controllers.getAuthors(ftApi));

//get json
ftMetrics.get();
```