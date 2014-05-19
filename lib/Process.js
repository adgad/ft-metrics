'use strict';

function Process() {
	this.startTime = null;
	this.endTime = null;
	this.duration = null;
}

Process.prototype = {
	start: function() {
		this.startTime = new Date();
		return this;
	},
	end: function() { 
		this.endTime = new Date();
		this.duration = this.endTime.getTime() - this.startTime.getTime();
		return this;
	}
};

module.exports = Process;