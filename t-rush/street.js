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


function setup() 
{
	var pos = createCanvas(690, 1080);
	pos.position(width/2, 0);
	frameRate(30);
}


class Lane 
{
	constructor(x, width, minWidth, color) 
	{
		this.x = x; //Position der Fahrbahn
		this.width = width; //die actuelle Breite der Fahrbahn
		this.minW = minWidth; // so Breit muss diese Fahrbahn mindestens sein damit ein Fahrzeug darauf fahren kann
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
	constructor(startX, startY, radius, color, speed, direction) 
	{
		this.startX = startX; // die Position wo das Fahrzeug gespawnt wird 
		this.startY = startY;

		this.x = startX; // aktuelle Position
		this.y = startY;
		this.r = radius;
		this.c = color;
		this.v = speed; //wie viele Pixel es sich bei jeder Bewegung bewegt
		this.direction = direction; // hoch oder runter
	}
	move(x, y) // objekte werden tatsächlich bewegt
	{
		this.x = x;
		this.y = y;
	}
	show() // hier wird gezeichnet // draw(), display() etc. - Methode
	{
		fill(this.c);
		strokeWeight(0);
		ellipse(this.x, this.y, this.r * 2);
	}
}

//Fuer jede Fahrbahn wird ein separates Objekt benoetigt
let leftCar = new Lane(this.x, 150, 140, '#e73030ff'); //(xposition,aktuelle Breite, mindest Breite, Farbe)
let rightCar = new Lane(this.x, 150, 140, '#e73030ff');
let publicLane = new Lane(this.x, 150, 140, '#fd6c33ff');
let leftBike = new Lane(this.x, 70, 65, '#fe921fff');
let rightBike = new Lane(this.x, 70, 65, '#fe921fff');
let leftPedestrian = new Lane(this.x, 50, 40, '#6e6ebaff');
let rightPedestrian = new Lane(this.x, 50, 40, '#6e6ebaff');

//hier ordnen wir die Fahrbahnen schon in der richtigen Reihenfolge
laneArray = [leftPedestrian, leftBike, leftCar, publicLane, rightCar, rightBike, rightPedestrian];
//Die Arrays fuer die jeweiligen Objekte ebenfalls in der gleichen Reihenfolge in einem Array speichern
trafficArray = [leftPedestrianArray, leftBikeArray, leftCarArray, publicArray, rightCarArray, rightBikeArray, rightPedestrianArray];

function editLanes() // Funktion um die Fahrbahnbreiten zu bearbeiten
{

	for (let i = 0; i < laneArray.length; i++) 
	{
		if (i == 0) // die erste Fahrbahn hat immer x Position 0
		{
			laneArray[i].x = 0;
		} else 
		{
			laneArray[i].x = laneArray[i - 1].x + laneArray[i - 1].width; //die x Position = die x Position der Fahrbahn davor + die Breite der Fahrbahn davor
		}
	}
	for (let i = 0; i < laneArray.length; i++) //solange die For-Schleife kleiner ist als die Länge des Arrays
	{
		laneArray[i].show();
	}
	for (let i = 1; i < laneArray.length; i++) //wichtig, dass man hier nicht bei null anfängt, weil wir die Gesamtstraßenbreite nicht verändern wollen sondern nur die innen-liegenden Spuren
	{

		if (laneArray[0].width + laneArray[1].width + laneArray[2].width + laneArray[3].width + laneArray[4].width + laneArray[5].width + laneArray[6].width == 690) 
		{
			/**Funktioniert bsp.weise wie eine Button abfrage, wir gehen immer von der x position aus und 
			 * dann muss es +/- 10 pixel darum sein damit wir die grenze bearbeiten  */
			if (mouseX < laneArray[i].x + 10 && mouseX > laneArray[i].x - 10) 
			{
				fill(laneArray[i].c);
				ellipse(mouseX, mouseY, 10);
				/**
				 * Maus wird gedrückt und ist rechts von der Begrenzung 
				 */
				if (mouseIsPressed && mouseX > laneArray[i].x) 
				{
					laneArray[i - 1].width++;
					laneArray[i].width--;
					/**
					 *Maus wird gedrückt und ist links von der Begrenzung 
					 */
				} else if (mouseIsPressed && mouseX < laneArray[i].x) 
				{
					laneArray[i - 1].width--;
					laneArray[i].width++;
					/**
					 * Maus wird gedrückt und ist rechts von der Begrenzung
					 */
				}
			}
		}
	}
}


function spawnTraffic(lane, traffic, randomLane) 
{
	// falls die breite der Lane mindestens so breit ist wie die mindest Breite
	if (laneArray[randomLane].width >= laneArray[randomLane].minW)
	{
		/**
		 * Falls trafficArray an der Stelle randomLane ungleich der Lane ist
		 * das wird die Funktion unterbrochen
		 * 
		 * Wenn die Lane zu klein ist werden keine Fahreuge in die Lane gepushed 
		 */
		if (trafficArray[randomLane] != lane)
		{
			return;
		}
			

		/**
		 * falls im Array mehr als ein FZ ist soll er das Nächste FZ erst spawnen 
		 * sobald genug abstand zwischen dem vorherigen und dem neuen FZ ist
		 * also sozusagen eine Kollisionsabfrage zwischen dem bereits gespawnten 
		 * und dem als nächstes zu spawnenden Fahrzeug
		 * 
		 * !!!!!!!!!NOCH MAL ERKLÄREN!!!!!!!
		 */
		if (lane.length > 0) 
		{
			sharedRadius = 100;
			sqDeltaX = sq(lane[lane.length - 1].x - lane[lane.length - 1].startX);
			sqDeltaY = sq(lane[lane.length - 1].y - lane[lane.length - 1].startY);
			delta = sqrt(sqDeltaX + sqDeltaY);

			if (sharedRadius < delta) 
			{
				/**
				 * falls das Produkt der beiden Radien kleiner ist als 
				 * der tatsaechliche Abstand dann neues Objekt pushen
				 */
				lane.push(traffic);
			}
		} else  //ansonsten einfach ein Neues Objekt in die Lane Pushen 
		{
			lane.push(traffic);
		}
	}
}

function trafficSpawning() 
{
	/**
	 * zum X Wert;
	 * die x position der  + ( die Breite der Lane/2 )
	 */
	let carDown = new Traffic(laneArray[2].x + (laneArray[2].width / 2), 0, 50, '#ffffffff', 10, 1); //(x postion, y wert beim spawning, radius, farbe, geschwindigkeit, richtung )
	let carUp = new Traffic(laneArray[4].x + (laneArray[4].width / 2), 1080, 50, '#ffffffff', 10, -1);
	let publicTransport = new Traffic(laneArray[3].x + (laneArray[3].width / 2), 1080, 70, '#ffffffff', 9, -1);
	let bikeDown = new Traffic(laneArray[1].x + (laneArray[1].width / 2), 0, 30, '#ffffffff', 7, 1);
	let bikeUp = new Traffic(laneArray[5].x + (laneArray[5].width / 2), 1080, 30, '#ffffffff', 7, -1);
	let pedestrianDown = new Traffic(laneArray[0].x + (laneArray[0].width / 2), 0, 20, '#ffffffff', 5, 1);
	let pedestrianUp = new Traffic(laneArray[6].x + (laneArray[6].width / 2), 1080, 20, '#ffffffff', 5, -1);

	/** um festzulegen wie oft welches FZ aufgerufen wird müssen wir ihnen eine Wahrscheinlichkeit geben
	 * also machen wir erstmal eine zufällige  ganze Zahl von 0 bis 99, d.h. 100 verschiedene Fälle
	 * die Warscheinlichkeit der der Fahrzeuge ist abhängig von der Breite der Lane 
	 * Berechnung der Warscheinlichkeit:
	 * 100 / Breite der gesamten Straße * ( Breie der Lane auf der linken Seite und Breite der Lane auf der rechten Seite )
	*/
	var randomSpawning = floor(random(0, 100));

	// alle breiten addiert um die gesamt Breite zu errechnen
	streetwidth = laneArray[0].width + laneArray[1].width + laneArray[2].width + laneArray[3].width + laneArray[4].width + laneArray[5].width + laneArray[6].width;

	//oganischer Verkehrsfluss simulieren anhand von Wahrscheinlichkeit
	pedestrianProbability = 100 / streetwidth * (laneArray[0].width + laneArray[6].width);
	bikeProbability = 100 / streetwidth * (laneArray[1].width + laneArray[5].width);
	carProbability = 100 / streetwidth * (laneArray[2].width + laneArray[4].width);
	publicProbability = 100 / streetwidth * laneArray[3].width;

	var randomLane = 0;
	/**
	 * ZU RANDOM P
	 * zu erst gibt es eine random Nummer von 0-99 ->> randomSpawning
	 * dann berechnen wir wie hoch die Warscheinlichkeit  ist für die vier verschiedenen verkehrszeuge
	 * mit hilfe von randomSpawning wird jetzt auserwählt welches der vier fahrzeuge gespawnt wird
	 * doch bevor es gespawnt wird, wird random generiert auf welcher lane es gespawnt werden soll
	 * 
	 * BEISPIEL:
	 * 
	 *randomSpawning : 33
	 * pedestrianProbability : 29
	 * also soll ein fussgaenger gespawnt werden
	 * jetzt wird randomLane generiert
	 * randomLane : 1
	 * also wird zu randomLane plus 5 gerechnet also ist es jetzt 6
	 * das heißt wenn man jetzt wieder hochschaut bei der func spawnTraffic 
	 * wird ein fußgänger in trafficArray[6] gespawnt, also in den rightPedestrianArray
	 */

	if (randomSpawning <= pedestrianProbability) 
	{
		randomLane = floor(random(0, 2));
		if (randomLane == 1)
			randomLane += 5;
	} else if (randomSpawning <= pedestrianProbability + bikeProbability) 
	{
		randomLane = floor(random(1, 3));
		if (randomLane == 2)
			randomLane += 3;
	} else if (randomSpawning <= pedestrianProbability + bikeProbability + carProbability) 
	{
		randomLane = floor(random(2, 4));
		if (randomLane == 3)
			randomLane++;
	} else if (randomSpawning < 100) 
	{
		randomLane = 3;
	}

	spawnTraffic(leftPedestrianArray, pedestrianDown, randomLane);
	spawnTraffic(leftBikeArray, bikeDown, randomLane);
	spawnTraffic(leftCarArray, carDown, randomLane);
	spawnTraffic(publicArray, publicTransport, randomLane);
	spawnTraffic(rightCarArray, carUp, randomLane);
	spawnTraffic(rightBikeArray, bikeUp, randomLane);
	spawnTraffic(rightPedestrianArray, pedestrianUp, randomLane);
}

function moveTraffic() {
	for (i = 0; i < trafficArray.length; i++) 
	{
		/**
		 * erst wird jede Lane durch gegangen und dann
		 * jedes Objekt der Lane deswegen eine for Schleife in der for Schleife
		 */
		currentLaneArray = trafficArray[i];
		currentLane = laneArray[i];

		for (j = 0; j < currentLaneArray.length; j++) 
		{
			//zu erst wird collison immer auf falls gesetzt
			collision = false;

			//berechnung einer zufälligen zahl von min. Geschwindigkeit bis zu max. geschwindigkeit des FZ
			rndVX = random(-currentLaneArray[j].v, currentLaneArray[j].v);
			//dann wird diesen Randomwert zum alten x-Wert addiert
			newX = currentLaneArray[j].x + rndVX;

			//hier wird geschaut dass das FZ nicht den Rand der Lane überschneidet
			minDiff = newX - currentLaneArray[j].r - currentLane.x;
			maxDiff = currentLane.x + currentLane.width - newX - currentLaneArray[j].r;

			if (minDiff < 0)
				newX -= minDiff;
			else if (maxDiff < 0)
				newX += maxDiff;
			/**
			 * nun wird zum alten y-Wert ein Wert addiert der gerade so groß ist 
			 * damit der eigentliche Weg den das FZ zurücklegt genau der geschwindigkeit entspricht
			 */
			newY = currentLaneArray[j].y + sqrt(sq(currentLaneArray[j].v) - sq(rndVX)) * currentLaneArray[j].direction;

			if (j > 0) 
			{
				/**
			 	* jetzt schauen wir ob es zur Kollision kommen würde 
			 	*/
				sharedRadius = currentLaneArray[j - 1].r + currentLaneArray[j].r;
				squareDeltaX = sq(currentLaneArray[j - 1].x - newX);
				squareDeltaY = sq(currentLaneArray[j - 1].y - newY);
				delta = sqrt(squareDeltaX + squareDeltaY);

				if (sharedRadius > delta) 
				{
					/**
					 * wieder falls die beiden Radien addiert mehr 
					 * als der eigentliche Abstand der beiden Kreise ist 
					 * wird collision auf true gesetzt
					 */
					collision = true;
				}
			}

			if (!collision)  //falls collision NICHT true, also falls Collision False
			{
				/**
				 * also wenn weder farbkollision noch kollision miteinander 
				 * dann wird die tatsächliche Position aktuallisiert
				 */
				currentLaneArray[j].move(newX, newY);
			}

			if (currentLaneArray[j].y > 1080 || currentLaneArray[j].y < 0) 
			{
				/**
				 * falls das FZ nicht mehr auf dem Bildschirm ist,
				 * weil es an einem der vier Bildschirmränder drüber hinaus ist,
				 * dann soll das FZ aus dem Array entfernt werden
				 */
				currentLaneArray.shift();
			} else 
			{
				//falls es noch auf unserem Canvas ist, soll es angezeigt werden
				currentLaneArray[j].show();
			}
		}
	}
}

function draw() 
{
	clear();
	editLanes();
	moveTraffic();
}