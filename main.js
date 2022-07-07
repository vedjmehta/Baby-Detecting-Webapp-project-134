
img = "";
status1 = "";
objects = [];
song = "";

function preload() {
   
   song = new Audio("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    
    
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);
    

    if(status1 != "") {

    
     objectDetector.detect(video, gotResult);
     if (objects.length == "person") {
        document.getElementById("status").innerHTML = "Status : Baby Detected";
        document.getElementById("number_of_object").innerHTML = "Number of objects detected are :"+ objects.length;
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x,objects[i].y );
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     } else {
        song.play();
        document.getElementById("status").innerHTML = "Status : Baby Not Detected"
        document.getElementById("number_of_object").innerHTML = "Number of objects detected are :"+ objects.length;
     }
}
}

function modelLoaded() {
    console.log("Model Loaded!")
    status1 = true;

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}


function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}