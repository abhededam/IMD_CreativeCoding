/* jslint esversion: 6 */

var a = 0;  
var c = 0; 
var r = 0;
var g = 0;
var b = 0;  
var m = 0;
var rad = 300;
var cou = 10;

function preload() {
    soundFormats('wav','mp3');   
    mew = loadSound('mew.wav');
    meow = loadSound('meow.wav');
    nyanCat = loadSound('nyanCat.mp3');
}

function setup() {
	createCanvas(1920, 1080);
	frameRate(60);
}

function bg(rr,gg,bb) {
    for (let i = 0; i < 100; i++) {
        fill(rr+i*10,gg+i*10,bb+i*10);
        strokeWeight(0);
        ellipse(490,430,1300-i*20.1);
    }
    
    
    if(pulseBG == 1) {
        if(c<10){
            c++;
            b+=5;
            r+=10;
        }else if(c<20){
            c++;
            b-=5;
            g+=10;
        }else if(c<30){
            c++;
            g-=5;
            r-=10;
        }else if(c<40){
            c++;
            r-=5;
            g-=10;
        }else if(c<50){
            c++;
            r+=5;
            b+=10;
        }else if(c<60){
            c++;
            g+=5;
            b-=10;
        }else if(c==60){
            c=0;
        }
    }
}

function booms (mov,radius,count) {
    
    for (let i = 0; i < 21; i++) {
        
        var angle1 = (Math.PI*2)/count*i+mov;
        
        x1=cos(angle1)*50+490;
        y1=sin(angle1)*50+430;

        x2=cos(angle1)*radius+500;
        y2=sin(angle1)*radius+430;

        x3=cos(angle1)*50+500;
        y3=sin(angle1)*50+430;

        x4=cos(angle1)*radius+490;
        y4=sin(angle1)*radius+430;

        fill(i,i*10,i*15);
        quad(x1,y1,x4,y4,x2,y2,x3,y3);
    }

    if(rotateBG == 1) {
        m-=0.01;
    }
    if(cou<21 && cou>0) {
        if(keyIsDown(192)) {
            cou--;
        }
        if(keyIsDown(222)) {
            cou++;
        }
    } else if (cou == 0) {
        cou++;
    } else if (cou == 21) {
        cou--;
    }
    if(rad<1000 && rad>300) {
        if(keyIsDown(78)) {
            rad-=3;
        }
        if(keyIsDown(77)) {
            rad+=3;
        }
    } else if (rad <= 300) {
        rad++;
    } else if (rad >= 1000) {
        rad--;
    }
    
}

class BongoCat {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.mx =350;
        this.my =350;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    psychadelic(a) {
        this.x = this.mx + 150 * Math.cos(a);
        this.y = this.my + 150 * Math.sin(a);
    }
    rotate() {
        a = (a + Math.PI / 45) % (Math.PI * 2);
        this.psychadelic(a);
    }
    color(){
        if(a < 1){
            this.r-=10;
        } else if(a < 2){
            this.g-=10;
        } else if(a < 3){
            this.b-=10;
        } else if(a < 4){
            this.r+=10;
        } else if(a < 5){
            this.g+=10;
        } else if (a < 7){
            this.b+=10;
        } 
    }
    show() {

        if(rotateCat == 1){
            this.rotate();
            this.color();
        }

        stroke(0);
        strokeWeight(10);
        fill(this.r+100,this.g+100,this.b+100);
        triangle(this.x+20,this.y+80,this.x+90,this.y-20,this.x+160,this.y+20);
        triangle(this.x+50,this.y+60,this.x+330,this.y+30,this.x+320,this.y+120);
        arc(this.x+150,this.y+150,350,280,-3.11,0.35,PI);
        arc(this.x+95,this.y+100,30,15,0,3.2,PI);
        arc(this.x+125,this.y+105,30,15,0.2,3.5,PI);
        if(keyIsDown(87)){
            //mouth
            fill('#ffc4ce');
            arc(this.x+110,this.y+115,30,30,0,3.5,PI);
            meow.play();
        }
        fill(this.r+100,this.g+100,this.b+100);
        strokeWeight(0);
        triangle(this.x+18,this.y+90,this.x+90,this.y-10,this.x+154,this.y+20);
        triangle(this.x+50,this.y+50,this.x+320,this.y+40,this.x+316,this.y+120);
        //eyes and blackline
        strokeWeight(10);
        ellipse(this.x+50,this.y+90,10);
        ellipse(this.x+210,this.y+120,10);
        line(this.x-100,this.y+130,this.x+360,this.y+220);
        
        //Paws
        stroke(0);
        strokeWeight(10);
        
        if(keyIsDown(65)){
            arc(this.x-10,this.y+150,65,100,0,4.7,PI);
        } else {
            arc(this.x-20,this.y+120,65,120,-3.6,-0.9,PI);
            strokeWeight(0);
            triangle(this.x-48,this.y+136,this.x+50,this.y+153,this.x-30,this.y+76);
            fill('#ffc4ce');
            ellipse(this.x-25,this.y+76,10);
            ellipse(this.x-34,this.y+90,10);
            ellipse(this.x-10,this.y+80,10);
            ellipse(this.x-20,this.y+95,15,20);
        }
        strokeWeight(10);
        fill(this.r+100,this.g+100,this.b+100);
        if(keyIsDown(68)){
            arc(this.x+246,this.y+200,65,100,0,3.8,PI);
        } else {
            arc(this.x+250,this.y+175,65,120,-3.6,-0.9,PI);
            fill('#ffc4ce');
            strokeWeight(0);
            ellipse(this.x+245,this.y+131,10);
            ellipse(this.x+236,this.y+145,10);
            ellipse(this.x+260,this.y+135,10);
            ellipse(this.x+250,this.y+150,15,20);
        }
        
    }
}
var rotateCat = 0;
var rotateBG = 0;
var pulseBG = 0;
function keyTyped() {
    if (key == '1' && rotateCat == 0){
        rotateCat = 1;
        nyanCat.play();
    } else if (key == '1' && rotateCat == 1){
        rotateCat = 0;
        nyanCat.pause();
    }
    if (key == '2' && rotateBG == 0){
        rotateBG = 1;
    } else if (key == '2' && rotateBG == 1){
        rotateBG = 0;
    } 
    if (key == '3' && pulseBG == 0){
        pulseBG = 1;
    } else if (key == '3' && pulseBG == 1){
        pulseBG = 0;
    }
}

let bongi = new BongoCat (0,0,'#F5A9E1');

bongi.rotate();

function draw(){
    clear();
    background(255);
    bg(r,g,b);
    booms(m,rad,cou);
    bongi.show();
}