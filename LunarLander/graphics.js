function mouseClicked()
{
    console.log("X= "+mouseX);
    console.log("y= "+mouseY);
}


function flower(a,b,c)
{
    fill(c);
    strokeWeight(0);
    ellipse(a+13,b,15);
    ellipse(a,b+13,15);
    ellipse(a-13,b,15);
    ellipse(a,b-13,15);
    fill("#CAAA2A");
    ellipse(a,b,15);
}
function background()
{
    strokeWeight();
    fill("#315892");
    rect(0,0,800,800);
    fill("#3D9800");
    rect(0,300,700,200);
    flower(100,350,"#B91616");
    flower(140,370,"#B91616");
    flower(135,325,"#B91616");
    flower(185,345,"#B91616");
    flower(50,330,"#B91616");
    flower(10,370,"#B91616");
    flower(500,325,"#B91616");
    flower(600,330,"#B91616");
    flower(550,370,"#B91616");
    flower(470,360,"#B91616");
}
    

//strokeJoin
    strokeWeight(5);
    strokeJoin(ROUND);
    beginShape();
    vertex(35, 20);
    vertex(65, 50);
    vertex(35, 80);
    endShape();


//Fairy
function fairy(y)
{
    strokeWeight(0);
    fill("#E17DCD");
    ellipse(200,y-50,50);
    fill("#E8373D");
    ellipse(183,y-41,13,10);
    ellipse(217,y-41,13,10);
    fill("#520C44");
    ellipse(185,y-50,20);
    ellipse(215,y-50,20);
    fill(255);
    ellipse(180,y-53,7);
    ellipse(210,y-53,7);
    ellipse(186,y-54,4);
    ellipse(216,y-54,4);
}
function wingsdown(y)
{
    fill("#7DA5E1");
    strokeJoin(ROUND);
    bezier(225,y-50,240,y-80,260,y-90,280,y-90);
    bezier(225,y-50,260,y-50,280,y-80,280,y-90);
    bezier(175,y-50,160,y-80,140,y-90,120,y-90);
    bezier(175,y-50,140,y-50,120,y-80,120,y-90);
    steps = 4;
}
function wingsup(y)
{
    fill("#7DA5E1");
    strokeJoin(ROUND);
    bezier(225,y-50,240,y-20,260,y-10,280,y-10);
    bezier(225,y-50,260,y-50,280,y-20,280,y-10);
    bezier(175,y-50,160,y-20,140,y-10,120,y-10);
    bezier(175,y-50,140,y-50,120,y-20,120,y-10);
    steps = 4;
}

background();
fairy(150); 
wingsdown(150);
wingsup(150);
s=5.5;
speed();
function speed(s)
{
    strokeWeight(0);
    fill(255);
    ellipse(550,100,100);
    fill("#C12E33");
    arc(550,100,100,100,0,PI*2/5.6*3,PIE);
    fill("#C18B2E");
    arc(550,100,100,100,0,PI*2/5.6*2.6,PIE);
    fill("#69C12E");
    arc(550,100,100,100,0,PI*2/5.6*2,PIE);
    strokeWeight(3);
    noFill();
    arc(550,100,100,100,0, PI*2/5.6*s, PIE);
}


function start()
{
    fill("#315892");
    rect(0,0,800,800);
    stroke(0);
    strokeWeight(0);
    fill("#5984C4");
    textSize(30);
    text("Lunar Lander",230,100);
    fill("#E17DCD");
    textSize(60);
    text("Fairy Edition",160,200);
    rect(200,250,250,100);
    textSize(20);
    fill(255);
    text("PRESS TO PLAY",245,305);
}

function restart()
{
    strokeWeight(0);
    fill("#520C44");
    rect(200,100,250,100);
    textSize(20);
    fill(255);
    text("PRESS TO RESTART",225,155);
}


//start();
//restart();



