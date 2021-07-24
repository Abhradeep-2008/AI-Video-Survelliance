status = "";
objects = [];


function preload(){
 video = createVideo("video.mp4");
 video.hide();
}

function setup(){

    canvas = createCanvas(400, 400);
    canvas.center();

    

}

function draw(){

    image(video, 0, 0, 400, 400);

    if (status != ""){
        objectDetection.detect(video, gotResults);

        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected"
            document.getElementById("objects_detected").innerHTML = "No. of Objects detected: " + objects.length;
            fill("yellow");
            confidence = floor(objects[i].confidence * 100,);
            text(objects[i].label + " " + confidence + "%" ,objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke("yellow");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }

    }
}

function start(){

    objectDetection = ml5.objectDetector("cocossd", modelLoaded);
    

    document.getElementById("status").innerHTML = "Status: Detecting Objects.....";

}

function modelLoaded(){
    console.log("cocossd is initalized!");
    status = 'true';
    video.play(); 
    video.loop();
    video.speed(1);
    video.volume(1);   
}

function gotResults(error, results){
 
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }

}
