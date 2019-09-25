/* jslint esversion: 6 */

var xo0 = 50;
var xo1 = 200;
var xo2 = 350;
var xo3 = 500;
var xl = 250;
var yl =350;
var xp = 650;
var yp =140;
var p = 0; //pantsucounter
var g=0; //metercounter
var x=0;
var a=0;
var b=5; //Speed
var z=1;
var c=0;


//programm objekte
    function preload() {
        soundFormats('mp3');
        bgmusic = loadSound('Panties!.mp3');
        loli1 = loadImage('loli1.png');
        loli2 = loadImage('loli2.png');
        loli3 = loadImage('loli3.png');
        loli4 = loadImage('loli4.png');
        obj0_ = loadImage('obj0.png');
        obj1_ = loadImage('obj1.png');
        obj2_ = loadImage('obj2.png');
        obj3_ = loadImage('obj3.png');
        pants = loadImage('pantsu.png');
        startimg = loadImage('startimg.png');
        endimg = loadImage('endimg.png');
    }

    function setup()
    {
        frameRate(29);
        createCanvas(700, 500);
        bgmusic.play();
        image(loli1,0,0);
        image(loli2,0,0);
        image(loli3,0,0);
        image(loli4,0,0);
        image(obj0_,0,0);
        image(obj1_,0,0);
        image(obj2_,0,0);
        image(obj3_,0,0);
        image(pants,0,0);
        image(startimg,0,0);
        image(endimg,0,0);

    }

    function loli(xl,yl)
    { 
        if(c<=6)
        {image(loli1,xl,yl);
        c++;}else if(c<=13)
        {image(loli2,xl,yl);
        c++;}else if(c<=20)
        {image(loli3,xl,yl);
        c++;}else if(c<=27)
        {image(loli4,xl,yl);
        c++;}else if(c==28)
        {image(loli4,xl,yl);
            c=0;}
    }
    function obj0(xo0)
    { 
        image(obj0_,xo0,150);
    }

    function obj1(xo1)
    {  
        image(obj1_,xo1,150);
    }

    function obj2(xo2)
    {
       image(obj2_,xo2,150);
    }
    function obj3(xo3)
    {
           image(obj3_,xo3,150);
    }
    function start()
    {
        strokeWeight(0);
        image(startimg,0,0);
        fill(189,43,43);
        rect(30,250,150,50);
        ellipse(30,275,20,50);
        ellipse(180,275,20,50);
        fill(255);
        textSize(30);
        text("START",57,288);
        /*fill(189,43,43);
        rect(30,330,150,50);
        ellipse(180,355,20,50);
        ellipse(30,355,20,50);
        fill(255);
        text("BEST LIST",31,368);*/
    }
    function end()
    {
        strokeWeight(0);
        image(endimg,0,0);
        fill(189,43,43);
        rect(110,290,380,80);
        fill(255);
        textSize(40);
        text("RETURN TO MENU",120,345);
        fill(189,43,43);
        text("PANTSU'S: "+p,150,235);
    }
    function pantsu(xp,yp)
    {
        image(pants,xp,yp-50);
    }
   


//Untergrund, random sporning
    var ground_A = [obj1,obj1,obj1,obj1,obj1];
    function ground_F()
    {
        for(var i = 0; i < ground_A.length; i++)
        {
            x=i*200-a;
            
            ground_A[i](x);

        }
        if(x+150<650)
        {
            if(r<6)

            {
                ground_A.push(obj0);
                g++;
            } else if(r<51)
            {
                ground_A.push(obj1);
                g++;
            } else if(r<76)
            {
                ground_A.push(obj2);
                g++;
            } else if(r<101)
            {
                ground_A.push(obj3);
                g++;
            }
        }
        if(x-(ground_A.length-3)*200<0)
        {
            a -= 200;
            ground_A.shift();
        }
    console.log(ground_A);
    }

//falling
    function fall()
    {
        loli(xl,yl-150);
        var color1 =get(xl,yl);
        var color2 =get(xl+100,yl);
        var color3 =get(xl+100,yl-25);
        if (color1[0]==250 && color2[0]==250 && color1[1]==250 && color2[1]==250 && color1[2]==250 && color2[2]==250)
        {
            yl+=10;
        }
        if (color3[0]==51 && color3[1]==51 && color3[2]==51)
        {
            xl=xl-b;
        } 
        if(yl>=600)
        {
            z=3;
        }else if(yl<10 || yl>440)
        {
            yl+=30;
        }
     //console.log(yl);
    }
//jumping
    function mouseClicked()
    {
        for(var j = 0; j < 100; j++)
        {
            yl--;
        }
    }

//Pantsuspornig
    function pantsu_F()
    {
        var color4 = get(xp+25,yp+1);
        pantsu(xp,yp);
        xp=xp-b;
        if (xp<0 )
        {
            xp=650;
            yp=90; 
        }else if (xl +100 > xp + 50 &&
            xl > xp  &&
            yl > yp - 50 &&

            yl - 150  < yp)

            {
                xp=650;
                yp=90;
                p++;
            }
        
        if (color4[0]==250 && color4[1]==250 && color4[2]==250)
        {
            for(var k = 0; k < 20; k++)
            {
                yp+=4;
                
            }
        }else if(color4[0]==94 && color4[1]==94 && color4[2]==94)
        {
            if(yp>440)
            {
                yp+=50;
            } else if(yp>340)
            {
                yp=349;
            } else if(yp>240)
            {
                yp=250;
            } else if(yp>150)
            {
                yp=149;
            }
            
        }
        
    
        
    }


//draw
    function draw()
    {
        clear();
      
        if(z==1)
        {
            x=0;
            a=0;
            p=0;
            g=0;
            b=4;
            ground_A = [obj1,obj1,obj1,obj1,obj1];
            xl = 250;
            yl =350;
            start();
            if (mouseIsPressed && mouseX>=30 && mouseX<=180 && mouseY>=250 && mouseY<=300)
            {
                z=2;
            }
            if (mouseIsPressed && mouseX>=30 && mouseX<=180 && mouseY>=330 && mouseY<=380)
            {
                z=4;
            }
        }

        if(z==2)
        {
            background(250);
            fill(168, 43, 43);
            textSize(50);
            text("P:"+p,550,70);
            text("M:"+g,450,70);
            a=a+b;
            r=round(random(1,100));
            ground_F();
            pantsu_F();
            fall();
            if(xl+100<=0)
            {
                z=3;
            }

         
            if(p==5)
            {
                b=7;
            }else if(p==10)
            {
                b=9;
            }else if(p==15)
            {
                b=11;
            }else if(p==20)
            {
                b=13;
            }else if(p==25)
            {
                b=16;
            }else if(p==30)
            {
                b=19;
            }else if(p==40)
            {
                b=22;
            } else if(p==45)
            {
                b=25;
            } else if(p==50)
            {
                b=29;
            }else if(p==55)
            {
                b=33;
            }else if(p==60)
            {
                b=37;
            }else if(p==65)
            {
                b=41;
            }
        
        }

        if(z==3)
        {
            end();
            if (mouseIsPressed && mouseX>=110 && mouseX<=290 && mouseY>=290 && mouseY<=370)
            {
                z=1;
            }
        }

        if(z==4)
        {}
        
    }

