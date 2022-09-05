my_song=""
leftwristy = 0
rightwristy = 0
rightwristx = 0
leftwristx = 0
leftWristscore = 0
rightWristscore = 0



function preload(){
    my_song=loadSound("music.mp3")

}

function setup(){
my_canvas=createCanvas(700,400)
my_canvas.position(375,250)

my_vid=createCapture(VIDEO)
my_vid.hide()

my_posenet = ml5.poseNet(my_vid,pose_on)
my_posenet.on("pose",myposecordinates)

}



function play_song(){
    my_song.play()
    my_song.setVolume(0.5)
    my_song.rate(0.89)
}

function pose_on(){

console.log("posenet initialized")

}

function myposecordinates(results){
    if(results.length>0){
   // console.log("results[0].pose.leftWrist.x"+results[0].pose.leftWrist.x)
   // console.log("results[0].pose.rightWrist.x"+results[0].pose.rightWrist.y)
    // console.log("results[0].pose.rightWrist.y"+results[0].pose.rightWrist.y)
    //console.log("results[0].pose.leftWrist.y"+results[0].pose.leftWrist.y)

    leftwristy = results[0].pose.leftWrist.y
    rightwristy = results[0].pose.rightWrist.y
    rightwristx = results[0].pose.rightWrist.x
    leftwristx = results[0].pose.leftWrist.x

    leftWristscore = results[0].pose.keypoints[9].score
    rightWristscore = results[0].pose.keypoints[10].score

    
}



}

function draw(){
    background("#022be0")
    image(my_vid,15,20,670,359)
    
    fill("#9334c9")

    if(leftWristscore > 0.2){
        circle(leftwristx, leftwristy, 30)
        
        lyvolnotneeded=Number(leftwristy);
        lyvolneeded=floor(lyvolnotneeded)
        
        volume = lyvolneeded/400
        console.log(volume)
        document.getElementById("thevo").innerHTML="Volume = "+volume;

        my_song.setVolume(volume)
    }

    if (rightWristscore > 0.2)
    {
        circle(rightwristx,rightwristy,30)
        if(rightwristy> 0 && rightwristy < 100){
            document.getElementById("my_speed").innerHTML="Speed: 0.5X";
            my_song.rate(0.5)

        }

        else if(rightwristy > 100 && rightwristy <200){
            document.getElementById("my_speed").innerHTML="Speed: 1X"
            my_song.rate(1)
        }
        else if(rightwristy > 200 && rightwristy <300){
            document.getElementById("my_speed").innerHTML="Speed: 1.5X"
            my_song.rate(1.5)
        }
        else if(rightwristy > 300 && rightwristy <400){
            document.getElementById("my_speed").innerHTML="Speed: 2X"
            my_song.rate(2)
        }


    }

}


