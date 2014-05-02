var Process = require('./lib/Process.js');
var stats = require('./lib/stats.js');
var _ = require('underscore');

var countConfig = {
	type: 'count'
}

function OrigamiMetrics() {
	this.data = {};
	this.processes = {};
}

OrigamiMetrics.prototype = {

	count: function(key, units, description) {
		if(this.data[key]) {
			this.data[key].val += 1;
		} else {
			this.data[key] = {
				type: 'count',
				val: 1,
				units: units,
				description: description,
				since: new Date()
			}
		}
	},

	resetMovingAverageStats: function() {
		this.processes = [];
	},

	createProcess: function(key) {
		var process = new Process();


		if(!this.processes.hasOwnProperty(key)) {
			this.processes[key] = [];
		}
		this.processes[key].push(process);
		return process;
	},

	movingAverage: function(key) {
		if(!this.data.hasOwnProperty(key)) {
			this.data[key] = {}
		}
		var times = _.pluck(this.processes[key], 'duration');;
		console.log('proceses', this.processes[key]);
		console.log('times', times);
		this.data[key] = stats.getStats(times);
	},

	get: function() {
		return { data: this.data, processes: this.processes };
	}
}


function getVariance(arr, mean) {

}


module.exports = new OrigamiMetrics();