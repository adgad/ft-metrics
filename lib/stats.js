'use strict';

var _ = require('underscore');


function getMean(array) {
  var sum = _.reduce(array, function (memo, duration) {
    return memo + duration;
  }, 0);
  return sum / array.length;
}

function getStdDev(array, mean) {
	mean = mean || getMean(array);
  var sumOfSquares =  _.map(array, function(val) {
    return Math.pow((val - mean),2);
  });

  sumOfSquares = sumOfSquares.reduce(function(memo, len) {
    return memo + len;
  }, 0);

  return Math.sqrt(sumOfSquares / array.length);
}

module.exports = {
	getStats: function(array) {
		var mean = getMean(array);
		var stats = {
			type: 'movingaverage',
			unit: 'seconds',
			period: '60',
			mean: null,
			min: null,
			max: null,
			stddev: null
		};

		if(array.length > 0) {
			stats.mean = mean;
			stats.min = _.min(array);
			stats.max = _.max(array);
			stats.stddev = getStdDev(array, mean);
		}

		return stats;
	}
};

