var record = document.getElementsByClassName('btn-danger');
var webCam = document.getElementById('face');
var container = document.getElementById('img-frame');
var saveGIF = document.getElementById('saveGIF');
var postGIF = document.getElementById('postGIF');
var recordGIF = document.getElementById('recordGIF');
var btnArray = [recordGIF, saveGIF, postGIF];

record[0].addEventListener("click", function() {
    var inputs = document.getElementsByTagName('input');
    var text = inputs[0];
    var time = inputs[1];
    var oldImage = document.getElementsByTagName('img')[0];
    if(oldImage) {
        oldImage.parentNode.removeChild(oldImage);
    }
    webCam.style.display = "inline-block";

    btnArray.forEach(function(btn) {
      btn.style.opacity = 0.3;
    });

    gifshot.createGIF({
        'webcamVideoElement': document.getElementById("video"),
        'keepCameraOn': true,
        'numFrames': time.value * 10,
        'gifWidth': 500,
        'numWorkers': 4,
        'gifHeight': 350,
        'text': text.value,
        'fontFamily': 'Helvetica',
        'fontSize': '36px',
        'resizeFont': true,
        'saveRenderingContexts': true
    },
    function(obj) {
        if(!obj.error) {
            webCam.style.display = "none";
            var image = obj.image;
            saveGIF.href = image;
            btnArray.forEach(function(btn) {
                btn.style.opacity = 1;
                btn.style.display = 'inline-block';
            });
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            container.appendChild(animatedImage);
        }
    });
});

var video = document.getElementById("face");

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.oGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}

function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
    // do something
}

var slackButton = document.getElementsByClassName('btn-default')[0];
slackButton.addEventListener("click", function() {
    console.log('here');
    console.log(request);
});
