var s = 1; //speed
var y = 50;
var f = 255;
var p = 0; 

//strokeWeight(0);

function fairy(y)
{
    strokeWeight(0);
    fill("#E17DCD");
    ellipse(340,y-50,50);
    fill("#E8373D");
    ellipse(323,y-41,13,10);
    ellipse(357,y-41,13,10);
    
}
    function wingsdown(y)
    {
        strokeWeight(0);
        fill("#7DA5E1");
        strokeJoin(ROUND);
        bezier(365,y-50,380,y-80,400,y-90,420,y-90);
        bezier(365,y-50,400,y-50,420,y-80,420,y-90);
        bezier(315,y-50,300,y-80,280,y-90,260,y-90);
        bezier(315,y-50,280,y-50,260,y-80,260,y-90);
        steps = 4;
    }
    function wingsup(y)
    {
        strokeWeight(0);
        fill("#7DA5E1");
        strokeJoin(ROUND);
        bezier(365,y-50,380,y-20,400,y-10,420,y-10);
        bezier(365,y-50,400,y-50,420,y-20,420,y-10);
        bezier(315,y-50,300,y-20,280,y-10,260,y-10);
        bezier(315,y-50,280,y-50,260,y-20,260,y-10);
        steps = 4;
    }
    function eyesL(y)
    {
        fill("#520C44");
        ellipse(325,y-50,20);
        ellipse(355,y-50,20);
        fill(255);
        ellipse(320,y-53,7);
        ellipse(350,y-53,7);
        ellipse(326,y-54,4);
        ellipse(356,y-54,4);
    }
    function eyesD(y)
    {
        strokeWeight(5);
        line(315,y-60,330,y-45);
        line(315,y-45,330,y-60);
        line(350,y-60,365,y-45);
        line(350,y-45,365,y-60);
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

function background_fairy()
{
    strokeWeight();
    fill("#315892");
    rect(0,0,800,800);
    fill("#3D9800");
    rect(0,300,700,400);
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
    fill("#245504");
    ellipse(340,330,30,10);
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
    function speed(s)
    {
        strokeWeight(0);
        fill("#C12E33");
        ellipse(550,100,100);
        fill("#C36A2F");
        arc(550,100,100,100,0,PI*2/5.6*3,PIE);
        fill("#C18B2E");
        arc(550,100,100,100,0,PI*2/5.6*2.6,PIE);
        fill("#69C12E");
        arc(550,100,100,100,0,PI*2/5.6*2,PIE);
        strokeWeight(3);
        noFill();
        arc(550,100,100,100,0, PI*2/5.6*s, PIE);
    }
    
function draw()
{
    clear();
    console.log(mouseY);
    if(p==0)
    {
    start();
    y=50;
        if(mouseIsPressed && mouseX > 200 && mouseX < 550 && mouseY > 250 && mouseY < 400)
        {
            p=1;
        } 
    }
    if(p==1 || p==3)
    {
        background_fairy();
        fill(f);
        fairy(y);
        speed(s);
        
        if(mouseIsPressed)
        {
            wingsup(y);
        } else
        {
            wingsdown(y);
        }
        if(y<350)
        {
            y=y+s;
            s=s+0.05;
        } else if(y>350)
        {
            p=3;
            
        }
        if(y>350 && s>3)
        {
            eyesD(y);
            strokeWeight(0);
            text("you lost",280,70);
        }else if (y>350 && s<3)
        {
            eyesL(y);
            text("you won",280,70);
        }else 
        {
            eyesL(y);
        }
        //console.log(s);
    
        textSize(20);
        if (p==3)
        {
            restart();
            if(mouseIsPressed && mouseX > 200 && mouseX < 550 && mouseY > 100 && mouseY < 200)
            {
                p=0;
            }
        }
    }
        
}


function mouseClicked()
{
    y=y-20;
    s=s*0.7;
}

