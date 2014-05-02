require('./ProcessQueue.js');

function Process() {
	this.startTime = null;
	this.endTime = null;
	this.duration = null;
	console.log('created process inside ');
}

Process.prototype = {
	start: function() {
		console.log('start');
		this.startTime = new Date();
	},
	end: function() { 
		console.log('end');
		this.endTime = new Date();
		this.duration = this.endTime.getTime() - this.startTime.getTime();
	}
}

module.exports = Process;