noseX=0;
noseY=0;
difference=0;
leftwristX=0;
rightwristX=0;
function setup(){
    canvas= createCanvas(550,550);
    canvas.position(560,100);
    video=createCapture(VIDEO);
    video.size(550,500);

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);    
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("noseX= "+noseX+" , "+"noseY= "+noseY);

        leftwristX=results[0].pose.leftWrist.x;
        rightwristX=results[0].pose.rightWrist.x;
        difference=floor(leftwristX-rightwristX);
        console.log("leftWristX= "+leftwristX+" , "+"rightWristX= "+rightwristX+" , "+"difference= "+difference);

    }
}

function draw(){
    background('#969A97');
    document.getElementById("square_side").innerHTML="width and height of the square will be: "+difference+"px";
    fill("#a156db");
    stroke("#a156db");
    square(noseX,noseY,difference);
}