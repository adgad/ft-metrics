
#FtMetrics

FtMetrics is a node module/express middleware that allows you to simply integrate some basic metrics that comply with the [Origami Metrics spec](http://origami.ft.com/docs/syntax/metrics/)

##How to use

###Requireing the object

```javascript
var ftMetrics = require('ft-metrics');
```

There is also a `configure` method that you can use to override some default settings.

```javascript
var ftMetrics = require('ft-metrics');
ftMetrics.configure({
	movingAveragePeriod: 120 , //seconds to keep moving average for, default 1 minute
	maxSampleSize: 4000, //limits the number of events to keep track of during a moving average period - defaults to 10000.
});
```

###Gathering metrics

#####Counter

Log a value representing a count, e.g. number of running processes, items in a queue, bytes of disk space remaining, seconds since last new content, etc

`ftMetrics.count(key, optionalUnits, optionalDescription)`

Examples:
```javascript
ftMetrics.count('something', 'visits', 'blah description');
ftMetrics.count('something');
ftMetrics.count('something');
ftMetrics.count('something_else');
```

#####Booleans
Log a simple true/false value
```javascript
ftMetrics.setFlag('some-boolean', false);
ftMetrics.setFlag('some-boolean', true);
ftMetrics.setFlag('some-other-boolean', true, 'A description of the boolean');
```

#####Response time stats
The most common use case for gathering moving average statistics is to measure the response times of an endpoint. FtMetrics provides middleware that will automatically keep track of response times for a given route.
```javascript
server.get('/v1/someRoute', ftMetrics.monitor(), someAction);
```

You can also group multiple routes to the same key, by specifying a key to use.
```javascript
server.get('/route/to/action', ftMetrics.monitor('someAction'), someAction);
server.get('/anotherroute/to/action', ftMetrics.monitor('someAction'), someAction);
```

#####Manually tracking moving averages.
You can also manually calculate stats around some other processes that aren't routes e.g. connecting to a backend service.

```javascript
var process = ftMetrics.createProcess('blah');
process.start();
process.end();
```

###Displaying Metrics

You can get an object representation of all the gathered metrics with the `getJSON` method.

```javascript
var metrics = ftMetrics.getJSON();
```

There is also an express method that can be used to handle the `__metrics` endpoint as per the Origami spec.

```javascript
server.get('/__metrics', ftMetrics.endpoint);
```
