/* jslint esversion: 6 */

var background = loadImage('png/nah_ansicht.png'); // Hintergrundbild laden

var timer1 = setInterval(trafficSpawning1, 100); // alle hundert Millisec wird trafficSpawning1() aufgerufen
var timer2 = setInterval(trafficSpawning2, 500); // alle hundert Millisec wird trafficSpawning2() aufgerufen
var timer3 = setInterval(trafficSpawning3, 10); // alle hundert Millisec wird trafficSpawning3() aufgerufen
var trafficArray1 = [];								// array für die verschiedenen Spawning Punkte, ein Spawnpunkt = ein Array
var trafficArray2 = [];
var trafficArray3 = [];
var trafficSizes = [15, 18, 10, 8];					//radiuse der verschiedenen Fahrzeuge



function setup() 
{
	createCanvas(1920, 1080);
	frameRate(30);
}

class Traffic 
{
	constructor(x, y, radius, color, speed) 
	{
		this.x = x;				//x-Position
		this.y = y;				//y-Position
		this.r = radius;		
		this.c = color;
		this.v = speed; 		//schnelligkeit des fahrzeuges
	}
	move(x, y) 					// in dieser Methode wird die Position dann auf das errechnete newX und newY gesetzt(siehe moveTraffic())
	{
		this.x = x;
		this.y = y;
	}
	show() 						// zeigt das Fahrzeug an/zeichnet es
	{
		fill(this.c);
		noStroke();
		ellipse(this.x, this.y, this.r*2);
	}
}

function getPixelData(x,y)				// Funktion um die Farbe des Pixels zu bekommen
{
	var off = (y * 1920 + x) * 4;
	ret = pixels[off];					//

	return ret;
}

function trafficSpawning1() 	// Fahrzeugespawning für den ersten Spawningpunkt
{
	spawnX = 430;				//Position an die die Fahrzeuge zu erst gespawnt werden
	spawnY = 10;

	/** um festzulegen wie oft welches FZ aufgerufen wird müssen wir ihnen eine Warscheinlichkeit geben
	 * also machen wir erstmal eine zufällige  ganze Zahl von 0 bis 99, d.h. 100 verschiedene Fälle
	 * und dann geben wir den FZ eine Zahl
	 * 0 ist Auto, Warscheinlichkeit = 50%
	 * 1 ist Oeffies, Warscheinlichkeit = 12%
	 * 2 ist Fahrrad, Warscheinlichkeit = 12%
	 * 1 ist Fussgaenger, Warscheinlichkeit = 26%
	*/
	var randomSpawning = floor(random(0, 99)); 

	if (randomSpawning <= 69) 
	{
		randomSpawning = 0;
	} else if (randomSpawning <= 89) 
	{
		randomSpawning = 1;
	} else if (randomSpawning <= 94) 
	{
		randomSpawning = 2;
	} else if (randomSpawning <= 99) 
	{
		randomSpawning = 3;
	}

	/**
	 * falls im Array mehr als ein FZ ist soll er das Nächste FZ erst spawnen 
	 * sobald genug abstand zwischen dem vorherigen und dem neuen FZ ist
	 * also sozusagen eine Kollisionsabfrage zwischen dem bereits gespawnten 
	 * und dem als nächstes zu spawnenden Fahrzeug
	 */
	if (trafficArray1.length > 1) 
	{
		sharedRadius = trafficSizes[randomSpawning] + trafficArray1[trafficArray1.length - 1].r;
		sqDeltaX = sq(trafficArray1[trafficArray1.length - 1].x - spawnX);
		sqDeltaY = sq(trafficArray1[trafficArray1.length - 1].y - spawnY);
		delta = sqrt(sqDeltaX + sqDeltaY);

		if (sharedRadius >= delta) 
		{
			/** 
			 * also falls die beiden Radien der FZ zusammen gerechnet 
			 * größer sind als der eigentlichabstand dann soll return
			 * return gibt den Wert zurück und beendet die funktion
			 * */
			return;      
		}
	}

	/**
	 * jetzt spawnen wir die Fahrzeuge nur noch
	 */
	if (randomSpawning == 0) 
	{
		let car = new Traffic(spawnX, spawnY, trafficSizes[0], '#e73030ff', 10);
		trafficArray1.push(car);
	} else if (randomSpawning == 1) 
	{
		let publicTransport = new Traffic(spawnX, spawnY, trafficSizes[1], '#fd6c33ff', 9);
		trafficArray1.push(publicTransport);
	} else if (randomSpawning == 2) 
	{
		let bike = new Traffic(spawnX, spawnY, trafficSizes[2], '#fe921fff', 7);
		trafficArray1.push(bike);
	} else if (randomSpawning == 3) 
	{
		let pedastrian = new Traffic(spawnX, spawnY, trafficSizes[3], '#6e6ebaff', 5);
		trafficArray1.push(pedastrian);
	}
}

