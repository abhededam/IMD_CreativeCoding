/* jslint esversion: 6 */

var background = loadImage('png/nah_ansicht.png');

var timer1 = setInterval(trafficSpawning1, 100);
var timer2 = setInterval(trafficSpawning2, 50);
var trafficArray1 = [];
var trafficArray2 = [];
var trafficSizes = [15, 17, 10, 8];



function setup() {
	createCanvas(1920, 1080);
	frameRate(60);
}

class Traffic {
	constructor(x, y, radius, color, speed) {
		this.x = x;
		this.y = y;
		this.r = radius;
		this.c = color;
		this.v = speed;
	}
	move(x, y) {
		this.x = x;
		this.y = y;
	}
	show() {
		fill(this.c);
		noStroke();
		ellipse(this.x, this.y, this.r * 2);
	}
}

function getPixelData(x,y)
{
	var off = (y * 1920 + x) * 4;
	ret = pixels[off];

	return ret;
}

function trafficSpawning1() 
{
	spawnX = 460;
	spawnY = 0;

	var randomSpawning = floor(random(0, 99));

	if (randomSpawning <= 49) {
		randomSpawning = 0;
	} else if (randomSpawning <= 61) {
		randomSpawning = 1;
	} else if (randomSpawning <= 73) {
		randomSpawning = 2;
	} else if (randomSpawning <= 99) {
		randomSpawning = 3;
	}

	if (trafficArray1.length > 0) {
		sharedRadius = trafficSizes[randomSpawning] + trafficArray1[trafficArray1.length - 1].r;
		sqDeltaX = sq(trafficArray1[trafficArray1.length - 1].x - spawnX);
		sqDeltaY = sq(trafficArray1[trafficArray1.length - 1].y - spawnY);
		delta = sqrt(sqDeltaX + sqDeltaY);

		if (sharedRadius >= delta) {
			return;
		}
	}

	if (randomSpawning == 0) {
		let car = new Traffic(spawnX, spawnY, trafficSizes[0], '#8c8c8c', 10);
		trafficArray1.push(car);
	} else if (randomSpawning == 1) {
		let publicTransport = new Traffic(spawnX, spawnY, trafficSizes[1], '#b3b3b3', 9);
		trafficArray1.push(publicTransport);
	} else if (randomSpawning == 2) {
		let bike = new Traffic(spawnX, spawnY, trafficSizes[2], '#dfdfdf', 7);
		trafficArray1.push(bike);
	} else if (randomSpawning == 3) {
		let pedastrian = new Traffic(spawnX, spawnY, trafficSizes[3], '#6e6e6e', 5);
		trafficArray1.push(pedastrian);
	}
}

function trafficSpawning2() {
	spawnX = 1910;
	spawnY = 900;

	var randomSpawning = floor(random(0, 99));

	if (randomSpawning <= 49) {
		randomSpawning = 0;
	} else if (randomSpawning <= 61) {
		randomSpawning = 1;
	} else if (randomSpawning <= 73) {
		randomSpawning = 2;
	} else if (randomSpawning <= 99) {
		randomSpawning = 3;
	}

	if (trafficArray2.length > 0) {
		sharedRadius = trafficSizes[randomSpawning] + trafficArray2[trafficArray2.length - 1].r;
		sqDeltaX = sq(trafficArray2[trafficArray2.length - 1].x - spawnX);
		sqDeltaY = sq(trafficArray2[trafficArray2.length - 1].y - spawnY);
		delta = sqrt(sqDeltaX + sqDeltaY);

		if (sharedRadius >= delta) {
			return;
		}
	}

	if (randomSpawning == 0) {
		let car = new Traffic(spawnX, spawnY, trafficSizes[0], '#8c8c8c', 10);
		trafficArray2.push(car);
	} else if (randomSpawning == 1) {
		let publicTransport = new Traffic(spawnX, spawnY, trafficSizes[1], '#b3b3b3', 9);
		trafficArray2.push(publicTransport);
	} else if (randomSpawning == 2) {
		let bike = new Traffic(spawnX, spawnY, trafficSizes[2], '#dfdfdf', 7);
		trafficArray2.push(bike);
	} else if (randomSpawning == 3) {
		let pedastrian = new Traffic(spawnX, spawnY, trafficSizes[3], '#6e6e6e', 5);
		trafficArray2.push(pedastrian);
	}
	console.log(randomSpawning);
}

function checkIfStillOnStreet(x, y, radius)
{
	left = getPixelData(floor(x-radius), floor(y));
	right = getPixelData(floor(x+radius), floor(y));
	up = getPixelData(floor(x), floor(y-radius));
	down = getPixelData(floor(x), floor(y+radius));
	dleft = getPixelData(floor(-sqrt(2)*radius/2 + x), floor(sqrt(2)*radius/2 + y));
	dright = getPixelData(floor(sqrt(2)*radius/2 + x), floor(sqrt(2)*radius/2 + y));
	
	p2 = 255;
	
	if(left == p2 && right == p2 && down == p2 && dleft == p2 && dright == p2)
		return true;
	
	return false;
}

function moveTraffic() {
	for (j = 0; j < trafficArray1.length; j++) {
		collision = false;

		rndVX = random(-trafficArray1[j].v, trafficArray1[j].v / 2);
		newX = trafficArray1[j].x + rndVX;

		// Nochmal besprechen
		newY = trafficArray1[j].y + sqrt(sq(trafficArray1[j].v) - sq(rndVX));

		if (j > 0) {
			sharedRadius = trafficArray1[j - 1].r + trafficArray1[j].r;
			squareDeltaX = sq(trafficArray1[j - 1].x - newX);
			squareDeltaY = sq(trafficArray1[j - 1].y - newY);
			delta = sqrt(squareDeltaX + squareDeltaY);

			if (sharedRadius > delta) {
				collision = true;
			}
		}

		if (!collision) {
			if (checkIfStillOnStreet(newX, newY, trafficArray1[j].r))
				trafficArray1[j].move(newX, newY);
		}

		if (trafficArray1[j].y > 1080 || trafficArray1[j].y < 0) {
			trafficArray1.shift();
		} else {
			trafficArray1[j].show();
		}
	}

	for (k = 0; k < trafficArray2.length; k++) {
		collision = false;

		rndVX = random(-trafficArray2[k].v, trafficArray2[k].v / 2);
		newY = trafficArray2[k].y + rndVX;

		// Nochmal besprechen
		newX = trafficArray2[k].x + (-1) * sqrt(sq(trafficArray2[k].v) - sq(rndVX));

		if (k > 0) {
			sharedRadius = trafficArray2[k - 1].r + trafficArray2[k].r;
			squareDeltaX = sq(trafficArray2[k - 1].y - newY);
			squareDeltaY = sq(trafficArray2[k - 1].x - newX);
			delta = sqrt(squareDeltaX + squareDeltaY);

			if (sharedRadius > delta) {
				collision = true;
			}
		}

		if (!collision) {
			if (checkIfStillOnStreet(newX, newY, trafficArray2[k].r))
				trafficArray2[k].move(newX, newY);
		}

		if (trafficArray2[k].y > 1080 || trafficArray2[k].y < 0) {
			trafficArray2.shift();
		} else {
			trafficArray2[k].show();
		}
	}
}

function draw() {
	clear();
	image(background,0,0);
	loadPixels();
    moveTraffic();
}