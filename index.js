var record = document.getElementsByClassName('btn-danger');
var webCam = document.getElementById('face');
var container = document.getElementById('img-frame');
record[0].addEventListener("click", function() {
  var oldImage = document.getElementsByTagName('img')[0];
  if(oldImage) {
    oldImage.parentNode.removeChild(oldImage);
  }
  webCam.style.display = "inline-block";

  gifshot.createGIF({
    'webcamVideoElement': document.getElementById("video"),
    'keepCameraOn': true,
    'numFrames': 10,
    'gifWidth': 500,
    'numWorkers': 4,
    'gifHeight': 350,
    'text': 'hi there',
    'saveRenderingContexts': true
  }, function(obj) {
    if(!obj.error) {
      webCam.style.display = "none";
      var image = obj.image;
      var saveGIF = document.getElementById('saveGIF');
      saveGIF.href = image;
      animatedImage = document.createElement('img');
      animatedImage.src = image;
      container.appendChild(animatedImage);
    }
  });

});

var video = document.getElementById("face");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

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
})
