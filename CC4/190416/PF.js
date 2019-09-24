const net = require('net');

const client = new net.Socket();

const PORT = '1234';
const IP = '172.16.15.119';

// set port and IP to the correct values (see slides)
client.connect(PORT, IP, function () {
	console.log('connected');
	for (let i = 0; i < 100; i++) {
		for (let j = 0; j < 100; j++) {
			client.write("PX "+i+" "+j+" 0061ff\n");
			
		}
		
	}
});

client.on('data', function (data) {
	console.log("incoming %s", data);
});
