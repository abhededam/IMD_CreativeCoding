var img;
/*function preload() {
  img = loadImage("D:/h-da/CC1/LunarLander/ll_images/fairy_d1.png");
}
function setup() {
  image(img,200,200);
}*/

function setup() {
    // here we use a callback to display the image after loading
    loadImage("../lolirun/try.png", function(img) {
      image(img, 0,0);
    });
  }

setup();