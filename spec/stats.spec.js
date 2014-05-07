
var statistics = require('../lib/stats.js')
describe('stats', function() {

	it('calculates correctly with nothing passed in', function() {
		var stats = statistics.getStats([]);
		expect(stats.mean).toBeUndefined();
		expect(stats.min).toBeUndefined();
		expect(stats.max).toBeUndefined();
		expect(stats.stddev).toBeUndefined();
	});

	it('calculates correctly with a single value', function() {
		var stats = statistics.getStats([5]);
		expect(stats.mean).toEqual(5);
		expect(stats.min).toEqual(5);
		expect(stats.max).toEqual(5);
		expect(stats.stddev).toEqual(0);
	});

	it('calculates correctly with all the same values', function() {
		var stats = statistics.getStats([2,2,2,2]);
		expect(stats.mean).toEqual(2);
		expect(stats.min).toEqual(2);
		expect(stats.max).toEqual(2);
		expect(stats.stddev).toEqual(0);
	});


	it('calculates correctly with different values', function() {
		var stats = statistics.getStats([5,3]);
		expect(stats.mean).toEqual(4);
		expect(stats.min).toEqual(3);
		expect(stats.max).toEqual(5);
		expect(stats.stddev).toEqual(1);
	});
})