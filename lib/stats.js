var _ = require('underscore');


//todo: optimize/memoize...will be calling this twice!
function getMean(array) {
  var sum = _.reduce(array, function (memo, duration) {
    return memo + duration;
  }, 0);
  return sum / array.length;
}

function getStdDev(array, mean) {
	mean = mean || getMean(array);
  var sumOfSquares =  _.map(array, function(val) {
    return (val - mean) ^ 2;
  });

  sumOfSquares = sumOfSquares.reduce(function(memo, len) {
    return memo + len;
  }, 0);

  return Math.sqrt(sumOfSquares / array.length);
}

module.exports = {
	getStats: function(array) {
		var mean = getMean(array);

		return {
				type: 'movingaverage',
				period: '1',
				mean: mean,
				min: _.min(array),
				max: _.max(array),
				stddev: getStdDev(array, mean)
		}
	}
}

