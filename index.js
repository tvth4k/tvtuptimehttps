const cp = require('child_process');

start = () => {
	var child = cp.fork(__dirname + '/server.js');

	child.on("close", () => {
		console.log("Restarting...")
		setTimeout(() => start(), 250)
	});
};
start();