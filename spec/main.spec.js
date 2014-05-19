var FtMetrics = require('../main.js');

describe('FTMetrics API', function() {

	it('initialises', function() {
		var ftMetrics = new FtMetrics();

		expect(ftMetrics.data).toEqual({});
		expect(ftMetrics.processes).toEqual({});
		expect(ftMetrics.movingAveragePeriod).toEqual(60000);

	});

	it('initialises with custom options', function() {
		var ftMetrics = new FtMetrics({
			movingAveragePeriod: 3
		});

		expect(ftMetrics.data).toEqual({});
		expect(ftMetrics.processes).toEqual({});
		expect(ftMetrics.movingAveragePeriod).toEqual(3);

	});

	it('logs counts of stuff', function() {
		var ftMetrics = new FtMetrics();
		ftMetrics.count('something', 'visits', 'blah description');
		
		ftMetrics.count('something');
		ftMetrics.count('something');
		ftMetrics.count('something_else');

		expect(ftMetrics.data.something.type).toEqual('count');
		expect(ftMetrics.data.something.val).toEqual(3);
		expect(ftMetrics.data.something.units).toEqual('visits');
		expect(ftMetrics.data.something.description).toEqual('blah description');
		expect(ftMetrics.data.something_else.val).toEqual(1);
	});

	it('creates and cleans up processes', function(done) {
		var ftMetrics = new FtMetrics({
			movingAveragePeriod: 1000
		});
		var process;
		for(var i=0;i<10;i++) {
			ftMetrics.createProcess('key').start().end();
		}
		expect(ftMetrics.processes['key'].length).toEqual(10); 

		setTimeout(function() {
			ftMetrics.createProcess('key').start().end();
			expect(ftMetrics.processes['key'].length).toEqual(1);
			done();
		}, 1200);


	})
});