'use strict';

require('./ProcessQueue.js');

function Process() {
	this.startTime = null;
	this.endTime = null;
	this.duration = null;
	console.log('created process inside ');
}

Process.prototype = {
	start: function() {
		this.startTime = new Date();
	},
	end: function() { 
		this.endTime = new Date();
		this.duration = this.endTime.getTime() - this.startTime.getTime();
	}
};

module.exports = Process;