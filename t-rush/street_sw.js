/* jslint esversion: 6 */


var timer = setInterval(trafficSpawning, 100); //alle 100 Millisekunden wird ein Fahrzeug gespawnt
// in diesen Arrays werden die Fahrzeuge rein gepusht
var leftPedestrianArray = [];
var rightPedestrianArray = [];
var leftBikeArray = [];
var rightBikeArray = [];
var leftCarArray = [];
var rightCarArray = [];
var publicArray = [];


function setup() {
	var pos = createCanvas(690, 1080);
	pos.position(width / 2, 0);
	frameRate(60);

}


class Lane {
	constructor(x, width, minWidth, color) {
		this.x = x; //Position der Fahrbahn
		this.width = width; //die actuelle Breite der Fahrbahn
		this.minW = minWidth; // so Breit muss diese Fahrbahn mindestens sein damit ein Fahrzeug darauf fahren 
		this.c = color; //Farbe der Fahrbahn
	}
	show() //Methode um die Fahrbahn zu zeichnen
	{
		fill(this.c);
		stroke(255);
		strokeWeight(2);
		rect(this.x, 0, this.width, 1080);
	}
}

class Traffic // Klasse um die Fahrzeugobjekte zu machen
{
	constructor(startX, startY, radius, color, speed, direction) {
		this.startX = startX; // die Position wo das Fahrzeug gespawnt 
		this.startY = startY;

		this.x = startX; // aktuelle Position
		this.y = startY;
		this.r = radius;
		this.c = color;
		this.v = speed; //wie viele Pixel es sich bei jeder Bewegung bewegt
		this.direction = direction; // hoch oder runter
	}
	move(x, y) // berechnet wie es sich bewegt
	{
		this.x = x;
		this.y = y;
	}
	show() // hier wird gezeichnet
	{
		fill(this.c);
		strokeWeight(0);
		ellipse(this.x, this.y, this.r * 2);
	}
}

//Fuer jede Fahrbahn wird ein separates Objekt benoetigt
let leftCar = new Lane(this.x, 150, 140, '#8c8c8c'); //(xposition,aktuelle Breite, mindest Breite, Farbe)
let rightCar = new Lane(this.x, 150, 140, '#8c8c8c');
let publicLane = new Lane(this.x, 150, 140, '#b3b3b3');
let leftBike = new Lane(this.x, 70, 65, '#dfdfdf');
let rightBike = new Lane(this.x, 70, 65, '#dfdfdf');
let leftPedestrian = new Lane(this.x, 50, 40, '#6e6e6e');
let rightPedestrian = new Lane(this.x, 50, 40, '#6e6e6e');

//hier ordnen wir die Fahrbahnen schon in der richtigen Reihenfolge
laneArray = [leftPedestrian, leftBike, leftCar, publicLane, rightCar, rightBike, rightPedestrian];
//Die arrays fuer die jeweiligen Objekte ebenfalls in der gleichen Reihenfolge in einem array speichern
trafficArray = [leftPedestrianArray, leftBikeArray, leftCarArray, publicArray, rightCarArray, rightBikeArray, rightPedestrianArray];

function editLanes() // Funktion um die Fahrbahnbreiten zu bearbeiten
{

	for (let i = 0; i < laneArray.length; i++) {
		if (i == 0) // die erste Fahrbahn hat immer x Position 0
		{
			laneArray[i].x = 0;
		} else {
			laneArray[i].x = laneArray[i - 1].x + laneArray[i - 1].width; // die x Position = die x Position der Fahrbahn davor + die Breite der Fahrbahn davor
		}
	}
	for (let i = 0; i < laneArray.length; i++) // solange die For-Schleife kleiner ist als die Länge des Arrays
	{
		laneArray[i].show();
	}
	for (let i = 1; i < laneArray.length; i++) //wichtig, dass man hier nicht bei null anfängt 
	{

		if (laneArray[0].width + laneArray[1].width + laneArray[2].width + laneArray[3].width + laneArray[4].width + laneArray[5].width + laneArray[6].width == 690) {
			/**Funktioniert bsp.weise wie eine Button abfrage, wir gehen immer von der x postion aus und 
			 * dann muss es +/- 10 pixel darum sein damit wir die grenze bearbeiten  */
			if (mouseX < laneArray[i].x + 10 && mouseX > laneArray[i].x - 10) {
				fill(laneArray[i].c);
				ellipse(mouseX, mouseY, 10);
				/**
				 * Maus wird gedrückt und ist rechts von der begrenzung 
				 */
				if (mouseIsPressed && mouseX > laneArray[i].x) {
					laneArray[i - 1].width++;
					laneArray[i].width--;
					/**
					 *Maus wird gedrückt und ist links von der begrenzung 
					 */
				} else if (mouseIsPressed && mouseX < laneArray[i].x) {
					laneArray[i - 1].width--;
					laneArray[i].width++;
				}
			}
		}
	}
}

