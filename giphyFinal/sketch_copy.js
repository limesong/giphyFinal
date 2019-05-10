let video;
let yolo;
let status;
let objects = [];
let objectGifs = [];

var apikey = '9D7llCItEIxhD7xJ0eFSh2ryp1cIbrD8';
var query = '';
var gif;

var elementPerson;
var elementPhone;


var dict = { "person": "https://media.giphy.com/media/l4FGnFjMRlw02d7Us/source.gif"};
var dict2 = { "phone" : "https://media.giphy.com/media/xUOwGdZL4q3nHd5qkU/giphy.gif"}


function setup() {
  var cnv = createCanvas(760, 600);
  var x = (windowWidth - 760) /2;
  var y = (windowHeight - 600) /2;
  cnv.position(x,y+170);
  video = createCapture(VIDEO);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');

  elementPerson = makeGifElement(dict.person);
  //elementPerson.hide();

}



function draw() {
  //elementPerson.hide();
  image(video, 0, 0, 760, 600);

  for (let i = 0; i < objects.length; i++) {
    //if object is person, get the person gif and make it postion on the object's.
    if( objects[i].className == "person" ) {
      elementPerson.position(objects[i].x*width+objects[i].w*width/2, objects[i].y*height+objects[i].h*height/2-50, objects[i].w*width/2, objects[i].h*height/2);
    }

  }
}


function startDetecting() {
  status.html('MODEL LOADED!');
  detect();
}

function detect() {
  yolo.detect(function(err, results){
    objects = results;
    detect();
  });
}


function makeGifElement(src){
  //https://media2.giphy.com/media/hdra3g4bm6fAY/200w.gif
  var gifElement = createImg(src);
  gifElement.style('position', 'absolute');
  return gifElement;
}






/* text + rectangle
noStroke();
fill(0, 255, 0);
text(objects[i].className, objects[i].x*width, objects[i].y*height - 5);
noFill();
strokeWeight(4);
stroke(0,255, 0);
rect(objects[i].x*width, objects[i].y*height, objects[i].w*width, objects[i].h*height);
*/