function trafficSpawning2() 
{
	/**
	 * trafficSpawning2() funktionier genauso wie trafficSpawning1()
	 * nur die Spawnposition ist anders.
	 */
	spawnX = 1910;
	spawnY = 900;

	var randomSpawning = floor(random(0, 99));

	if (randomSpawning < 49) 
	{
		randomSpawning = 0;
	} else if (randomSpawning <= 69) 
	{
		randomSpawning = 1;
	} else if (randomSpawning <= 79) 
	{
		randomSpawning = 2;
	} else if (randomSpawning <= 99) 
	{
		randomSpawning = 3;
	}

	if (trafficArray2.length > 0) 
	{
		sharedRadius = trafficSizes[randomSpawning] + trafficArray2[trafficArray2.length - 1].r;
		sqDeltaX = sq(trafficArray2[trafficArray2.length - 1].x - spawnX);
		sqDeltaY = sq(trafficArray2[trafficArray2.length - 1].y - spawnY);
		delta = sqrt(sqDeltaX + sqDeltaY);

		if (sharedRadius >= delta) 
		{
			return;
		}
	}

	if (randomSpawning == 0) 
	{
		let car = new Traffic(spawnX, spawnY, trafficSizes[0], '#e73030ff', 10);
		trafficArray2.push(car);
	} else if (randomSpawning == 1) 
	{
		let publicTransport = new Traffic(spawnX, spawnY, trafficSizes[1], '#fd6c33ff', 9);
		trafficArray2.push(publicTransport);
	} else if (randomSpawning == 2) 
	{
		let bike = new Traffic(spawnX, spawnY, trafficSizes[2], '#fe921fff', 7);
		trafficArray2.push(bike);
	} else if (randomSpawning == 3) 
	{
		let pedastrian = new Traffic(spawnX, spawnY, trafficSizes[3], '#6e6ebaff', 5);
		trafficArray2.push(pedastrian);
	}
}

function trafficSpawning3() 
{
	/**
	 * trafficSpawning3() funktionier genauso wie trafficSpawning1()
	 * nur die Spawnposition ist anders.
	 */
	spawnX = 1900;
	spawnY = 1000;

	var randomSpawning = floor(random(0, 99));

	if (randomSpawning < 59) 
	{
		randomSpawning = 0;
	} else if (randomSpawning <= 79) 
	{
		randomSpawning = 1;
	} else if (randomSpawning <= 89) 
	{
		randomSpawning = 2;
	} else if (randomSpawning <= 99) 
	{
		randomSpawning = 3;
	}

	if (trafficArray3.length > 0) 
	{
		sharedRadius = trafficSizes[randomSpawning] + trafficArray3[trafficArray3.length - 1].r;
		sqDeltaX = sq(trafficArray3[trafficArray3.length - 1].x - spawnX);
		sqDeltaY = sq(trafficArray3[trafficArray3.length - 1].y - spawnY);
		delta = sqrt(sqDeltaX + sqDeltaY);

		if (sharedRadius >= delta) 
		{
			return;
		}
	}

	if (randomSpawning == 0) 
	{
		let car = new Traffic(spawnX, spawnY, trafficSizes[0], '#e73030ff', 10);
		trafficArray3.push(car);
	} else if (randomSpawning == 1) 
	{
		let publicTransport = new Traffic(spawnX, spawnY, trafficSizes[1], '#fd6c33ff', 9);
		trafficArray3.push(publicTransport);
	} else if (randomSpawning == 2) 
	{
		let bike = new Traffic(spawnX, spawnY, trafficSizes[2], '#fe921fff', 7);
		trafficArray3.push(bike);
	} else if (randomSpawning == 3) 
	{
		let pedastrian = new Traffic(spawnX, spawnY, trafficSizes[3], '#6e6ebaff', 5);
		trafficArray3.push(pedastrian);
	}
}

function checkIfStillOnStreet(x, y, radius)
{
	/**
	 * die Function fragt an 4 Positionen um das FZ herrum
	 * den Rotwert ab
	 * da wir nur zwei hintergrund Farben haben können nur 
	 * zwei verschiedene Werte raus kommen
	 * beim blau = 215
	 * beim weiss = 255
	 * 
	 * checkIfStillOnStreet gibt dann true/false zurück
	 * ist also ein boolean
	 * true wenn alle abgefragten Pixel weiß sind
	 * false wenn nicht
	 */
	left = getPixelData(floor(x-radius), floor(y));
	right = getPixelData(floor(x+radius), floor(y));
	up = getPixelData(floor(x), floor(y-radius));
	down = getPixelData(floor(x), floor(y+radius));
	
	p2 = 255;
	
	if(left == p2 && right == p2 && down == p2)
		return true;
	
	return false;
}

