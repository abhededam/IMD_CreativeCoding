new p5();

width = windowWidth;
height = windowHeight;

function setup() {
    var cnv = createCanvas(460, windowHeight);
    cnv.position(0, 0);
    frameRate(30);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    clear();
}
  