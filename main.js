'use strict';

var Process = require('./lib/Process.js');
var stats = require('./lib/stats.js');
var _ = require('underscore');

function FtMetrics() {
	this.data = {};
	this.processes = {};
	this.movingAveragePeriod = 60 * 1000;
	setInterval(this.garbageCollect.bind(this), this.movingAveragePeriod);
	this.endpoint = this.endpoint.bind(this);
}

FtMetrics.prototype = {

	configure: function(options) {
		options = options || {};
		this.movingAveragePeriod = options.movingAveragePeriod || this.movingAveragePeriod;
	},
	count: function(key, unit, description) {
		if(this.data[key] && this.data[key].type === 'counter') {
			this.data[key].val += 1;
		} else {
			this.data[key] = {
				type: 'counter',
				val: 1,
				unit: unit,
				description: description,
				since: new Date()
			};
		}
	},

	setFlag: function(key, value, description) {
		value = (typeof value === 'undefined') ? true : value;
		if(this.data[key] && this.data[key].type === 'boolean') {
			this.data[key].val = value;
		} else {
			this.data[key] = {
				type: 'boolean',
				val: value,
				description: description,
			};
		}
	},

	garbageCollect: function() {
		var key;
		var now = (new Date()).getTime();
		for(key in this.processes) {
			if(this.processes.hasOwnProperty(key)) {
				this.processes[key] = this.filterOnlyRecentProcesses(key, now);
			}
		}
	},

	filterOnlyRecentProcesses: function(key, now) {
		var period = this.movingAveragePeriod;
		return _.filter(this.processes[key], function(proc) {
			if(proc.startTime) {
				return (now - proc.startTime.getTime()) < period;
			} else {
				return false;
			}
		});
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

	getJSON: function() {
		var self = this;
		_.each(this.processes, function(process, key) {
			self.movingAverage(key);
		});
		return { data: this.data};
	},

	endpoint: function(req, res) {
		res.send(this.getJSON());
	},

	monitor: function(key) {
		var self = this;
		return function(req, res, next) {
			key = key || req.route.path;
			var thisProcess = self.createProcess(key);
			req.on('end', function() {
				thisProcess.end();
			});
			thisProcess.start();
			next();
		};
	}
};


module.exports = new FtMetrics();