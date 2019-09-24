const net = require('net');

const client = new net.Socket();

const PORT = '172.16.15.119';
const IP = '1234';

// set port and IP to the correct values (see slides)
client.connect(PORT, IP, function () {
	console.log('connected');

	client.write("This is a message from Aileen");
});

client.on('data', function (data) {
	console.log("incoming %", data);
});