function moveTraffic() 
{
	/**
	 * jetzt wird bewegt!!
	 * erste For-Schleife = erster Spawnpunkt
	 * zweite For-Schleife = zweiter Spawnpunkt
	 * 
	 * ich erkläre wieder nur am ersten da die beiden gleich funktionieren
	 */
	for (j = 0; j < trafficArray1.length; j++) 
	{
		//zu erst wird collison immer auf falls gesetzt
		collision = false; 

		//berechnung einer zufälligen zahl von -Geschwindigkeit bis zu max geschwindigkeit des FZ
		rndVX = random(-trafficArray1[j].v, trafficArray1[j].v/2); 
		//dann wird diesen Randomwert zum alten x-Wert addiert
		newX = trafficArray1[j].x + rndVX;

		/**
		 * nun wird zum alten y-Wert ein Wert addiert der gerade so groß ist 
		 * damit der eigentliche Weg den das FZ zurücklegt genau der geschwindigkeit entspricht
		 */
		newY = trafficArray1[j].y + sqrt(sq(trafficArray1[j].v) - sq(rndVX));

		if (j > 0) 
		{
			/**
			 * jetzt schauen wir ob es zur Kollision kommen würde 
			 */
			sharedRadius = trafficArray1[j - 1].r + trafficArray1[j].r;
			squareDeltaX = sq(trafficArray1[j - 1].x - newX);
			squareDeltaY = sq(trafficArray1[j - 1].y - newY);
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

		if (!collision) //falls collision NICHT true, also falls Collision False
		{
			//abfrage ob die der kreis mit der neuen Position noch auf der Straße währe
			if (checkIfStillOnStreet(newX, newY, trafficArray1[j].r))
				/**
				 * also wenn weder farbkollision noch kollision miteinander 
				 * dann wird die tatsächliche Position aktuallisiert
				 */
				trafficArray1[j].move(newX, newY);
		}

		if (trafficArray1[j].y > 900 || trafficArray1[j].y < 0 || trafficArray1[j].x < 0 || trafficArray1[j].x > 1920) 
		{
			/**
			 * falls das FZ nicht mehr auf dem Bildschirm ist,
			 * weil es an einem der vier Bildschirmränder drüber hinaus ist,
			 * dann soll das FZ aus dem Array entfernt werden
			 */
			trafficArray1.shift();
		} else 
		{
			//falls es noch auf unserem Canvas ist, soll es angezeigt werden
			trafficArray1[j].show();
		}
	}

	for (m = 0; m < trafficArray2.length; m++) 
	{
		collision = false;

		rndVX = random(-trafficArray2[m].v, trafficArray2[m].v);
		newY = trafficArray2[m].y + rndVX;

		/**
		 * ich habe hier eigentlich nur die X und Y berechnung vertauscht
		 * da diese gespawnten Fahrzeuge sich nicht von oben nach unten bewegen sollen, 
		 * sondern von recht nach linms
		 */
		newX = trafficArray2[m].x + (-1) * sqrt(sq(trafficArray2[m].v) - sq(rndVX));

		if (m > 0) 
		{
			sharedRadius = trafficArray2[m - 1].r + trafficArray2[m].r;
			squareDeltaX = sq(trafficArray2[m - 1].y - newY);
			squareDeltaY = sq(trafficArray2[m - 1].x - newX);
			delta = sqrt(squareDeltaX + squareDeltaY);

			if (sharedRadius > delta) 
			{
				collision = true;
			}
		}

		if (!collision) 
		{
			if (checkIfStillOnStreet(newX, newY, trafficArray2[m].r))
				trafficArray2[m].move(newX, newY);
		}

		if (trafficArray2[m].x > 1920 || trafficArray2[m].x < 400 && trafficArray2[m].r == trafficSizes[0]) 
		{
			trafficArray2.shift();
		} else 
		{
			trafficArray2[m].show();
		}
	}

	for (k = 0; k < trafficArray3.length; k++) 
	{
		collision = false;

		rndVX = random(-trafficArray3[k].v, trafficArray3[k].v);
		newY = trafficArray3[k].y + rndVX;

		/**
		 * ich habe hier eigentlich nur die X und Y berechnung vertauscht
		 * da diese gespawnten Fahrzeuge sich nicht von oben nach unten bewegen sollen, 
		 * sondern von recht nach links
		 */
		newX = trafficArray3[k].x + (-1) * sqrt(sq(trafficArray3[k].v) - sq(rndVX));

		if (k > 0) 
		{
			sharedRadius = trafficArray3[k - 1].r + trafficArray3[k].r;
			squareDeltaX = sq(trafficArray3[k - 1].y - newY);
			squareDeltaY = sq(trafficArray3[k - 1].x - newX);
			delta = sqrt(squareDeltaX + squareDeltaY);

			if (sharedRadius > delta) 
			{
				collision = true;
			}
		}

		if (!collision) 
		{
			if (checkIfStillOnStreet(newX, newY, trafficArray3[k].r))
				trafficArray3[k].move(newX, newY);
		}

		if (trafficArray3[k].x > 1920 || trafficArray3[k].x < 400 && trafficArray3[k].r == trafficSizes[0]) 
		{
			trafficArray3.shift();
		} else 
		{
			trafficArray3[k].show();
		}
	}
}

function draw() 
{
	clear();
	image(background,0,0);
	loadPixels();
	moveTraffic();
}
