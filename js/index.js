var webCam = document.getElementById('face');
var container = document.getElementById('img-frame');
var recordGIF = document.getElementById('recordGIF');
var saveGIF = document.getElementById('saveGIF');
var postGIF = document.getElementById('postGIF');
// var slackGIF = document.getElementById('slackGIF');
var btnArray = [recordGIF, saveGIF];
var newGIF;
var timerLabel = document.getElementById('timer-label');

if(recordGIF){
  recordGIF.addEventListener("click", function() {
    var inputs = document.getElementsByTagName('input');
    var text = inputs[0];
    var time = inputs[1];
    var oldImage = document.getElementsByTagName('img')[0];
    if(oldImage) {
      oldImage.parentNode.removeChild(oldImage);
    }
    webCam.style.display = "inline-block";

    btnArray.forEach(function(btn) {
        btn.disabled = true;
    });
    saveGIF.children[0].disabled = true;

    gifshot.createGIF({
        'webcamVideoElement': document.getElementById("video"),
        'keepCameraOn': true,
        'numFrames': time.value * 10,
        'gifWidth': 425,
        'gifHeight': 350,
        'numWorkers': 6,
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

            newGIF = dataURItoBlob(image);
            var urlGIF = URL.createObjectURL(newGIF);
            var fd = new FormData(document.forms[0]);
            fd.append("myFile", newGIF);

            saveGIF.href = urlGIF;
            btnArray.forEach(function(btn) {
                btn.style.display = 'inline-block';
                btn.disabled = false;
            });
            saveGIF.children[0].disabled = false;
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            container.appendChild(animatedImage);
        }
    });
  });
}

var video = document.getElementById("face");

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.oGetUserMedia;

if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}
var inputTimer = document.getElementById('timer');
inputTimer.oninput = function(){
    var seconds = inputTimer.value;
    timerLabel.innerText = "Timer: " + seconds + " second";
    if (seconds > 1) timerLabel.innerText += 's';

};
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
    // do something
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
