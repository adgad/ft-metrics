'use strict';

var Process = require('./lib/Process.js');
var stats = require('./lib/stats.js');
var _ = require('underscore');

function FTMetrics() {
	this.data = {};
	this.processes = {};
}

FTMetrics.prototype = {

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
			};
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
			this.data[key] = {};
		}
		var times = _.pluck(this.processes[key], 'duration');
		this.data[key] = stats.getStats(times);
	},

	get: function() {
		var self = this;
		_.each(this.processes, function(process, key) {
			self.movingAverage(key);
		});
		return { data: this.data};
	},

	monitor: function() {
		var self = this;
		return function(req, res, next) {
			var thisProcess = self.createProcess(req.route.path);
			req.on('end', function() {
				thisProcess.end();
			});
			thisProcess.start();
			next();
		};
	}
};


module.exports = new FTMetrics();