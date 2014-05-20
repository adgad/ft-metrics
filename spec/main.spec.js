var ftMetrics = require('../main.js');

describe('FTMetrics API', function() {

	beforeEach(function() {
		ftMetrics.reset();
	});

	it('initialises', function() {

		expect(ftMetrics.data).toEqual({});
		expect(ftMetrics.processes).toEqual({});
		expect(ftMetrics.movingAveragePeriod).toEqual(60);

	});

	it('configure with custom options', function() {
		ftMetrics.configure({
			movingAveragePeriod: 3,
			maxSampleSize: 400
		});

		expect(ftMetrics.data).toEqual({});
		expect(ftMetrics.processes).toEqual({});
		expect(ftMetrics.movingAveragePeriod).toEqual(3);
		expect(ftMetrics.maxSampleSize).toEqual(400);

	});

	it('logs counts of stuff', function() {
		ftMetrics.count('something', 'visits', 'blah description');
		ftMetrics.count('something');
		ftMetrics.count('something');
		ftMetrics.count('something_else');

		expect(ftMetrics.data.something.type).toEqual('counter');
		expect(ftMetrics.data.something.val).toEqual(3);
		expect(ftMetrics.data.something.unit).toEqual('visits');
		expect(ftMetrics.data.something.description).toEqual('blah description');
		expect(ftMetrics.data.something_else.val).toEqual(1);
	});

	it('logs booleans', function() {
		ftMetrics.setFlag('something', true);
		expect(ftMetrics.data.something.type).toEqual('boolean');
		expect(ftMetrics.data.something.val).toEqual(true);
		ftMetrics.setFlag('something', false);
		expect(ftMetrics.data.something.val).toEqual(false);

		ftMetrics.setFlag('withDescription', false, 'describe the thing');
		expect(ftMetrics.data.withDescription.type).toEqual('boolean');
		expect(ftMetrics.data.withDescription.val).toEqual(false);

		ftMetrics.setFlag('justKey');
		expect(ftMetrics.data.justKey.type).toEqual('boolean');
		expect(ftMetrics.data.justKey.val).toEqual(true);
	});

	it('creates and cleans up processes', function(done) {

		var process;
		for(var i=0;i<10;i++) {
			ftMetrics.createProcess('key').start().end();
		}
		expect(ftMetrics.processes['key'].length).toEqual(10); 
		ftMetrics.configure({
			movingAveragePeriod: 1,
		});
		setTimeout(function() {
			ftMetrics.createProcess('key').start().end();
			expect(ftMetrics.processes['key'].length).toEqual(1);
			done();
		}, 1200);

	});

	it('caps off the number of processes it allows to measure', function() {
		ftMetrics.configure({
			maxSampleSize: 3
		});
		var process;
		for(var i=0;i<10;i++) {
			ftMetrics.createProcess('key').start().end();
		}
		expect(ftMetrics.processes['key'].length).toEqual(3); 

	})
});