function spawnTraffic(lane, traffic, randomP) {
	if (laneArray[randomP].width >= laneArray[randomP].minW) {
		if (trafficArray[randomP] != lane)
			return;

		if (lane.length > 0) {
			sharedRadius = 100;
			sqDeltaX = sq(lane[lane.length - 1].x - lane[lane.length - 1].startX);
			sqDeltaY = sq(lane[lane.length - 1].y - lane[lane.length - 1].startY);
			delta = sqrt(sqDeltaX + sqDeltaY);

			if (sharedRadius < delta) {
				lane.push(traffic);
			}
		} else {
			lane.push(traffic);
		}
	}
}

function trafficSpawning() {
	let carDown = new Traffic(laneArray[2].x + (laneArray[2].width / 2), 0, 50, '#ffffffff', 10, 1); //(x postion, y wert beim spawning, radius, farbe, geschwindigkeit, richtung )
	let carUp = new Traffic(laneArray[4].x + (laneArray[4].width / 2), 1080, 50, '#ffffffff', 10, -1);
	let publicTransport = new Traffic(laneArray[3].x + (laneArray[3].width / 2), 1080, 70, '#ffffffff', 9, -1);
	let bikeDown = new Traffic(laneArray[1].x + (laneArray[1].width / 2), 0, 30, '#ffffffff', 7, 1);
	let bikeUp = new Traffic(laneArray[5].x + (laneArray[5].width / 2), 1080, 30, '#ffffffff', 7, -1);
	let pedestrianDown = new Traffic(laneArray[0].x + (laneArray[0].width / 2), 0, 20, '#ffffffff', 5, 1);
	let pedestrianUp = new Traffic(laneArray[6].x + (laneArray[6].width / 2), 1080, 20, '#ffffffff', 5, -1);

	var randomSpawning = floor(random(0, 100));

	streetwidth = laneArray[0].width + laneArray[1].width + laneArray[2].width + laneArray[3].width + laneArray[4].width + laneArray[5].width + laneArray[6].width;

	pedestrianProbabiltity = 100 / streetwidth * (laneArray[0].width + laneArray[6].width);
	bikeProbabiltity = 100 / streetwidth * (laneArray[1].width + laneArray[5].width);
	carProbabiltity = 100 / streetwidth * (laneArray[2].width + laneArray[4].width);
	publicProbabiltity = 100 / streetwidth * laneArray[3].width;

	var randomP = 0;

	if (randomSpawning <= pedestrianProbabiltity) {
		randomP = floor(random(0, 2));
		if (randomP == 1)
			randomP += 5;
	} else if (randomSpawning <= pedestrianProbabiltity + bikeProbabiltity) {
		randomP = floor(random(1, 3));
		if (randomP == 2)
			randomP += 3;
	} else if (randomSpawning <= pedestrianProbabiltity + bikeProbabiltity + carProbabiltity) {
		randomP = floor(random(2, 4));
		if (randomP == 3)
			randomP++;
	} else if (randomSpawning <= 100) {
		randomP = 3;
	}

	spawnTraffic(leftPedestrianArray, pedestrianDown, randomP);
	spawnTraffic(leftBikeArray, bikeDown, randomP);
	spawnTraffic(leftCarArray, carDown, randomP);
	spawnTraffic(publicArray, publicTransport, randomP);
	spawnTraffic(rightCarArray, carUp, randomP);
	spawnTraffic(rightBikeArray, bikeUp, randomP);
	spawnTraffic(rightPedestrianArray, pedestrianUp, randomP);
}

function moveTraffic() {
	for (i = 0; i < trafficArray.length; i++) {
		currentLaneArray = trafficArray[i];
		currentLane = laneArray[i];

		for (j = 0; j < currentLaneArray.length; j++) {
			collision = false;

			rndVX = random(-currentLaneArray[j].v, currentLaneArray[j].v);
			newX = currentLaneArray[j].x + rndVX;

			minDiff = newX - currentLaneArray[j].r - currentLane.x;
			maxDiff = currentLane.x + currentLane.width - newX - currentLaneArray[j].r;

			if (minDiff < 0)
				newX -= minDiff;
			else if (maxDiff < 0)
				newX += maxDiff;

			// Nochmal besprechen
			newY = currentLaneArray[j].y + sqrt(sq(currentLaneArray[j].v) - sq(rndVX)) * currentLaneArray[j].direction;

			if (j > 0) {
				sharedRadius = currentLaneArray[j - 1].r + currentLaneArray[j].r;
				squareDeltaX = sq(currentLaneArray[j - 1].x - newX);
				squareDeltaY = sq(currentLaneArray[j - 1].y - newY);
				delta = sqrt(squareDeltaX + squareDeltaY);

				if (sharedRadius > delta) {
					collision = true;
				}
			}

			if (!collision) {
				currentLaneArray[j].move(newX, newY);
			}

			if (currentLaneArray[j].y > 1080 || currentLaneArray[j].y < 0) {
				currentLaneArray.shift();
			} else {
				currentLaneArray[j].show();
			}
		}
	}
}

function draw() {
	clear();
	editLanes();
	moveTraffic();
}